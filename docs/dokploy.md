# Medusa on Dokploy

For Nixpacks, add the following to the application's Environment tab:

```env
NODE_ENV=production
PORT=9000
NIXPACKS_BUILD_CMD="yarn build && cd .medusa/server && yarn install --production"
NIXPACKS_START_CMD="cd .medusa/server && yarn start:prod"
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Fill in ADMIN_EMAIL and ADMIN_PASSWORD directly in Dokploy. Do not commit
credentials. Keep the existing DATABASE_URL, REDIS_URL and other environment
variables. Set ADMIN_CORS and AUTH_CORS to include the backend's public origin,
such as https://api.example.com, and STORE_CORS to include the storefront origin.

Clear Advanced > Run Command if it contains build commands. Save the environment
and deploy a new build containing these scripts. Set the domain's container port
to 9000. Visit /health to check the server, and /app to log in with the configured
admin credentials.

For Railpack, use RAILPACK_BUILD_CMD and RAILPACK_START_CMD instead.

start:prod runs the admin bootstrap before starting Medusa. With neither admin
variable set, it skips account creation. With only one variable set, invalid
credentials, or a database error, it fails instead of starting silently.
If the user already exists, it leaves their password unchanged. Changing
ADMIN_PASSWORD does not reset an existing account's password.

The bootstrap also supports retrying an interrupted account creation using the
same email and password. Run it in a single server instance during first setup.
After the first successful setup, you can remove ADMIN_EMAIL and ADMIN_PASSWORD
from Dokploy; the user remains in the database.

To create an admin manually inside the running container:

```sh
cd /app/.medusa/server
yarn medusa exec ./src/scripts/bootstrap-admin.js
```

Run database migrations against the intended production database before first
startup and after deploying schema changes, using `yarn medusa db:migrate` in
/app/.medusa/server.
