const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../models/Product');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Clean space/newline padding
    const rawKey = process.env.GEMINI_API_KEY || '';
    const apiKey = rawKey.trim().replace(/^["']|["']$/g, '');

    if (!apiKey) {
      return res.status(500).json({ reply: "GEMINI_API_KEY is missing from backend .env" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    let productContext = `
      - Asus ROG Strix G16 (Electronics): ₹1,54,990
      - Samsung Galaxy S24 Ultra 5G (Electronics): ₹1,29,999
      - Sony WH-1000XM5 (Electronics): ₹29,990
    `;

    try {
      const products = await Product.find({})
        .select('title price category description')
        .limit(15);

      if (products && products.length > 0) {
        productContext = products
          .map((p) => `- ${p.title} (${p.category}): ₹${p.price}. ${p.description || ''}`)
          .join('\n');
      }
    } catch (dbErr) {
      console.warn('DB fetch note:', dbErr.message);
    }

    const systemInstruction = `You are "Cartiva AI", a helpful e-commerce sales assistant for Cartiva store.
    Here is our store catalog:
    ${productContext}
    Keep answers helpful, polite, and short (under 3 sentences).`;

    // Active working model
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
    const result = await model.generateContent(`${systemInstruction}\n\nUser Question: ${message}`);

    res.json({ reply: result.response.text() });

  } catch (error) {
    console.error('--- GEMINI API ERROR ---', error.message || error);
    res.status(500).json({ 
      reply: "I'm having a little trouble connecting right now. Please try again in a moment!" 
    });
  }
});

module.exports = router;