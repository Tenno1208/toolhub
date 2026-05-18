import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // ❌ SALAH SEBELUMNYA: await document.json();
    // ✅ BENAR: Menggunakan objek request 'req' dari parameter fungsi
    const { message, context, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ reply: "Sistem mendeteksi file konfigurasi kunci asisten (.env) belum dikonfigurasi." }, { status: 500 });
    }

    const formattedPrompt = `${context}\n\nRiwayat Obrolan Terakhir:\n${history.map((h: any) => `${h.role}: ${h.text}`).join('\n')}\n\nUser: ${message}\nAssistant:`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: formattedPrompt }] }]
      })
    });

    const resData = await response.json();
    const replyText = resData.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak dapat memproses jawaban saat ini.";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}