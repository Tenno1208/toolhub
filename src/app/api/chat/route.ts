import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, context, history } = await req.json();

    // Membaca API Key dari .env.local
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ reply: "Sistem mendeteksi file konfigurasi kunci asisten (.env.local) belum dikonfigurasi." }, { status: 500 });
    }

    // =========================================================================
    // 🚀 FORMULASI STRUKTUR PAYLOAD RESMI GEMINI 2.5 FLASH
    // =========================================================================
    const contentsPayload = [
      // 1. Masukkan Instruksi Konteks Sistem sebagai panduan awal di bagian atas
      {
        role: "user",
        parts: [{ text: `System Instruction/Context: ${context}` }]
      },
      {
        role: "model",
        parts: [{ text: "Siap dipahami. Saya akan bertindak sebagai AI Assistant resmi untuk ToolHub Tools dengan ramah, profesional, dan menggunakan bahasa Indonesia yang joss." }]
      },
      
      // 2. Map riwayat obrolan (history) sebelumnya ke format yang dikenali Gemini
      ...history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text || msg.content || "" }]
      })),
      
      // 3. Masukkan pesan aktif terbaru dari user di paling bawah
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    // 🚀 FIXED: Mengalihkan dari 'v1beta/gemini-1.5-flash' ke jalur stabil 'v1/gemini-2.5-flash' yang aktif di akunmu
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contentsPayload
      })
    });

    const resData = await response.json();
    
    // Jika ada kendala dari server Google, tangkap di console terminal
    if (!response.ok) {
      console.error("Gemini Error Response:", resData);
      return NextResponse.json({ 
        reply: `Akses Google AI Studio menolak otentikasi. Masalah: ${resData.error?.message || "Model tidak cocok"}` 
      });
    }

    // Parsing data berlapis secara aman sesuai silsilah JSON kandidat Gemini
    const replyText = resData.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak dapat memproses jawaban saat ini.";

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error("Internal Server Catch Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}