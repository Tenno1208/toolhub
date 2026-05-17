# ToolHub - The Ultimate Digital Toolbox

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

ToolHub adalah aplikasi *all-in-one utility* modern yang dibangun menggunakan arsitektur frontend yang cepat dan aman. Dirancang dengan filosofi *Privacy-First*, seluruh pemrosesan data (seperti enkripsi, kompresi gambar, dan generator sandi) dilakukan secara lokal di dalam *browser* pengguna tanpa intervensi server.

## ✨ Fitur Utama (14 Tools)

Aplikasi ini mencakup koleksi utilitas yang sering dibutuhkan oleh *developer* maupun pengguna umum, dibungkus dalam antarmuka *Dark Mode* yang minimalis dan responsif:

**Developer & Security**
- **JSON Formatter & Minifier:** Merapikan atau mengompres kode JSON.
- **Base64 Converter:** Encode dan decode teks ke format Base64.
- **SHA256 Hash Generator:** Mengenkripsi teks dengan Web Crypto API lokal.
- **Password Generator:** Membuat kata sandi acak dengan kriteria keamanan tinggi.

**Media & Identifikasi**
- **QR Code Generator:** Membuat kode QR instan dari URL/Teks yang dapat diunduh.
- **QR Code Scanner:** Memindai QR dari kamera langsung atau *upload* dari galeri.
- **Local Image Compressor:** Mengompresi ukuran gambar langsung di *browser* (tanpa *upload* ke server).
- **Color Picker:** Ekstraktor warna dengan konversi format HEX dan RGB.
- **IP Info Finder:** Melacak informasi geografis dan provider dari IP Address pengguna.

**Produktivitas & Teks**
- **To-Do List:** Manajemen tugas harian dengan integrasi `localStorage`.
- **Text Case Converter:** Mengubah format teks (UPPER, lower, Title, Sentence).
- **Word Counter:** Menghitung jumlah kata, karakter, dan baris secara *real-time*.
- **Stopwatch & Lap Timer:** Penghitung waktu presisi dengan pencatatan *lap*.
- **Age Calculator:** Menghitung umur detail hingga hitungan hari.
- **Calculator:** Kalkulator digital dasar untuk perhitungan cepat.

## 🚀 Teknologi yang Digunakan

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **QR Scanner:** `@yudiel/react-qr-scanner` & `jsqr`
- **Deployment:** Vercel

## 💻 Cara Instalasi & Menjalankan di Lokal

Untuk menjalankan *project* ini di komputermu sendiri, ikuti langkah-langkah berikut:

1. **Clone repositori ini**
   ```bash
   git clone [https://github.com/USERNAME_KAMU/toolhub-v1.git](https://github.com/USERNAME_KAMU/toolhub-v1.git)
   cd toolhub-v1