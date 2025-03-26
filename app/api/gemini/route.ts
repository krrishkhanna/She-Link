import { NextResponse } from "next/server"

type Message = {
  role: string
  content: string
}

export async function POST(request: Request) {
  try {
    const { prompt, history } = await request.json()

    // Format the conversation history for Gemini
    const formattedHistory = history ? history.slice(0, -1) : []

    // Prepare the API request
    const apiKey = "AIzaSyB9ScUK6IzTFXtGs2lsnrpg_BOGa8h1ha0"
    // Updated API endpoint to use the correct version and model
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`

    // Create the context for the AI about SheLink
    const systemContext = `You are Sakhi, an AI assistant for SheLink, a secure community platform exclusively for women. 
    Your role is to provide helpful, supportive responses to women using the platform.
    SheLink offers features like secure messaging, community forums, events, and resources for women. You should provide information about these features, safety tips, and general support.
    Focus on being empathetic, informative, and supportive. Never share harmful content or advice.`

    // Updated request format for Gemini API
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: systemContext }],
        },
        ...formattedHistory.map((msg: Message) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Gemini API error:", errorData)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()

    // Extract the response text from the updated API response format
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response at the moment."

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Error in Gemini API route:", error)
    return NextResponse.json(
      {
        text: "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
      },
      { status: 200 },
    ) // Return a friendly message with 200 status to avoid breaking the UI
  }
}

