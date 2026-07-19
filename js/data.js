// ============================================================
//  GramBazaar — Mock Data
//  All products and artisans used across the prototype
// ============================================================

const ARTISANS = [
  {
    id: "a1",
    name: "Meera Devi",
    craft: "Handloom Weaving",
    village: "Chanderi",
    state: "Madhya Pradesh",
    bio: "Meera has been weaving silk sarees since the age of 12, a craft passed down through seven generations of her family. Her intricate patterns tell stories of the forests and rivers of Madhya Pradesh.",
    products: ["p1", "p4"],
    joinedYear: 2022,
    totalSales: 142,
    image: "artisan_1",
    rating: 4.9
  },
  {
    id: "a2",
    name: "Ramnath Kumhar",
    craft: "Terracotta Pottery",
    village: "Molela",
    state: "Rajasthan",
    bio: "Ramnath is a 4th generation potter from Molela, renowned for sacred terracotta votive plaques. His work has been exhibited in Delhi and Mumbai, yet he remains committed to his village.",
    products: ["p2", "p5"],
    joinedYear: 2021,
    totalSales: 289,
    image: "artisan_2",
    rating: 4.8
  },
  {
    id: "a3",
    name: "Kavitha Nair",
    craft: "Tribal Embroidery",
    village: "Bastar",
    state: "Chhattisgarh",
    bio: "Kavitha creates stunning tribal embroidery and jewelry using age-old techniques of the Gond tribe. Each piece is unique — a wearable piece of living heritage.",
    products: ["p3", "p6"],
    joinedYear: 2023,
    totalSales: 87,
    image: "artisan_3",
    rating: 4.7
  }
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Chanderi Silk Saree",
    artisanId: "a1",
    artisanName: "Meera Devi",
    village: "Chanderi, MP",
    category: "Textiles",
    price: 2850,
    artisanShare: 2650,
    platformFee: 200,
    description: "A masterpiece of handloom weaving — pure Chanderi silk with traditional geometric borders in deep crimson and gold zari work. 6.5 metres including blouse piece. Each saree takes 3–4 days to complete.",
    image: "product_saree",
    badge: "GI Tagged",
    stock: 5,
    tags: ["saree", "silk", "handloom", "textile"],
    rating: 4.9,
    reviews: 38
  },
  {
    id: "p2",
    name: "Terracotta Pot Set (3 pcs)",
    artisanId: "a2",
    artisanName: "Ramnath Kumhar",
    village: "Molela, Rajasthan",
    category: "Pottery",
    price: 950,
    artisanShare: 870,
    platformFee: 80,
    description: "Set of three hand-thrown terracotta pots decorated with traditional Rajasthani folk motifs. Perfect for home décor or as a gift. Each piece is signed by the artisan.",
    image: "product_pottery",
    badge: "Bestseller",
    stock: 12,
    tags: ["pottery", "terracotta", "home decor", "gift"],
    rating: 4.8,
    reviews: 61
  },
  {
    id: "p3",
    name: "Tribal Silver Necklace",
    artisanId: "a3",
    artisanName: "Kavitha Nair",
    village: "Bastar, CG",
    category: "Jewelry",
    price: 1750,
    artisanShare: 1620,
    platformFee: 130,
    description: "Handcrafted tribal necklace in oxidised silver with mirror work and traditional Gond beadwork. One-of-a-kind piece. Comes in a handmade jute gift box.",
    image: "product_jewelry",
    badge: "One of a Kind",
    stock: 3,
    tags: ["jewelry", "silver", "tribal", "necklace"],
    rating: 4.7,
    reviews: 22
  },
  {
    id: "p4",
    name: "Handwoven Dhurrie Carpet",
    artisanId: "a1",
    artisanName: "Meera Devi",
    village: "Chanderi, MP",
    category: "Textiles",
    price: 3200,
    artisanShare: 2980,
    platformFee: 220,
    description: "Flat-woven cotton dhurrie in traditional indigo and rust geometric patterns. Size: 4×6 feet. Hand-washed with natural dyes, eco-friendly. Ideal for living rooms.",
    image: "product_carpet",
    badge: "Eco Friendly",
    stock: 4,
    tags: ["carpet", "dhurrie", "handwoven", "home decor"],
    rating: 4.9,
    reviews: 17
  },
  {
    id: "p5",
    name: "Bamboo Basket Gift Set",
    artisanId: "a2",
    artisanName: "Ramnath Kumhar",
    village: "Molela, Rajasthan",
    category: "Bamboo Crafts",
    price: 650,
    artisanShare: 595,
    platformFee: 55,
    description: "Set of 3 hand-woven bamboo baskets in graduated sizes with colorful saffron and green thread accents. Multi-purpose — perfect for storage, gifting, or display.",
    image: "product_bamboo",
    badge: "Eco Friendly",
    stock: 18,
    tags: ["bamboo", "basket", "eco", "storage"],
    rating: 4.6,
    reviews: 44
  },
  {
    id: "p6",
    name: "Madhubani Folk Painting",
    artisanId: "a3",
    artisanName: "Kavitha Nair",
    village: "Bastar, CG",
    category: "Paintings",
    price: 1200,
    artisanShare: 1110,
    platformFee: 90,
    description: "Original Madhubani painting on handmade paper — peacock and lotus motifs in natural mineral colors. Unframed, 12×16 inches. Certificate of authenticity included.",
    image: "product_painting",
    badge: "Original Art",
    stock: 6,
    tags: ["painting", "madhubani", "art", "folk"],
    rating: 4.8,
    reviews: 29
  }
];

const CATEGORIES = ["All", "Textiles", "Pottery", "Jewelry", "Bamboo Crafts", "Paintings"];

const IMPACT_STATS = {
  artisans: 1247,
  products: 8934,
  states: 22,
  savingsVsMiddleman: "₹42 Lakhs"
};

// Image path resolver — maps image keys to actual file paths
function getImagePath(key) {
  const map = {
    // Artisan portraits
    "artisan_1":       "C:/Users/hp/.gemini/antigravity/brain/0ddabfdc-ab27-4604-95f3-fe25fa1e48e0/artisan_1_1784464475535.png",
    "artisan_2":       "C:/Users/hp/.gemini/antigravity/brain/0ddabfdc-ab27-4604-95f3-fe25fa1e48e0/artisan_2_1784464486784.png",
    "artisan_3":       "",  // quota exceeded — emoji fallback used
    // Products
    "product_saree":   "C:/Users/hp/.gemini/antigravity/brain/0ddabfdc-ab27-4604-95f3-fe25fa1e48e0/product_saree_1784464496811.png",
    "product_pottery": "C:/Users/hp/.gemini/antigravity/brain/0ddabfdc-ab27-4604-95f3-fe25fa1e48e0/product_pottery_1784464507594.png",
    "product_bamboo":  "C:/Users/hp/.gemini/antigravity/brain/0ddabfdc-ab27-4604-95f3-fe25fa1e48e0/product_bamboo_1784464524310.png",
    "product_jewelry": "",  // emoji fallback: 💎
    "product_carpet":  "",  // emoji fallback: 🧵
    "product_painting":"",  // emoji fallback: 🎨
    // Hero
    "hero_banner":     "C:/Users/hp/.gemini/antigravity/brain/0ddabfdc-ab27-4604-95f3-fe25fa1e48e0/hero_banner_1784464464382.png"
  };
  return map[key] || "";
}

// Export for module use or attach to window
if (typeof window !== "undefined") {
  window.GB = { ARTISANS, PRODUCTS, CATEGORIES, IMPACT_STATS, getImagePath };
}
