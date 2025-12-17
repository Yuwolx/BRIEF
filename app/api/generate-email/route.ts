import OpenAI from "openai"
import { NextResponse } from "next/server"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      myRole,
      recipientRole,
      projectName,
      senderName,
      recipientName,
      contextText,
      purpose,
      clarifications,
      language,
    } = body

    const prompt = `
You are an assistant that writes clear internal business request emails.

Sender role: ${myRole}
Recipient role: ${recipientRole}
Sender name: ${senderName}
Recipient name: ${recipientName}
Project: ${projectName}

Context:
${contextText}

Purpose:
${purpose}

Additional clarifications:
${JSON.stringify(clarifications, null, 2)}

Write a concise, professional business email in ${language}.
`

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    })

    return NextResponse.json({
      result: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to generate email" },
      { status: 500 }
    )
  }
}
