# 🛠️ ToolHub — The Ultimate Digital Toolbox (LTS)

<p align="center">
  <img src="https://img.shields.io/badge/Version-3.0.0--LTS-purple?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/Status-Stable_Production-emerald?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <strong>ToolHub v3.0.0</strong> adalah sebuah platform <em>all-in-one web utility ecosystem</em> modern berkinerja tinggi yang dirancang untuk produktivitas harian, kebutuhan teknis developer, dan otomatisasi berbasis Kecerdasan Buatan (AI). Mengusung arsitektur mutakhir dengan filosofi <strong>Privacy-First</strong>—seluruh pemrosesan dokumen sensitif diselesaikan sepenuhnya di sisi klien (lokal pada RAM browser pengguna) tanpa ada kebocoran data ke server luar.
</p>

---

## 🚀 Tech Stack Utama & Arsitektur

Aplikasi ini dirancang dengan struktur kode yang sangat modular, bersih, minimalis, dan siap digunakan dalam jangka waktu lama (Long-Term Support):

- **Framework Frontend:** [Next.js 15+](https://nextjs.org/) (App Router & Kompilasi Turbopack Super Cepat)
- **Styling Engine:** [Tailwind CSS](https://tailwindcss.com/) (Premium Minimalist Dark Mode Aesthetics)
- **Komponen Ikon:** [Lucide React](https://lucide.dev/)
- **Core AI Engine:** Google Gemini AI v1 API Official (`gemini-2.5-flash` Integration)
- **Lokal OCR Engine:** [Tesseract.js](https://tesseract.projectnaptha.com/) (Neural Network lokal di browser)
- **Infrastruktur Cloud:** [Vercel Production Edge](https://vercel.com/)

---

## 🧭 Eksplorasi Ekosistem Fitur Utama (v3.0.0)

Antarmuka ToolHub dikelompokkan secara simetris dan responsif ke dalam tiga pilar fungsionalitas utama:

### 🧠 1. Productivity & Essentials Suite
Kumpulan alat bantu efisiensi waktu, pengerjaan tugas sekolah, portofolio instan, dan generator teks otomatis berbasis kecerdasan buatan:
- **Deep Focus Pomodoro Lab:** Sesi waktu fokus terintegrasi dengan pemutar audio `.mp3` *soundscape* alam asli (Hujan, Deburan Ombak, Kicau Burung) lokal untuk meredam distraksi sekitar.
- **PDF Merge & Split Utility:** Satukan beberapa file PDF terpisah menjadi satu dokumen utuh atau pecah halaman PDF tertentu secara instan dengan tata letak adaptif di layar HP.
- **AI Premium Caption Generator:** Mesin pencipta kalimat mutiara otomatis bersilang memanfaatkan API Gemini 2.5 Flash untuk vibes *Sukses/Motivasi, Kultur Gym/Fitness, Anak Senja, Sindiran Savage, dan Galau Sadboy*.
- **Portfolio Builder Pro:** Pembuat website portofolio instan dengan komponen interaktif, fitur *Live Preview*, dan ekspor langsung menjadi berkas file `.html` mandiri.
- **Fundamental Tools:** Word Counter, Text Case Manipulator, Digital Calculator, Age Calculator, Stopwatch Akurat, dan To-Do List terintegrasi `localStorage`.

### 🚀 2. Media, AI & Utilities
Ekstraksi data visual pintar, optimasi ukuran media, dan gerbang pengunduh konten media sosial tanpa watermark:
- **AI Text Extractor (Real OCR):** Pengekstrak teks murni berbasis AI lokal (Tesseract.js). Mampu memindai karakter tulisan latin dari foto catatan buku atau screenshot menjadi string teks siap salin secara instan.
- **Signature Pad Digital:** Papan pembuat tanda tangan digital dengan koordinat kuas 1:1 murni presisi sentuhan jari di smartphone. Hasil unduhan otomatis berlatar transparan format `.PNG` resolusi tinggi.
- **Social Media Downloader:** Pengunduh video TikTok tanpa watermark dengan penamaan file acak unik, serta pengunduh Reels/Foto Instagram resolusi HD.
- **Graphic Helpers:** Generator & Scanner QR Code dua arah, Local Image Compressor penurun ukuran file gambar, Color Picker (HEX/RGB), dan IP Info Finder.

### 🔒 3. Developer & Security Studio
Utilitas krusial untuk para pengembang perangkat lunak dalam memformat sintaksis, enkripsi data, dan pengujian ekspresi:
- **JSON Formatter Pro:** Alat merapikan lekukan struktur data objek (*Beautify*) atau memangkas ukuran spasi string kode (*Minify*) sekali klik.
- **SQL Query Formatter:** Merapikan indentasi syntax SQL otomatis.
- **Markdown Live Editor:** Menulis berkas markdown dengan *split-screen preview* aktual.
- **SVG to React JSX Converter:** Transformasi instan tag SVG menjadi komponen fungsional Next.js.
- **Git Command Generator & Regex Tester:** Solusi baris perintah Git siap pakai dan validasi kecocokan ekspresi reguler.
- **Security Suite:** SHA256 Hash Generator (Web Crypto API) dan Password Generator acak yang kuat.

---

## 💻 Panduan Instalasi Lokal

Ikuti langkah mudah berikut untuk menjalankan proyek ToolHub di mesin lokal Anda:

```bash
# 1. Clone repositori resmi
git clone [https://github.com/Tenno1208/toolhub.git](https://github.com/Tenno1208/toolhub.git)

# 2. Masuk ke direktori utama proyek
cd toolhub

# 3. Pasang semua dependensi package dengan bersih
npm install

# 4. Konfigurasi API Key
# Buat file bernama .env.local di root folder, lalu masukkan token Anda:
# GEMINI_API_KEY=isi_token_api_gemini_studio_anda_disini

# 5. Jalankan server lokal development
npm run dev