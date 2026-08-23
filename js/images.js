// ============================================================
// IMAGE CONFIGURATION
// ============================================================
// PENTING:
// Semua gambar portfolio dikontrol dari file ini.
// Untuk mengganti foto, cukup:
// 1. Replace file dengan nama yang sama, ATAU
// 2. Ubah path di file ini.
// Jangan mencari URL gambar di seluruh project.
// ============================================================

export const images = {
  profile: {
    // HERO PROFILE IMAGE
    main: "./assets/images/profile/profile-main.jpg",

    // ABOUT IMAGE
    about: "./assets/images/profile/profile-about.jpg",

    // Digunakan jika profile-about belum tersedia
    fallback: "./assets/images/profile/profile-main.jpg",
  },

  education: {
    school: "./assets/images/education/smkn-1-subang.jpg",
    university: "./assets/images/education/university.jpg",
  },

  certificates: [
    "./assets/images/certificates/certificate-01.jpg",
    "./assets/images/certificates/certificate-02.jpg",
    "./assets/images/certificates/certificate-03.jpg",
    "./assets/images/certificates/certificate-04.jpg",
  ],

  achievements: [
    "./assets/images/achievements/achievement-01.jpg",
    "./assets/images/achievements/achievement-02.jpg",
  ],

  projects: [
    {
      title: "Proxmox Server with Tailscale",
      images: [
        "./assets/images/projects/project-01.jpg",
        "./assets/images/projects/project-01/screenshot-01.jpg",
        "./assets/images/projects/project-01/screenshot-02.jpg",
      ],
    },
    {
      title: "Linux Web Server",
      images: [
        "./assets/images/projects/project-02.jpg",
        "./assets/images/projects/project-02/screenshot-01.jpg",
      ],
    },
    {
      title: "Automatic Trash Can",
      images: [
        "./assets/images/projects/project-03.jpg",
        "./assets/images/projects/project-03/screenshot-01.jpg",
      ],
    },
  ],

  experience: {
    bpjs: "./assets/images/experience/bpjs-kesehatan.jpg",
  },

  logos: {
    bpjs: "./assets/images/logos/bpjs-kesehatan.svg",
  },
};

// ============================================================
// HELPER
// ============================================================

export function imageExistsPath(primary, fallback) {
  return primary || fallback;
}
