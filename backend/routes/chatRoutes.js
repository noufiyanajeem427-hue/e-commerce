const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const Product = require('../models/Product');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Changed from '/chat' to '/'
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let productContext = 'No active catalog listings found.';
    try {
      const products = await Product.find({})
        .select('title price category description')
        .limit(15);

      if (products.length > 0) {
        productContext = products
          .map((p) => `- ${p.title} (${p.category}): ₹${p.price}. ${p.description || ''}`)
          .join('\n');
      }
    } catch (dbErr) {
      console.warn('DB fetch error for chat context:', dbErr.message);
    }

    const systemInstruction = `
      You are "Cartiva AI", a helpful e-commerce sales assistant for the Cartiva online store.
      
      Here is our current store catalog:
      ${productContext}

      Guidelines:
      - Be polite, concise, and helpful.
      - If a user asks for recommendations, suggest matching products from the catalog with exact prices.
      - Keep responses short (under 3 sentences).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] }
      ]
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Gemini Chat Error:', error);
    res.status(500).json({ 
      reply: "I'm having a little trouble connecting right now. Please try again in a moment!" 
    });
  }
});

module.exports = router;