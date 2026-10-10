import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createUserAccountWorkflow } from "@medusajs/medusa/core-flows"

import type { ExecArgs, IUserModuleService, IAuthModuleService } from "@medusajs/framework/types"
export default async function bootstrapAdmin({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD

  if (!email && !password) {
    logger.info("Admin bootstrap skipped: ADMIN_EMAIL and ADMIN_PASSWORD are unset.")
    return
  }
  if (!email || !password) {
    throw new Error("Set both ADMIN_EMAIL and ADMIN_PASSWORD to bootstrap an admin.")
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("ADMIN_EMAIL must be a valid email address.")
  }

  
  const userService = container.resolve<IUserModuleService>(Modules.USER)
  const existingUsers = await userService.listUsers({ email }, { take: 1 })
  if (existingUsers.length) {
    logger.info("Admin already exists; password left unchanged.")
    return
  }

  
  const authService = container.resolve<IAuthModuleService>(Modules.AUTH)
  const credentials = { body: { email, password } }
  let result = await authService.register("emailpass", credentials)

  // Allow retry after registration succeeded but account creation was interrupted.
  // Authenticate first so an existing identity is only reused with its password.
  if (!result.success || !result.authIdentity) {
    result = await authService.authenticate("emailpass", credentials)
  }
  if (!result.success || !result.authIdentity) {
    throw new Error("Admin authentication setup failed. Check the configured credentials.")
  }
  if (result.authIdentity.app_metadata?.user_id) {
    throw new Error("This auth identity is already linked to another admin user.")
  }

  await createUserAccountWorkflow(container).run({
    input: {
      authIdentityId: result.authIdentity.id,
      userData: { email },
    },
  })
  logger.info("Admin account created successfully from environment variables.")
}

