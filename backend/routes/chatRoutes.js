const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Bind dynamically to existing MongoDB collections
const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({}, { strict: false }), 'products');
const Category = mongoose.models.Category || mongoose.model('Category', new mongoose.Schema({}, { strict: false }), 'categories');
const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', new mongoose.Schema({}, { strict: false }), 'coupons');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const rawKey = process.env.GEMINI_API_KEY || '';
    const apiKey = rawKey.trim().replace(/^["']|["']$/g, '');

    if (!apiKey) {
      return res.status(500).json({ reply: "GEMINI_API_KEY is missing from backend .env" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Build a dynamic search pattern from user keywords (ignore small words)
    const keywords = message
      .split(/\s+/)
      .map(w => w.replace(/[^a-zA-Z0-9]/g, ''))
      .filter(w => w.length > 2);

    const searchRegex = keywords.length > 0 ? new RegExp(keywords.join('|'), 'i') : null;

    // Search query condition
    const productQuery = searchRegex 
      ? {
          $or: [
            { title: searchRegex },
            { name: searchRegex },
            { productName: searchRegex },
            { category: searchRegex },
            { description: searchRegex }
          ]
        }
      : {};

    let storeContext = '';

    try {
      // Execute targeted searches concurrently
      const [matchedProducts, categories, coupons] = await Promise.all([
        Product.find(productQuery).limit(10).lean(),
        Category.find({}).limit(10).lean(),
        Coupon.find({}).limit(5).lean()
      ]);

      // Fallback to general items if exact search yields no matches
      let finalProducts = matchedProducts;
      if (finalProducts.length === 0 && searchRegex) {
        finalProducts = await Product.find({}).limit(10).lean();
      }

      // Format product results
      if (finalProducts.length > 0) {
        storeContext += "RELEVANT PRODUCTS:\n" + finalProducts.map(p => {
          const name = p.title || p.name || p.productName || 'Item';
          const price = p.price ? `₹${p.price}` : 'Price N/A';
          const category = p.category || p.categoryName || 'General';
          const desc = p.description || p.desc || '';
          return `- ${name} (${category}): ${price}. ${desc}`;
        }).join('\n');
      }

      // Format available categories
      if (categories.length > 0) {
        storeContext += "\n\nSTORE CATEGORIES:\n" + categories.map(c => 
          `- ${c.name || c.categoryName || c.title}`
        ).join('\n');
      }

      // Format active coupons
      if (coupons.length > 0) {
        storeContext += "\n\nACTIVE COUPONS:\n" + coupons.map(c => 
          `- Code: ${c.code || c.couponCode} (${c.discount || c.discountPercentage || 0}% OFF)`
        ).join('\n');
      }

    } catch (dbErr) {
      console.warn('MongoDB search warning:', dbErr.message);
    }

    if (!storeContext) {
      storeContext = "No matching catalog items found in database.";
    }

    const systemInstruction = `You are "Cartiva AI", a helpful e-commerce sales assistant for Cartiva store.
    Answer user queries using ONLY the store database context provided below:
    
    ${storeContext}

    Guidelines:
    - Only recommend items listed in the provided context.
    - If a specific requested item is not found, offer alternative products or categories from the context.
    - Keep answers clear, polite, and under 3 sentences.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
    const result = await model.generateContent(`${systemInstruction}\n\nUser Question: ${message}`);

    res.json({ reply: result.response.text() });

  } catch (error) {
    console.error('--- GEMINI API ERROR ---', error.message || error);
    res.status(500).json({ 
      reply: "I'm having a little trouble fetching catalog data right now." 
    });
  }
});

module.exports = router;