# Desi Wulansari Portfolio

Portfolio responsive dengan tema soft purple + white, dibuat dari awal menggunakan HTML, CSS, dan JavaScript modular.

## 1. Cara menjalankan

Paling mudah menggunakan VS Code + Live Server.

Atau jika menggunakan terminal:

```bash
python -m http.server 5500
```

Lalu buka:

```text
http://localhost:5500
```

Jangan membuka `index.html` dengan `file://` jika ingin ES Modules berjalan normal.

## 2. Struktur

```text
desi-portfolio/
├── index.html
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   ├── education/
│   │   ├── certificates/
│   │   ├── achievements/
│   │   ├── projects/
│   │   ├── experience/
│   │   └── logos/
│   └── cv/
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
└── js/
    ├── images.js
    ├── data.js
    └── main.js
```

## 3. SISTEM GAMBAR

Semua gambar utama memakai local assets.

Pusat konfigurasi:

```text
js/images.js
```

Contoh:

```javascript
profile: {
  main: "./assets/images/profile/profile-main.jpg",
  about: "./assets/images/profile/profile-about.jpg",
}
```

### Cara termudah mengganti foto

Pertahankan nama file lalu replace:

```text
assets/images/profile/profile-main.jpg
```

Website otomatis menggunakan foto baru.

### Jika nama file berbeda

Cukup ubah path di:

```text
js/images.js
```

Tidak perlu mencari URL gambar di seluruh HTML/JavaScript.

## 4. Folder gambar

### Profile

```text
assets/images/profile/
├── profile-main.jpg
└── profile-about.jpg
```

Jika hanya punya satu foto, ubah:

```javascript
about: "./assets/images/profile/profile-main.jpg",
```

### Education

```text
assets/images/education/
├── smkn-1-subang.jpg
└── university.jpg
```

### Certificates

```text
assets/images/certificates/
├── certificate-01.jpg
├── certificate-02.jpg
├── certificate-03.jpg
└── certificate-04.jpg
```

### Achievements

```text
assets/images/achievements/
├── achievement-01.jpg
└── achievement-02.jpg
```

### Projects

```text
assets/images/projects/
├── project-01.jpg
├── project-01/
│   ├── screenshot-01.jpg
│   └── screenshot-02.jpg
├── project-02.jpg
├── project-02/
│   └── screenshot-01.jpg
└── project-03.jpg
```

### Experience / Logos

```text
assets/images/experience/
assets/images/logos/
```

## 5. Fallback

Jika gambar tidak tersedia, website tidak akan menampilkan broken layout.

Sebagai gantinya digunakan placeholder SVG yang tetap mengikuti visual website.

## 6. Certificate

Certificate dapat diklik untuk melihat gambar dalam modal.

Modal:
- responsive
- smooth animation
- close button
- klik backdrop untuk menutup
- ESC untuk menutup

## 7. Project Gallery

Project mendukung lebih dari satu screenshot.

Data gallery diatur di:

```text
js/images.js
```

Contoh:

```javascript
{
  title: "Proxmox Server with Tailscale",
  images: [
    "./assets/images/projects/project-01.jpg",
    "./assets/images/projects/project-01/screenshot-01.jpg",
    "./assets/images/projects/project-01/screenshot-02.jpg",
  ],
}
```

## 8. CV

Letakkan CV di:

```text
assets/cv/CV-Desi-Wulansari.pdf
```

Tombol Download CV sudah mengarah ke lokasi tersebut.

## 9. Kontak

Untuk mengganti email, GitHub, dan LinkedIn, edit bagian Contact di:

```text
index.html
```

## 10. Data portfolio

Konten certificate dan role berada di:

```text
js/data.js
```

Gambar tetap berada di:

```text
js/images.js
```

## Catatan

Jangan memasukkan gambar utama menggunakan Base64, Blob, atau URL gambar random dari internet.

Portfolio ini sengaja menggunakan local assets agar kamu cukup mengganti file gambar milikmu sendiri.
