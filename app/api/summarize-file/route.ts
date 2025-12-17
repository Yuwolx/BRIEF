import OpenAI from "openai"
import { NextResponse } from "next/server"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { fileName, fileContent } = body

    // 방어 로직
    if (!fileName) {
      return NextResponse.json(
        { error: "File name is required" },
        { status: 400 }
      )
    }

    // 파일 내용이 없는 경우 (PDF/DOCX 등)
    if (!fileContent || !fileContent.trim()) {
      return NextResponse.json({
        summary: `The uploaded file (${fileName}) does not contain readable text. Use the file name as contextual reference.`,
      })
    }

    const prompt = `
You are an assistant that summarizes internal business documents for collaboration.

Summarize the document below in 3 to 5 short bullet points.

Focus on:
- the purpose of the document
- key scope or requirements
- important deadlines or timelines
- assumptions, constraints, or risks

Do NOT copy sentences verbatim.
Do NOT include unnecessary details.

Document:
${fileContent}
`

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    })

    return NextResponse.json({
      summary: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to summarize file" },
      { status: 500 }
    )
  }
}
