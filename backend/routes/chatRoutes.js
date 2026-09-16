const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const Coupon = require("../models/Coupon");

let GoogleGenerativeAI;
try {
  const geminiModule = require("@google/generative-ai");
  GoogleGenerativeAI = geminiModule.GoogleGenerativeAI;
} catch (e) {
  // Optional if package is not present
}

// =========================
// CHATBOT ASSISTANT ENDPOINT
// =========================
const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
        reply: "Please type a message so I can assist you!"
      });
    }

    const userQuery = message.trim();
    const rawKey = process.env.GEMINI_API_KEY || "";
    const apiKey = rawKey.trim().replace(/^["']|["']$/g, "");

    // Extract search keywords from user query
    const keywords = userQuery
      .split(/\s+/)
      .map((w) => w.replace(/[^a-zA-Z0-9]/g, ""))
      .filter((w) => w.length > 2);

    const searchRegex = keywords.length > 0 ? new RegExp(keywords.join("|"), "i") : null;

    const productQuery = searchRegex
      ? {
          isActive: true,
          $or: [
            { name: searchRegex },
            { brand: searchRegex },
            { description: searchRegex }
          ]
        }
      : { isActive: true };

    let storeContext = "";
    let matchedProducts = [];
    let categories = [];
    let coupons = [];

    try {
      [matchedProducts, categories, coupons] = await Promise.all([
        Product.find(productQuery).populate("category", "name").limit(8).lean(),
        Category.find({}).limit(8).lean(),
        Coupon.find({ isActive: true }).limit(5).lean()
      ]);

      // Fallback if no specific matched products
      if (matchedProducts.length === 0 && searchRegex) {
        matchedProducts = await Product.find({ isActive: true })
          .populate("category", "name")
          .limit(6)
          .lean();
      }

      if (matchedProducts.length > 0) {
        storeContext += "PRODUCTS IN STORE:\n" + matchedProducts.map((p) => {
          const name = p.name || "Product";
          const price = p.price ? `₹${p.price}` : "Price upon request";
          const cat = p.category?.name || "General";
          const desc = (p.shortDescription || p.description || "").slice(0, 100);
          return `- ${name} (${cat}): ${price} [In Stock: ${p.stock > 0 ? "Yes" : "No"}] - ${desc}`;
        }).join("\n");
      }

      if (categories.length > 0) {
        storeContext += "\n\nAVAILABLE CATEGORIES:\n" + categories.map((c) => `- ${c.name}`).join("\n");
      }

      if (coupons.length > 0) {
        storeContext += "\n\nACTIVE COUPONS:\n" + coupons.map((c) => {
          return `- Code: ${c.code} (${c.discount || c.discountPercentage || 10}% OFF)`;
        }).join("\n");
      }
    } catch (dbErr) {
      console.warn("MongoDB catalog search warning:", dbErr.message);
    }

    // Try Google Gemini AI if API Key is available
    if (apiKey && GoogleGenerativeAI) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const systemInstruction = `You are "Cartiva AI", an enthusiastic and helpful e-commerce shopping assistant for Cartiva store.
Answer user queries politely using the store catalog and information below:

${storeContext || "Store catalog is active."}

Guidelines:
- Recommend relevant products from the context with their price.
- If asked for discounts, share active coupon codes.
- If asked for order tracking, explain that orders can be tracked in the Orders section with Order ID.
- Keep answers concise, clear, and friendly (within 2-3 sentences).`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`${systemInstruction}\n\nUser Question: ${userQuery}`);
        const responseText = result.response.text();

        return res.status(200).json({
          success: true,
          reply: responseText
        });
      } catch (aiErr) {
        console.warn("Gemini API call notice, falling back to smart catalog assistant:", aiErr.message);
      }
    }

    // Intelligent Catalog Rule-based Assistant Fallback
    const lower = userQuery.toLowerCase();
    let reply = "";

    if (lower.includes("track") || lower.includes("status") || lower.includes("order")) {
      reply = "📦 You can easily track your orders in real-time under the 'Orders' section in the top menu or by entering your Order ID!";
    } else if (lower.includes("coupon") || lower.includes("discount") || lower.includes("code") || lower.includes("offer") || lower.includes("deal")) {
      if (coupons.length > 0) {
        const codes = coupons.map(c => `${c.code} (${c.discount || 20}% OFF)`).join(", ");
        reply = `🎉 We have special active offers right now: Use code ${codes} at checkout for instant savings!`;
      } else {
        reply = "🎉 Use coupon code LUXE20 or WELCOME10 at checkout to get an instant 20% discount on your entire order!";
      }
    } else if (lower.includes("return") || lower.includes("refund") || lower.includes("exchange") || lower.includes("policy")) {
      reply = "🔄 Cartiva offers a hassle-free 30-day return and exchange policy with 100% money-back guarantee for all eligible orders.";
    } else if (matchedProducts.length > 0) {
      const topItems = matchedProducts.slice(0, 3).map(p => `• ${p.name} (₹${p.price})`).join("\n");
      reply = `✨ Here are some great items matching your interest:\n${topItems}\n\nYou can click on any product to view details and add to cart!`;
    } else {
      reply = "👋 Welcome to Cartiva! I'm here to help you discover trending fashion, electronics, check live order statuses, and grab the best discount coupons. What are you looking for today?";
    }

    return res.status(200).json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("Chatbot route error:", error.message);
    res.status(500).json({
      success: false,
      reply: "I'm having a little trouble fetching catalog data right now. Please feel free to explore our collection!"
    });
  }
};

router.post("/", handleChat);
router.post("/send", handleChat);

module.exports = router;
