import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = (process.env.GEMINI_API_KEY || "").trim().replace(/^["']|["']$/g, "");

    const systemPrompt = `You are "Cartiva AI" - a smart, friendly, and expert customer support and shopping assistant for Cartiva, a modern luxury e-commerce platform and multi-vendor marketplace.
Your goal is to help shoppers with:
1. Product recommendations (Electronics, Luxury Fashion, Home Decor, Beauty, Accessories).
2. Order tracking, express shipping details (free delivery on orders over $99, 3-5 business days).
3. Return and refund policies (30-day hassle-free returns).
4. Discounts, coupons, and seller inquiries.
Keep responses concise, polite, helpful, and formatted with markdown if needed. Keep under 3-4 sentences when possible.`;

    if (!apiKey) {
      // Fallback helpful response if no API key is set
      return NextResponse.json({
        reply: `Hello! Welcome to Cartiva Support. Regarding "${message}": You can explore our trending collections, track orders from the header menu, or contact our 24/7 support team. How else can I assist you today?`,
      });
    }

    // Call Google Gemini API (Gemini 1.5 Flash / 2.0 Flash)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${systemPrompt}\n\nCustomer Inquiry: ${message}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", response.status, errorText);
      // If error from Gemini API, provide graceful e-commerce reply
      return NextResponse.json({
        reply: `Thank you for reaching out! Regarding your inquiry: our team is here to assist with product orders, tracking, and instant support. If you need immediate assistance, please check our FAQ or contact support@cartiva.store.`,
      });
    }

    const data = await response.json();
    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here to help! Could you please provide a little more detail?";

    return NextResponse.json({ reply: botReply.trim() });
  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      {
        reply:
          "I'm experiencing a brief connectivity hiccup. Please feel free to ask again or check our quick links above!",
      },
      { status: 200 }
    );
  }
}
