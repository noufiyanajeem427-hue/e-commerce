require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  console.log("Checking API Key:", process.env.GEMINI_API_KEY ? "EXISTS" : "MISSING");
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  const modelName = 'gemini-3.6-flash';
  
  try {
    console.log(`Testing model: ${modelName}...`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Say hello in 3 words");
    console.log(`\n✅ SUCCESS with ${modelName}! Response:`, result.response.text());
  } catch (err) {
    console.log(`❌ FAILED with ${modelName}:`, err.message);
  }
}

test();