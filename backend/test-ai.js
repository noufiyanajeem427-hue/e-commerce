require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  console.log("Checking GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "EXISTS" : "MISSING");
  
  if (!process.env.GEMINI_API_KEY) {
    console.log("❌ Please add GEMINI_API_KEY to your backend/.env file.");
    return;
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim().replace(/^["']|["']$/g, ""));
  const modelName = "gemini-1.5-flash";
  
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
