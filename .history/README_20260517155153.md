# 🛠️ ToolHub — The Ultimate Digital Toolbox

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0--Beta-lime?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/Status-In_Development-orange?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <strong>ToolHub</strong> adalah sebuah platform <em>all-in-one web utility</em> modern yang dirancang untuk produktivitas harian dan kebutuhan teknis developer. Dibangun menggunakan arsitektur frontend berperforma tinggi dengan filosofi <strong>Privacy-First</strong>—seluruh pemrosesan data sensitif dilakukan sepenuhnya di sisi klien (lokal pada browser pengguna) tanpa melibatkan server pihak ketiga.
</p>

---

## 🚀 Tech Stack & Fitur Unggulan

### ⚙️ Core Technologies
- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router & Turbopack)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Minimalist Dark Mode Aesthetics)
- **Component Icons:** [Lucide React](https://lucide.dev/)
- **Libraries:** `@yudiel/react-qr-scanner` & `jsqr` (Lokal Gambar Decoder)
- **Deployment:** [Vercel](https://vercel.com/)

### 🧭 Eksplorasi 14 Fitur Saat Ini
Aplikasi ini menyediakan antarmuka super responsif yang dibagi menjadi tiga kategori utama:

1. **Security & Dev Tools:** - *JSON Formatter & Minifier* — Merapikan dan mengompresi struktur data objek.
   - *Base64 Converter* — Enkripsi dan dekripsi teks instan.
   - *SHA256 Hash Generator* — Pengacak keamanan berbasis Web Crypto API.
   - *Password Generator* — Generator sandi kuat dengan kustomisasi parameter variabel.
2. **Media & Utility:**
   - *QR Code Generator* — Membuat QR Code dari URL/Teks secara instan dan dapat diunduh.
   - *QR Code Scanner* — Pemindai dua arah via akses kamera langsung atau unggah file dari galeri.
   - *Local Image Compressor* — Memperkecil ukuran file gambar tanpa mengurangi kualitas secara drastis (100% lokal).
   - *Color Picker* — Alat bantu ekstraksi kode warna HEX dan RGB untuk desainer UI/UX.
   - *IP Info Finder* — Deteksi jaringan IP dan informasi provider secara aktual.
3. **Productivity & Essentials:**
   - *To-Do List* — Manajemen tugas interaktif yang terintegrasi dengan `localStorage`.
   - *Text Case Converter* — Konversi teks cepat (UPPER, lower, Title, dll).
   - *Word Counter* — Penghitung jumlah kata, karakter, dan baris *real-time*.
   - *Stopwatch & Lap Timer* — Penghitung waktu presisi dengan pencatatan jeda.
   - *Age Calculator & Digital Calculator* — Utilitas perhitungan matematika dasar dan umur mendetail.

---

## 📈 Rencana Pengembangan Kedepan (Future Roadmap)

ToolHub dirancang untuk terus tumbuh secara berkala. Berikut adalah beberapa fitur fungsional dan peningkatan arsitektur yang direncanakan pada pembaruan mendatang:

- [ ] **Sistem Autentikasi Opsional (NextAuth.js):** Sinkronisasi data To-Do List lintas perangkat menggunakan database cloud yang aman.
- [ ] **Alat Tambahan Developer:** Menambahkan *Regex Tester*, *Markdown Live Preview Editor*, dan *JWT (JSON Web Token) Debugger*.
- [ ] **Media Suite Tool:** Fitur potong gambar (*Image Cropper*) dan konverter format file gambar (PNG ke WebP/JPEG).
- [ ] **Peningkatan PWA (Progressive Web App):** Optimalisasi agar aplikasi dapat diinstal langsung di HP Android/iOS dan dijalankan secara *offline* sepenuhnya.

---

## 💻 Panduan Instalasi Lokal

Ingin menjalankan atau ikut mengembangkan project ini di perangkatmu? Ikuti instruksi berikut:

```bash
# 1. Clone repositori ini
git clone [https://github.com/Tenno1208/toolhub.git](https://github.com/Tenno1208/toolhub.git)

# 2. Masuk ke direktori project
cd toolhub

# 3. Install semua dependensi package yang diperlukan
npm install

# 4. Jalankan lokal development server
npm run dev