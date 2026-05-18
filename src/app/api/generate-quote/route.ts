import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Membaca token API Key dari file .env.local milikmu
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key tidak ditemukan di dalam berkas .env.local le!" }, { status: 500 });
    }

    // 🚀 WINNING FIX: Memakai model 'gemini-2.5-flash' yang terbukti aktif di akunmu via jalur v1
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      return NextResponse.json({ error: errData.error?.message || "Server Gemini mengalami kendala teknis." }, { status: response.status });
    }

    const data = await response.json();
    const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Gagal merangkai kata.";

    return NextResponse.json({ reply: aiReply.trim() });

  } catch (error: any) {
    console.error("Crash di Backend Route:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}