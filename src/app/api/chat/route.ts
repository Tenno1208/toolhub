import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, context, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ reply: "Sistem mendeteksi file konfigurasi kunci asisten (.env) belum dikonfigurasi." }, { status: 500 });
    }

    // =========================================================================
    // 🚀 FORMULASI STRUKTUR PAYLOAD RESMI GEMINI 1.5 FLASH
    // =========================================================================
    // Struktur content harus berupa array objek yang berisi role dan parts.
    
    const contentsPayload = [
      // 1. Masukkan Instruksi Konteks Sistem sebagai panduan awal di bagian atas
      {
        role: "user",
        parts: [{ text: `System Instruction/Context: ${context}` }]
      },
      {
        role: "model",
        parts: [{ text: "Siap dipahami. Saya akan bertindak sebagai AI Assistant resmi untuk RFF707/ToolHub Tools dengan ramah, profesional, dan menggunakan bahasa Indonesia yang joss." }]
      },
      
      // 2. Map riwayat obrolan (history) sebelumnya ke format yang dikenali Gemini
      ...history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model', // Gemini menggunakan 'model', bukan 'assistant'
        parts: [{ text: msg.text }]
      })),
      
      // 3. Masukkan pesan aktif terbaru dari user di paling bawah
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    // Hubungkan ke endpoint resmi Google Gemini API v1beta menggunakan metode generateContent
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contentsPayload // Kirim skema terstruktur
      })
    });

    const resData = await response.json();
    
    // Debugging point: Jika ada kendala dari server Google, tangkap di console terminal
    if (!response.ok) {
      console.error("Gemini Error Response:", resData);
      return NextResponse.json({ reply: "Akses Google AI Studio menolak otentikasi kunci saat ini." });
    }

    // Parsing data berlapis secara aman sesuai silsilah JSON kandidat Gemini
    const replyText = resData.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak dapat memproses jawaban saat ini.";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("Internal Server Catch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}