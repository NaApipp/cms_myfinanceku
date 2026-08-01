# MyFinanceKu CMS (Content Management System)

MyFinanceKu CMS adalah aplikasi berbasis web yang berfungsi sebagai pusat manajemen konten dan administrasi untuk platform finansial **MyFinanceKu**. Aplikasi ini dirancang khusus untuk administrator guna mengelola artikel/berita, memantau data berita, serta mengelola akun administrator lainnya secara aman dan efisien.

Aplikasi ini dibangun menggunakan framework modern **Next.js 16 (App Router)** dengan optimasi performa tinggi, validasi data yang ketat, dan integrasi penyimpanan media berbasis cloud.

---

## 🚀 Fitur Utama

1. **Autentikasi & Otorisasi Aman**:
   - Login & Logout administrator dengan sistem token berbasis **JWT (JSON Web Token)** yang disimpan secara aman dalam **HTTP-Only Cookie**.
   - Sistem proteksi halaman dan rute API menggunakan [middleware.ts](file:///e:/Code/cms_myfinanceku/app/middleware.ts) Next.js untuk mencegah akses dari pihak yang tidak memiliki wewenang.
   
2. **Manajemen Berita & Artikel (Berita)**:
   - **Form Multi-Step**: Proses pembuatan artikel yang dibagi menjadi 4 tahap sistematis untuk mempermudah administrator:
     1. *Info Dasar*: Pengisian judul, slug (otomatis/manual), tipe/kategori, dan bahasa artikel.
     2. *Konten*: Pengisian isi artikel utama, ringkasan (summary), dan unggah gambar thumbnail.
     3. *Penulis & Tag*: Menentukan nama penulis dan menambahkan tag pencarian yang relevan.
     4. *SEO*: Pengisian metadata SEO khusus (Meta Title, Meta Description, Meta Keywords, dan OG Image) untuk optimasi mesin pencari.
   - **Integrasi Cloudinary**: Media gambar yang diunggah langsung diproses melalui buffer serverless dan disimpan di cloud storage Cloudinary secara dinamis.
   - **Daftar Berita Interaktif**: Halaman monitoring dengan fitur pencarian teks (search), pengurutan dinamis (sorting), paginasi artikel, serta fungsi penghapusan berita terintegrasi.

3. **Manajemen User Admin**:
   - Pendaftaran akun administrator baru dengan alokasi peran spesifik (*Platform Role* seperti `admin_cms` atau `admin_finpay`).
   - Pemantauan daftar administrator yang terdaftar melalui tabel yang bersumber langsung dari backend MyFinanceKu API.

---

## 🛠️ Tech Stack & Dependensi

* **Framework Utama**: [Next.js 16.2.11](https://nextjs.org) (React 19, TypeScript)
* **Basis Data**: [MongoDB](https://www.mongodb.com) (Native Driver [mongodb.ts](file:///e:/Code/cms_myfinanceku/app/lib/mongodb.ts))
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com) & PostCSS untuk antarmuka yang modern, responsif, dan mendukung mode gelap (dark mode).
* **Autentikasi**: [jose](https://github.com/panva/jose) untuk enkripsi dan verifikasi JWT token secara aman di tingkat edge middleware.
* **Validasi Skema**: [Zod](https://zod.dev) untuk validasi input form backend guna mencegah celah keamanan dan inkonsistensi data.
* **Penyimpanan Gambar**: [Cloudinary](https://cloudinary.com) API untuk hosting gambar thumbnail artikel secara andal.
* **Icons**: [Lucide React](https://lucide.dev) sebagai set ikon antarmuka.

---

## 📂 Struktur Direktori Proyek

Berikut adalah struktur direktori utama pada proyek MyFinanceKu CMS:

```text
cms_myfinanceku/
├── app/                          # Direktori utama Next.js App Router
│   ├── (dashboard)/              # Group Route untuk halaman setelah login (Authed)
│   │   ├── berita/               # Halaman Form Penambahan Berita baru
│   │   │   ├── FormBerita.tsx    # Komponen utama form multi-step pembuatan berita
│   │   │   └── page.tsx
│   │   ├── dashboard/            # Halaman utama statistik singkat & ucapan selamat datang
│   │   │   └── page.tsx
│   │   ├── data-berita/          # Halaman tabel & card grid pemantauan artikel
│   │   │   └── page.tsx
│   │   ├── user-admin/           # Halaman manajemen administrator
│   │   │   ├── components/       # Sub-komponen (AddUser & DataAdmin)
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Layout utama panel dashboard dengan sidebar
│   ├── api/                      # Rute API Backend (Serverless Routes)
│   │   ├── admin/                # API Autentikasi (login, logout, register)
│   │   ├── berita/               # API CRUD Berita (GET/POST/DELETE)
│   │   └── user_admin/           # API pengambilan data user admin
│   ├── components/               # Komponen global (e.g., Sidebar)
│   │   └── Sidebar.tsx           # Sidebar navigasi panel admin
│   ├── lib/                      # Pustaka utilitas pembantu
│   │   └── mongodb.ts            # Konfigurasi instansiasi koneksi MongoDB
│   ├── login/                    # Halaman formulir login admin
│   ├── globals.css               # Setup CSS Global & Tailwind CSS
│   ├── layout.tsx                # Root layout HTML aplikasi
│   └── middleware.ts             # Middleware pelindung rute aplikasi (JWT Verify)
├── public/                       # Aset statis (gambar, icon, logo)
├── tsconfig.json                 # Konfigurasi TypeScript compiler
├── package.json                  # Definisi dependensi & skrip NPM
└── next.config.ts                # Konfigurasi Next.js
```

---

---

## 📡 Detail Arsitektur API

### 1. Autentikasi Admin
* **POST `/api/admin/login`**: Memvalidasi data kredensial login (Email & Password) ke API utama MyFinanceKu. Jika sukses, server akan mengembalikan JWT token dan menyimpannya ke dalam cookie HTTP-Only.
* **POST `/api/admin/logout`**: Menghapus cookie JWT token di sisi klien untuk mengakhiri sesi administrator.
* **POST `/api/admin/register`**: Mendaftarkan admin baru melalui endpoint backend.

### 2. Manajemen Berita (CRUD)
* **GET `/api/berita`**: Mengambil daftar berita dari database MongoDB dengan dukungan parameter pencarian (`search`), paginasi (`page`, `limit`), dan pengurutan (`sortBy`, `sortOrder`).
* **POST `/api/berita`**: Membuat artikel berita baru. Mendukung penerimaan tipe data `multipart/form-data` untuk pemrosesan file gambar thumbnail secara langsung melalui integrasi API Cloudinary. Semua masukan divalidasi ketat menggunakan skema Zod.
* **DELETE `/api/berita/[idBlog]`**: Menghapus berita secara permanen berdasarkan ID artikel unik (`idBlog`) atau MongoDB ObjectId (`_id`).

### 3. Data Administrator
* **GET `/api/user_admin`**: Menampilkan daftar seluruh administrator terdaftar dari API backend MyFinanceKu untuk dimonitor pada halaman kelola admin.

---

## 🛡️ Sistem Keamanan & Middleware

Aplikasi ini menggunakan Next.js Edge Middleware ([middleware.ts](file:///e:/Code/cms_myfinanceku/app/middleware.ts)) yang diaktifkan untuk memeriksa setiap permintaan rute selain file statis. 

* **Rute Publik**: `/login`, `/register`, `/`, `/coming-soon`, `/maintenance`.
* **Proses Verifikasi**: Jika pengguna mencoba mengakses halaman dasbor (rute terproteksi) tanpa token atau dengan token yang tidak valid/kedaluwarsa, middleware akan otomatis menghapus sisa cookie usang dan mengalihkan pengguna kembali ke halaman `/login`.
* **Cek Sisi Klien**: Untuk verifikasi visual tambahan, [layout.tsx](file:///e:/Code/cms_myfinanceku/app/(dashboard)/layout.tsx) dasbor memverifikasi keberadaan data pengguna pada `sessionStorage` sebelum menampilkan konten antarmuka pengguna.
