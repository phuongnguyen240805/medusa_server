// scripts/generate-medusa-csv.js
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

const SHIPPING_PROFILE_ID = 'sp_01KNY2BQQTZG84B7HR4RE6Z94J';   // ← Copy từ Settings → Shipping Profiles
const SALES_CHANNEL_ID = 'sc_01KNY2HFYQ35W8F2T0QWGR77H7';   // ← Copy từ Settings → Sales Channels (thường là Default)
const CURRENCY_CODE = 'vnd';

const MOCK_SELLERS = [
    {
        id: "seller_1",
        name: "Gift Idea",
        avatar: "https://i.pravatar.cc/150?u=giftidea",
        followerCount: 155,
        favoriteCount: 56,
        rating: 4.7,
    },
    {
        id: "seller_2",
        name: "Drive Devotion",
        avatar: "https://i.pravatar.cc/150?u=drivedevotion",
        followerCount: 226,
        favoriteCount: 1,
        rating: 4.4,
    },
    {
        id: "seller_3",
        name: "Retro Vibes",
        avatar: "https://i.pravatar.cc/150?u=retrovibes",
        followerCount: 89,
        favoriteCount: 23,
        rating: 4.9,
    },
];


// ====================== PASTE TOÀN BỘ MOCK DATA VÀO ĐÂY ======================
// Copy từ file medusaData.json (phần export const MOCK_PRODUCTS_DATABASE = [ ... ])
const MOCK_PRODUCTS_DATABASE = [
    // ←←← DÁN TOÀN BỘ ARRAY Ở ĐÂY (từ id: "p1" đến id: "p13")
    // Bạn có thể copy-paste nguyên khối từ <FILE> bạn gửi
    {
        id: "p1",
        sellerId: "seller_1",
        seller: MOCK_SELLERS[0],
        handle: "custom-comfort-colors-tee",
        title: "Custom Comfort Colors Tee",
        description: "Áo thun cao cấp dòng Comfort Colors, cotton mềm mại, màu sắc vintage.",
        category: "t-shirt",
        thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        images: [
            {
                id: "scene-1",
                name: "Living Room",
                url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
                panoramaUrl: "https://pannellum.org/images/alma.jpg",
                floorPlanX: 30,
                floorPlanY: 25
            },
            {
                id: "scene-2",
                name: "Bedroom",
                url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
                panoramaUrl: "https://pannellum.org/images/alma.jpg",
                floorPlanX: 70,
                floorPlanY: 45
            },
            {
                id: "scene-3",
                name: "Kitchen",
                url: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
                panoramaUrl: "https://pannellum.org/images/alma.jpg",
                floorPlanX: 50,
                floorPlanY: 70
            }
        ],
        variants: [
            { id: "v1-1", title: "White / M", calculated_price: { calculated_amount: 1495, original_amount: 2990 }, options: [{ value: "White" }, { value: "Heavyweight T-shirt" }, { value: "M" }] },
            { id: "v1-2", title: "Black / L", calculated_price: { calculated_amount: 1495, original_amount: 2990 }, options: [{ value: "Black" }, { value: "Heavyweight T-shirt" }, { value: "L" }] },
            { id: "v1-3", title: "Navy / XL", calculated_price: { calculated_amount: 1495, original_amount: 2990 }, options: [{ value: "Navy" }, { value: "Premium T-shirt" }, { value: "XL" }] },
        ],
        options: [
            {
                title: "Color",
                values: [
                    { id: "c1", value: "Black" },
                    { id: "c2", value: "White" },
                    { id: "c3", value: "Navy" },
                    { id: "c4", value: "Red" },
                    { id: "c5", value: "Dark Gray" },
                    { id: "c6", value: "Blue" },
                    { id: "c7", value: "Light Blue" },
                ]
            },
            {
                title: "Style",
                values: [
                    { id: "st1", value: "Heavyweight T-shirt" },
                    { id: "st2", value: "Premium T-shirt" },
                    { id: "st3", value: "Classic Fit" },
                ]
            },
            {
                title: "Size",
                values: [
                    { id: "s1", value: "S" },
                    { id: "s2", value: "M" },
                    { id: "s3", value: "L" },
                    { id: "s4", value: "XL" },
                    { id: "s5", value: "2XL" },
                ]
            }
        ],
        weight: 200,
        created_at: "2026-03-01T00:00:00Z",
        print_locations: ["Front", "Back"],
        print_additional_prices: { Back: 2.00 },
        default_print_position: "Front",
        metadata: { supports_customization: true, customization_type: "tee-male-only" },
        product_builder: { complementary_products: [] }
    },
    {
        id: "p2",
        sellerId: "seller_2",
        seller: MOCK_SELLERS[1],
        handle: "bonecrusher-skull-hoodie",
        title: "Bonecrusher Skull Hoodie",
        description: "Áo hoodie in hình Bonecrusher Skull độc đáo, nỉ bông dày dặn.",
        category: "hoodie",
        thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
        images: [
            {
                id: "alma",
                name: "Observatory",
                url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80",
                panoramaUrl: "https://pannellum.org/images/alma.jpg",
                floorPlanX: 25,   // % vị trí X trên bản đồ
                floorPlanY: 35    // % vị trí Y trên bản đồ
            },
            {
                id: "museum",
                name: "Museum Hall",
                url: "https://images.unsplash.com/photo-1518991791750-749df6b1f4b2?w=400&q=80",
                panoramaUrl: "https://pannellum.org/images/bma-1.jpg",
                floorPlanX: 55,
                floorPlanY: 45
            },
            {
                id: "mountain",
                name: "Mountain View",
                url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80",
                panoramaUrl: "https://pannellum.org/images/cerro-toco-0.jpg",
                floorPlanX: 75,
                floorPlanY: 65
            },
            {
                id: "airport",
                name: "Airport",
                url: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&q=80",
                panoramaUrl: "https://pannellum.org/images/jfk.jpg",
                floorPlanX: 40,
                floorPlanY: 20
            }
        ],
        variants: [
            { id: "v2-1", title: "Black / L", calculated_price: { calculated_amount: 2500, original_amount: 5000 }, options: [{ value: "Black" }, { value: "Pullover" }, { value: "L" }] },
            { id: "v2-2", title: "Grey / M", calculated_price: { calculated_amount: 2500, original_amount: 5000 }, options: [{ value: "Grey" }, { value: "Zip-Up" }, { value: "M" }] },
        ],
        options: [
            {
                title: "Color",
                values: [
                    { id: "c2-1", value: "Black" },
                    { id: "c2-2", value: "Grey" },
                    { id: "c2-3", value: "Maroon" },
                ]
            },
            {
                title: "Style",
                values: [
                    { id: "st2-1", value: "Pullover" },
                    { id: "st2-2", value: "Zip-Up" },
                ]
            },
            {
                title: "Size",
                values: [
                    { id: "sz1", value: "M" },
                    { id: "sz2", value: "L" },
                    { id: "sz3", value: "XL" },
                ]
            }
        ],
        weight: 500,
        created_at: "2026-03-02T00:00:00Z",
        print_locations: ["Front", "Back"],
        print_additional_prices: { Back: 2.00 },
        default_print_position: "Front",
        metadata: { supports_customization: false },
        product_builder: { complementary_products: [] }
    },
    {
        id: "p3",
        sellerId: "seller_3",
        seller: MOCK_SELLERS[2],
        handle: "takayasu-akira-tanktop",
        title: "Takayasu Akira Tanktop",
        category: "tanktop",
        description: "Áo ba lỗ thoáng mát phong cách Sumo Nhật Bản.",
        thumbnail: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        images: [{ url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80" }],
        variants: [
            { id: "v3", title: "Blue / M", calculated_price: { calculated_amount: 1250, original_amount: 2500 }, options: [{ value: "Blue" }, { value: "Standard" }, { value: "M" }] }
        ],
        options: [
            {
                title: "Color",
                values: [
                    { id: "c3-1", value: "Blue" },
                    { id: "c3-2", value: "White" },
                    { id: "c3-3", value: "Yellow" },
                ]
            },
            {
                title: "Style",
                values: [
                    { id: "st3-1", value: "Standard" },
                    { id: "st3-2", value: "Athletic" },
                ]
            },
            {
                title: "Size",
                values: [
                    { id: "sz-s", value: "S" },
                    { id: "sz-m", value: "M" },
                    { id: "sz-l", value: "L" },
                ]
            }
        ],
        weight: 150,
        created_at: "2026-03-03T00:00:00Z",
        print_locations: ["Front"],
        print_additional_prices: {},
        default_print_position: "Front",
        metadata: { supports_customization: false },
        product_builder: { complementary_products: [] }
    },
    {
        id: "p4",
        sellerId: "seller_1",
        seller: MOCK_SELLERS[0],
        handle: "annie-musical-hoodie",
        title: "Annie Musical Hoodie",
        category: "hoodie",
        description: "Áo hoodie in chữ Annie nổi bật.",
        thumbnail: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
        images: [{ url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80" }],
        variants: [
            { id: "v4", title: "Navy / L", calculated_price: { calculated_amount: 2100, original_amount: 3500 }, options: [{ value: "Navy" }, { value: "Pullover" }, { value: "L" }] }
        ],
        options: [
            {
                title: "Color",
                values: [
                    { id: "c4-1", value: "Navy" },
                    { id: "c4-2", value: "Black" },
                ]
            },
            {
                title: "Style",
                values: [
                    { id: "st4-1", value: "Pullover" },
                    { id: "st4-2", value: "Zip-Up" },
                ]
            },
            {
                title: "Size",
                values: [
                    { id: "s4-1", value: "L" },
                    { id: "s4-2", value: "XL" },
                ]
            }
        ],
        weight: 550,
        created_at: "2026-03-04T00:00:00Z",
        print_locations: ["Front", "Back"],
        print_additional_prices: { Back: 2.00 },
        default_print_position: "Front",
        metadata: { supports_customization: false },
        product_builder: { complementary_products: [] }
    },
    {
        id: "p5",
        sellerId: "seller_2",
        seller: MOCK_SELLERS[2],

        handle: "mike-gift-tshirt",
        category: "t-shirt",
        title: "MIKE Gift T-Shirt",
        description: "Chiếc áo hoàn hảo cho người tên Mike.",
        thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" }],
        variants: [
            { id: "v-p5-1", title: "Blue / S", calculated_price: { calculated_amount: 1500, original_amount: 3000 }, options: [{ value: "Blue" }, { value: "Classic Fit" }, { value: "S" }] },
            { id: "v-p5-2", title: "Red / M", calculated_price: { calculated_amount: 1500, original_amount: 3000 }, options: [{ value: "Red" }, { value: "Classic Fit" }, { value: "M" }] },
        ],
        options: [
            {
                title: "Color",
                values: [
                    { id: "color-blue", value: "Blue" },
                    { id: "c-red", value: "Red" },
                    { id: "c-green", value: "Green" },
                ]
            },
            {
                title: "Style",
                values: [
                    { id: "st5-1", value: "Classic Fit" },
                    { id: "st5-2", value: "Slim Fit" },
                ]
            },
            {
                title: "Size",
                values: [
                    { id: "size-s", value: "S" },
                    { id: "size-m", value: "M" },
                    { id: "size-l", value: "L" },
                ]
            }
        ],
        weight: 200,
        created_at: "2026-03-05T00:00:00Z",
        print_locations: ["Front", "Back", "Left Sleeve"],
        print_additional_prices: { Back: 2.00, "Left Sleeve": 1.50 },
        default_print_position: "Front",
        metadata: { supports_customization: true },
        product_builder: { complementary_products: [] }
    },
    {
        id: "p6",
        sellerId: "seller_3",
        seller: MOCK_SELLERS[2],
        handle: "retro-camera-tee",
        title: "Retro Camera Tee",
        category: "t-shirt",
        thumbnail: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549843/1-4-0b4972d89ec0ee9d5581a977a5971f952_ihw0rm.jpg",
        images: [{ url: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549843/1-4-0b4972d89ec0ee9d5581a977a5971f952_ihw0rm.jpg" }],
        variants: [
            { id: "v6", title: "Grey / M", calculated_price: { calculated_amount: 1600, original_amount: 3200 }, options: [{ value: "Grey" }, { value: "Classic Fit" }, { value: "M" }] }
        ],
        options: [
            { title: "Color", values: [{ id: "c6-1", value: "Grey" }, { id: "c6-2", value: "Sand" }] },
            { title: "Style", values: [{ id: "st6-1", value: "Classic Fit" }] },
            { title: "Size", values: [{ id: "s6-1", value: "S" }, { id: "s6-2", value: "M" }, { id: "s6-3", value: "L" }] }
        ],
        weight: 200,
        created_at: "2026-03-06T00:00:00Z",
        print_locations: ["Front"],
        print_additional_prices: {},
        default_print_position: "Front",
        metadata: { supports_customization: false },
        product_builder: { complementary_products: [] }
    },
    {
        id: "p7",
        sellerId: "seller_3",
        seller: MOCK_SELLERS[2],
        handle: "8bit-gamer-hoodie",
        title: "8-Bit Gamer Hoodie",
        category: "hoodie",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        images: [{ url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80" }],
        variants: [
            { id: "v7", title: "Black / XL", calculated_price: { calculated_amount: 3000, original_amount: 6000 }, options: [{ value: "Black" }, { value: "Pullover" }, { value: "XL" }] }
        ],
        options: [
            { title: "Color", values: [{ id: "c7-1", value: "Black" }, { id: "c7-2", value: "Purple" }] },
            { title: "Style", values: [{ id: "st7-1", value: "Pullover" }, { id: "st7-2", value: "Zip-Up" }] },
            { title: "Size", values: [{ id: "s7-1", value: "M" }, { id: "s7-2", value: "L" }, { id: "s7-3", value: "XL" }, { id: "s7-4", value: "2XL" }] }
        ],
        weight: 600,
        created_at: "2026-03-07T00:00:00Z",
        print_locations: ["Front", "Back"],
        print_additional_prices: { Back: 2.00 },
        default_print_position: "Front",
        metadata: { supports_customization: false },
        product_builder: { complementary_products: [] }
    },
    {
        id: "p8",
        sellerId: "seller_1",
        seller: MOCK_SELLERS[0],

        handle: "mountain-mug",
        category: "mug",
        title: "Mountain Mug",
        thumbnail: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549838/1-3-6313daceee35d940fed8ea4eba611593_kobrht.jpg",
        images: [{ url: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549838/1-3-6313daceee35d940fed8ea4eba611593_kobrht.jpg" }],
        variants: [
            { id: "v8-1", title: "White / 11oz", calculated_price: { calculated_amount: 1000, original_amount: 2000 }, options: [{ value: "White" }, { value: "11oz" }] },
            { id: "v8-2", title: "Black / 15oz", calculated_price: { calculated_amount: 1200, original_amount: 2400 }, options: [{ value: "Black" }, { value: "15oz" }] },
        ],
        options: [
            { title: "Color", values: [{ id: "c8-1", value: "White" }, { id: "c8-2", value: "Black" }] },
            { title: "Size", values: [{ id: "sz8-1", value: "11oz" }, { id: "sz8-2", value: "15oz" }] }
        ],
        weight: 350,
        created_at: "2026-03-08T00:00:00Z",
        print_locations: ["Front", "Back"],
        print_additional_prices: {},
        default_print_position: "Front",
        metadata: { supports_customization: true },
        product_builder: { complementary_products: [] }
    },
    {
        id: "p9",
        sellerId: "seller_1",
        seller: MOCK_SELLERS[0],
        handle: "ocean-waves-poster",
        category: "poster",
        title: "Ocean Poster",
        thumbnail: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549838/1-3-6313daceee35d940fed8ea4eba611593_kobrht.jpg",
        images: [{ url: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549838/1-3-6313daceee35d940fed8ea4eba611593_kobrht.jpg" }],
        variants: [
            { id: "v9-1", title: "A4", calculated_price: { calculated_amount: 900, original_amount: 1800 }, options: [{ value: "A4" }] },
            { id: "v9-2", title: "A3", calculated_price: { calculated_amount: 1200, original_amount: 2400 }, options: [{ value: "A3" }] },
            { id: "v9-3", title: "A2", calculated_price: { calculated_amount: 1800, original_amount: 3600 }, options: [{ value: "A2" }] },
        ],
        options: [
            { title: "Size", values: [{ id: "sz9-1", value: "A4" }, { id: "sz9-2", value: "A3" }, { id: "sz9-3", value: "A2" }] }
        ],
        weight: 100,
        created_at: "2026-03-09T00:00:00Z",
        print_locations: [],
        print_additional_prices: {},
        default_print_position: "",
        metadata: { supports_customization: false },
        product_builder: { complementary_products: [] }
    },
    {
        id: "p10",
        sellerId: "seller_2",
        seller: MOCK_SELLERS[1],
        category: "sweatshirt",
        handle: "lofi-sweatshirt",
        title: "Lofi Sweatshirt",
        thumbnail: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
        images: [{ url: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80" }],
        variants: [
            { id: "v10", title: "Lilac / L", calculated_price: { calculated_amount: 2250, original_amount: 4500 }, options: [{ value: "Lilac" }, { value: "Relaxed Fit" }, { value: "L" }] }
        ],
        options: [
            { title: "Color", values: [{ id: "c10-1", value: "Lilac" }, { id: "c10-2", value: "Pink" }, { id: "c10-3", value: "White" }] },
            { title: "Style", values: [{ id: "st10-1", value: "Relaxed Fit" }, { id: "st10-2", value: "Cropped" }] },
            { title: "Size", values: [{ id: "s10-1", value: "S" }, { id: "s10-2", value: "M" }, { id: "s10-3", value: "L" }] }
        ],
        weight: 450,
        created_at: "2026-03-10T00:00:00Z",
        print_locations: ["Front", "Back"],
        print_additional_prices: { Back: 2.00 },
        default_print_position: "Front",
        metadata: { supports_customization: false },
        product_builder: { complementary_products: [] }
    },
    {
        id: "p11",
        sellerId: "seller_2",
        seller: MOCK_SELLERS[1],
        handle: "english-important-math-shirt",
        category: "t-shirt",
        title: "English is important but Math is Importanter",
        description: "Chiếc áo thun hài hước với dòng chữ 'English is important but Math is Importanter'.",
        thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" }],
        variants: [
            { id: "v11-1", title: "Black / M", calculated_price: { calculated_amount: 1495, original_amount: 2990 }, options: [{ value: "Black" }, { value: "Unisex" }, { value: "M" }] },
            { id: "v11-2", title: "Black / L", calculated_price: { calculated_amount: 1495, original_amount: 2990 }, options: [{ value: "Black" }, { value: "Unisex" }, { value: "L" }] },
        ],
        options: [
            {
                title: "Color",
                values: [
                    { id: "c11-1", value: "Black" },
                    { id: "c11-2", value: "Dark Gray" },
                    { id: "c11-3", value: "Navy" },
                ]
            },
            {
                title: "Style",
                values: [
                    { id: "st11-1", value: "Unisex" },
                    { id: "st11-2", value: "Women's Fit" },
                ]
            },
            {
                title: "Size",
                values: [
                    { id: "s11-1", value: "S" },
                    { id: "s11-2", value: "M" },
                    { id: "s11-3", value: "L" },
                    { id: "s11-4", value: "XL" },
                    { id: "s11-5", value: "2XL" },
                ]
            }
        ],
        weight: 200,
        created_at: "2026-03-11T00:00:00Z",
        print_locations: ["Front"],
        print_additional_prices: {},
        default_print_position: "Front",
        metadata: { supports_customization: true },
        product_builder: { complementary_products: [] }
    },
    {
        id: "p12",
        sellerId: "seller_2",
        seller: MOCK_SELLERS[1],
        handle: "custom-couple-mug",
        category: "mug",
        title: "Annoying Couple Mug",
        description: "Tùy chỉnh cốc đôi với các màu da, kiểu tóc, cộc kính mắt và phụ kiện khác.",
        thumbnail: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549837/1-2-ae193eb82430001ab38746f8223aed222_zzsppw.jpg",
        images: [{ url: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549837/1-2-ae193eb82430001ab38746f8223aed222_zzsppw.jpg" }],
        variants: [
            { id: "v12-1", title: "White / 11oz", calculated_price: { calculated_amount: 1500, original_amount: 3000 }, options: [{ value: "White" }, { value: "11oz" }] },
            { id: "v12-2", title: "Black / 15oz", calculated_price: { calculated_amount: 1700, original_amount: 3400 }, options: [{ value: "Black" }, { value: "15oz" }] },
        ],
        options: [
            { title: "Color", values: [{ id: "c12-1", value: "White" }, { id: "c12-2", value: "Black" }] },
            { title: "Size", values: [{ id: "sz12-1", value: "11oz" }, { id: "sz12-2", value: "15oz" }] }
        ],
        weight: 350,
        created_at: "2026-03-12T00:00:00Z",
        print_locations: ["Front", "Back"],
        print_additional_prices: {},
        default_print_position: "Front",
        metadata: { supports_customization: true, customization_type: "couple-portrait" },
        product_builder: { complementary_products: [] }
    },
    {
        id: "p13",
        sellerId: "seller_3",
        seller: MOCK_SELLERS[2],
        category: "t-shirt",
        handle: "vintage-vinyl-tshirt",
        title: "Vintage Vinyl Record Tee",
        description: "Áo thun kiểu Vintage với in hình đĩa vinyl cổ điển.",
        thumbnail: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549838/1-2-b2faedb8ef9e84b47d04b7a2d99775202_ftw0mz.jpg",
        images: [{ url: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549838/1-2-b2faedb8ef9e84b47d04b7a2d99775202_ftw0mz.jpg" }],
        variants: [
            { id: "v13-1", title: "Black / M", calculated_price: { calculated_amount: 1795, original_amount: 2990 }, options: [{ value: "Black" }, { value: "Classic Retro" }, { value: "M" }] },
            { id: "v13-2", title: "Cream / L", calculated_price: { calculated_amount: 1795, original_amount: 2990 }, options: [{ value: "Cream" }, { value: "Classic Retro" }, { value: "L" }] },
        ],
        options: [
            {
                title: "Color",
                values: [
                    { id: "c13-1", value: "Black" },
                    { id: "c13-2", value: "Cream" },
                    { id: "c13-3", value: "Brown" },
                ]
            },
            {
                title: "Style",
                values: [
                    { id: "st13-1", value: "Classic Retro" },
                    { id: "st13-2", value: "Modern Fit" },
                ]
            },
            {
                title: "Size",
                values: [
                    { id: "s13-1", value: "XS" },
                    { id: "s13-2", value: "S" },
                    { id: "s13-3", value: "M" },
                    { id: "s13-4", value: "L" },
                    { id: "s13-5", value: "XL" },
                    { id: "s13-6", value: "2XL" },
                ]
            }
        ],
        weight: 210,
        created_at: "2026-03-13T00:00:00Z",
        print_locations: ["Front", "Back"],
        print_additional_prices: { Back: 1.50 },
        default_print_position: "Front",
        metadata: { supports_customization: false },
        product_builder: { complementary_products: [] }
    }
];

// =============================================================================

const csvWriter = createObjectCsvWriter({
    path: './medusa-products-import.csv',
    header: [
        { id: 'productId', title: 'Product Id' },
        { id: 'productHandle', title: 'Product Handle' },
        { id: 'productTitle', title: 'Product Title' },
        { id: 'productSubtitle', title: 'Product Subtitle' },
        { id: 'productDescription', title: 'Product Description' },
        { id: 'productStatus', title: 'Product Status' },
        { id: 'productThumbnail', title: 'Product Thumbnail' },
        { id: 'productWeight', title: 'Product Weight' },
        { id: 'productLength', title: 'Product Length' },
        { id: 'productWidth', title: 'Product Width' },
        { id: 'productHeight', title: 'Product Height' },
        { id: 'productHSCode', title: 'Product HS Code' },
        { id: 'productOriginCountry', title: 'Product Origin Country' },
        { id: 'productMIDCode', title: 'Product MID Code' },
        { id: 'productMaterial', title: 'Product Material' },
        { id: 'shippingProfileId', title: 'Shipping Profile Id' },
        { id: 'productSalesChannel1', title: 'Product Sales Channel 1' },
        { id: 'productCollectionId', title: 'Product Collection Id' },
        { id: 'productTypeId', title: 'Product Type Id' },
        { id: 'productTag1', title: 'Product Tag 1' },
        { id: 'productDiscountable', title: 'Product Discountable' },
        { id: 'productExternalId', title: 'Product External Id' },
        { id: 'variantId', title: 'Variant Id' },
        { id: 'variantTitle', title: 'Variant Title' },
        { id: 'variantSKU', title: 'Variant SKU' },
        { id: 'variantBarcode', title: 'Variant Barcode' },
        { id: 'variantAllowBackorder', title: 'Variant Allow Backorder' },
        { id: 'variantManageInventory', title: 'Variant Manage Inventory' },
        { id: 'variantWeight', title: 'Variant Weight' },
        { id: 'variantLength', title: 'Variant Length' },
        { id: 'variantWidth', title: 'Variant Width' },
        { id: 'variantHeight', title: 'Variant Height' },
        { id: 'variantHSCode', title: 'Variant HS Code' },
        { id: 'variantOriginCountry', title: 'Variant Origin Country' },
        { id: 'variantMIDCode', title: 'Variant MID Code' },
        { id: 'variantMaterial', title: 'Variant Material' },
        { id: 'variantPriceEUR', title: 'Variant Price EUR' },
        { id: 'variantPriceUSD', title: 'Variant Price USD' },
        { id: 'variantOption1Name', title: 'Variant Option 1 Name' },
        { id: 'variantOption1Value', title: 'Variant Option 1 Value' },
        { id: 'variantOption2Name', title: 'Variant Option 2 Name' },
        { id: 'variantOption2Value', title: 'Variant Option 2 Value' },
        { id: 'variantOption3Name', title: 'Variant Option 3 Name' },
        { id: 'variantOption3Value', title: 'Variant Option 3 Value' },
        { id: 'productImage1Url', title: 'Product Image 1 Url' },
        { id: 'productImage2Url', title: 'Product Image 2 Url' },
    ]
});

const records = [];

MOCK_PRODUCTS_DATABASE.forEach((product) => {
    const sellerName = product.seller?.name || product.sellerId || 'Default Seller';
    const images = product.images || [];
    const img1 = images[0] ? (images[0].url || images[0]) : '';
    const img2 = images[1] ? (images[1].url || images[1]) : '';
    const thumbnail = product.thumbnail || img1;

    const optionNames = product.options ? product.options.map(opt => opt.title) : [];

    product.variants.forEach((variant) => {
        const optionValues = variant.options ? variant.options.map(opt => opt.value) : [];

        records.push({
            productId: '',
            productHandle: product.handle,
            productTitle: product.title,
            productSubtitle: '',
            productDescription: product.description || '',
            productStatus: 'published',
            productThumbnail: thumbnail,
            productWeight: product.weight || '',
            productLength: '',
            productWidth: '',
            productHeight: '',
            productHSCode: '',
            productOriginCountry: '',
            productMIDCode: '',
            productMaterial: '',
            shippingProfileId: '',
            productSalesChannel1: '',
            productCollectionId: '',
            productTypeId: '',
            productTag1: sellerName,
            productDiscountable: 'TRUE',
            productExternalId: product.id,
            variantId: '',
            variantTitle: variant.title,
            variantSKU: '',
            variantBarcode: '',
            variantAllowBackorder: 'FALSE',
            variantManageInventory: 'TRUE',
            variantWeight: product.weight || '',
            variantLength: '',
            variantWidth: '',
            variantHeight: '',
            variantHSCode: '',
            variantOriginCountry: '',
            variantMIDCode: '',
            variantMaterial: '',
            variantPriceEUR: '',
            variantPriceUSD: variant.calculated_price?.calculated_amount || '',
            variantOption1Name: optionNames[0] || '',
            variantOption1Value: optionValues[0] || '',
            variantOption2Name: optionNames[1] || '',
            variantOption2Value: optionValues[1] || '',
            variantOption3Name: optionNames[2] || '',
            variantOption3Value: optionValues[2] || '',
            productImage1Url: img1,
            productImage2Url: img2,
            shippingProfileId: SHIPPING_PROFILE_ID,
            productSalesChannel1: SALES_CHANNEL_ID,
        });
    });
});

csvWriter.writeRecords(records)
    .then(() => {
        console.log('✅ Đã tạo thành công file: medusa-products-import.csv');
        console.log('📤 Upload file này vào Medusa Admin → Products → Import');
    })
    .catch(err => console.error('❌ Lỗi:', err));