
export interface Topic {
  id: string;
  name: string;
}

export interface Chapter {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
}

export const CURRICULUM_DATA: Subject[] = [
  {
    id: 'ipas',
    name: 'IPAS (Sains & Sosial)',
    chapters: [
      {
        id: 'energi',
        name: 'Bab 5: Energi dan Perubahannya',
        topics: [
          { id: 'sumber_energi', name: 'Sumber Energi di Sekitar Kita' },
          { id: 'perubahan_energi', name: 'Bagaimana Energi Berubah Bentuk?' },
          { id: 'energi_alternatif', name: 'Energi Matahari dan Angin' }
        ]
      },
      {
        id: 'alam',
        name: 'Bab 6: Kenampakan Alam',
        topics: [
          { id: 'bentang_alam', name: 'Gunung, Lembah, dan Sungai' },
          { id: 'pemanfaatan_alam', name: 'Cara Manusia Mengelola Alam' }
        ]
      }
    ]
  },
  {
    id: 'matematika',
    name: 'Matematika',
    chapters: [
      {
        id: 'pecahan',
        name: 'Bab 4: Pecahan Sederhana',
        topics: [
          { id: 'mengenal_pecahan', name: 'Mengenal Pembilang dan Penyebut' },
          { id: 'membandingkan', name: 'Membandingkan Dua Pecahan' },
          { id: 'penjumlahan_pecahan', name: 'Penjumlahan Pecahan Berpenyebut Sama' }
        ]
      },
      {
        id: 'pengukuran',
        name: 'Bab 5: Pengukuran Luas & Keliling',
        topics: [
          { id: 'keliling', name: 'Menghitung Keliling Bangun Datar' },
          { id: 'luas_petak', name: 'Menghitung Luas dengan Satuan Tidak Baku' }
        ]
      }
    ]
  },
  {
    id: 'bahasa_indonesia',
    name: 'Bahasa Indonesia',
    chapters: [
      {
        id: 'laporan',
        name: 'Bab 5: Menjadi Pengamat Cilik',
        topics: [
          { id: 'teks_laporan', name: 'Menulis Laporan Hasil Pengamatan' },
          { id: 'wawancara', name: 'Cara Bertanya yang Sopan' }
        ]
      },
      {
        id: 'cerita',
        name: 'Bab 6: Indahnya Persahabatan',
        topics: [
          { id: 'unsur_intrinsik', name: 'Tokoh, Latar, dan Amanat Cerita' },
          { id: 'surat_pribadi', name: 'Menulis Surat untuk Sahabat' }
        ]
      }
    ]
  },
  {
    id: 'pancasila',
    name: 'Pendidikan Pancasila',
    chapters: [
      {
        id: 'norma',
        name: 'Bab 3: Aturan di Sekitarku',
        topics: [
          { id: 'norma_rumah', name: 'Aturan di Rumah dan Sekolah' },
          { id: 'hak_kewajiban', name: 'Hak dan Kewajiban Anak' }
        ]
      },
      {
        id: 'gotong_royong',
        name: 'Bab 4: Ayo Bekerja Sama',
        topics: [
          { id: 'kerjasama_tim', name: 'Indahnya Kebersamaan dalam Tugas' },
          { id: 'musyawarah', name: 'Mengenal Cara Mengambil Keputusan' }
        ]
      }
    ]
  }
];

export const SUBJECTS_SEMESTER_2 = CURRICULUM_DATA.map(s => ({
  id: s.id,
  name: s.name,
  topics: s.chapters.flatMap(c => c.topics.map(t => t.name))
}));
