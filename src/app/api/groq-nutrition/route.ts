import { NextResponse } from 'next/server';

// 📚 DATABASE RUJUKAN GIZI MAKANAN INDONESIA (Baku Kemenkes / Panganku)
// Diikat ketat di system prompt agar Llama tidak berhalusinasi angka acak
const OFFICIAL_NUTRITION_DICTIONARY = {
  "dada ayam": { calories: 165, protein: 31, carbs: 0, fat: 3.6, sodium: 74 },
  "paha ayam": { calories: 209, protein: 26, carbs: 0, fat: 10.9, sodium: 87 },
  "telur rebus": { calories: 77, protein: 6.3, carbs: 0.6, fat: 5.3, sodium: 62 },
  "telur goreng": { calories: 92, protein: 6.3, carbs: 0.6, fat: 7.0, sodium: 90 },
  "nasi putih": { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, sodium: 1 },
  "nasi goreng": { calories: 168, protein: 5.0, carbs: 21, fat: 7.0, sodium: 450 },
  "whey protein": { calories: 120, protein: 24, carbs: 3, fat: 1.5, sodium: 50 },
  "pisang": { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, sodium: 1 },
  "tempe goreng": { calories: 118, protein: 10, carbs: 7, fat: 7.5, sodium: 48 },
  "tahu rebus": { calories: 76, protein: 8, carbs: 1.9, fat: 4.8, sodium: 7 },
  "oatmeal": { calories: 68, protein: 2.4, carbs: 12, fat: 1.4, sodium: 2 },
  "daging sapi": { calories: 250, protein: 26, carbs: 0, fat: 15, sodium: 68 },
  "bubur ayam": { calories: 155, protein: 6.2, carbs: 23, fat: 4.1, sodium: 380 },
  "ikan salmon": { calories: 208, protein: 20, carbs: 0, fat: 13, sodium: 59 },
  "sate ayam": { calories: 153, protein: 16, carbs: 6.5, fat: 7.2, sodium: 290 },
  "roti gandum": { calories: 67, protein: 2.4, carbs: 12, fat: 1.1, sodium: 130 },
  "bakso": { calories: 202, protein: 12.2, carbs: 12, fat: 11.5, sodium: 340 } // 🚀 Ditambahkan entri bakso riil!
};

export async function POST(req: Request) {
  try {
    const { foodQuery, type } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Token Groq hilang dari .env.local le!" }, { status: 500 });
    }

    // 🔍 MODE 1: LIVE SEARCH SUGGESTIONS (Membaca kilat dari kamus lokal)
    if (type === 'search') {
      const keys = Object.keys(OFFICIAL_NUTRITION_DICTIONARY);
      const matched = keys.filter(k => k.includes(foodQuery.toLowerCase()));
      
      const suggestions = matched.map((name, idx) => ({
        id: name,
        name: name.toUpperCase(),
        desc: `Estimasi porsi standar makro gizi harian le.`
      }));

      return NextResponse.json({ suggestions });
    }

    // 📊 MODE 2: FETCH DETAIL NUTRISI (Llama bertindak sebagai kalkulator perkalian pintar)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `Anda adalah mesin kalkulator gizi pintar. Berikut adalah database gizi referensi resmi baku per porsi/100g:
            ${JSON.stringify(OFFICIAL_NUTRITION_DICTIONARY)}
            
            Tugas Anda:
            1. Analisis input makanan dari user.
            2. Cari makanan yang paling mendekati di database referensi resmi di atas.
            3. Jika ada kelipatan jumlah (misal: 2 butir, 2 piring, 200g), kalikan angka gizi dasar database dengan jumlah kelipatan tersebut secara matematika akurat.
            4. Jika makanan benar-benar tidak terdaftar di database, gunakan estimasi pakar gizi gizi Indonesia yang paling logis.
            5. Wajib kembalikan respons HANYA dalam bentuk format JSON objek mentah tanpa markdown.
            Format wajib persis:
            {"name": "Nama Makanan & Porsi", "calories": angka_kkal, "protein": angka_gram, "carbs": angka_gram, "fat": angka_gram, "sodium": angka_mg}`
          },
          {
            role: "user",
            content: `Hitung makro gizi untuk: "${foodQuery}"`
          }
        ],
        temperature: 0.0, // Paksa 0.0 mutlak agar patuh matematika kamus
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      return NextResponse.json({ error: errData.error?.message || "Server Groq sibuk le." }, { status: response.status });
    }

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "{}";

    return NextResponse.json({ reply: aiReply.trim() });

  } catch (error: any) {
    console.error("Crash di Backend Route Groq:", error);
    return NextResponse.json({ error: "Internal Server Error le" }, { status: 500 });
  }
}