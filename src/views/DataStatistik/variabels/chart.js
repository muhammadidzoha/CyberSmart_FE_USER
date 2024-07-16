export const umurChart = {
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },
  title: {
    text: "Statistik Data Umur Tahun 2024",
    align: "center",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.y}</b>",
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45,
      showInLegend: true,
    },
  },
  series: [
    {
      name: "Jumlah Populasi",
      colorByPoint: true,
      data: [
        {
          name: "Di bawah 1 Tahun",
          y: "",
          laki: 0,
          perempuan: 1,
        },
        {
          name: "2 s/d 4 Tahun",
          y: "",
          laki: 2,
          perempuan: 3,
        },
        {
          name: "5 s/d 9 Tahun",
          y: "",
          laki: 6,
          perempuan: 8,
        },
        {
          name: "10 s/d 14 Tahun",
          y: "",
          laki: 11,
          perempuan: 9,
        },
        {
          name: "15 s/d 19 Tahun",
          y: "",
          laki: 18,
          perempuan: 11,
        },
        {
          name: "20 s/d 24 Tahun",
          y: "",
          laki: 440,
          perempuan: 394,
        },
        {
          name: "25 s/d 29 Tahun",
          y: "",
          laki: 408,
          perempuan: 416,
        },
        {
          name: "30 s/d 34 Tahun",
          y: "",
          laki: 401,
          perempuan: 411,
        },
        {
          name: "35 s/d 39 Tahun",
          y: "",
          laki: 427,
          perempuan: 438,
        },
        {
          name: "40 s/d 44 Tahun",
          y: "",
          laki: 988, // + 473
          perempuan: 1012, // + 473
        },
        {
          name: "45 s/d 49 Tahun",
          y: "",
          laki: 511,
          perempuan: 532,
        },
        {
          name: "50 s/d 54 Tahun",
          y: "",
          laki: 430,
          perempuan: 388,
        },
        {
          name: "55 s/d 59 Tahun",
          y: "",
          laki: 284,
          perempuan: 266,
        },
        {
          name: "60 s/d 64 Tahun",
          y: "",
          laki: 198,
          perempuan: 217,
        },
        {
          name: "65 s/d 69 Tahun",
          y: "",
          laki: 144,
          perempuan: 140,
        },
        {
          name: "70 s/d 74 Tahun",
          y: "",
          laki: 92,
          perempuan: 76,
        },
        {
          name: "Di atas 75 Tahun",
          y: "",
          laki: 96,
          perempuan: 91,
        },
        {
          name: "Belum Mengisi",
          y: "",
          laki: 0,
          perempuan: 0,
        },
      ].map((entry) => ({
        ...entry,
        y: entry.laki + entry.perempuan,
      })),
    },
  ],
};

export const pendidikanChart = {
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },
  title: {
    text: "Statistik Data Pendidikan Tahun 2024",
    align: "center",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.y}</b>",
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45,
      showInLegend: true,
    },
  },
  series: [
    {
      name: "Jumlah Populasi",
      colorByPoint: true,
      data: [
        {
          name: "TIDAK / BELUM SEKOLAH",
          y: "",
          laki: 9,
          perempuan: 9,
        },
        {
          name: "BELOM TAMAT SD/SEDERAJAT",
          y: "",
          laki: 1,
          perempuan: 2,
        },
        {
          name: "TAMAT SD / SEDERAJAT",
          y: "",
          laki: 20,
          perempuan: 13,
        },
        {
          name: "SLTP/SEDERAJAT",
          y: "",
          laki: 21,
          perempuan: 12,
        },
        {
          name: "SLTA / SEDERAJAT",
          y: "",
          laki: 3885,
          perempuan: 3863,
        },
        {
          name: "DIPLOMA I / II",
          y: "",
          laki: 1,
          perempuan: 1,
        },
        {
          name: "AKADEMI/ DIPLOMA III/S. MUDA",
          y: "",
          laki: 1,
          perempuan: 2,
        },
        {
          name: "DIPLOMA IV/ STRATA I",
          y: "",
          laki: 11,
          perempuan: 7,
        },
        {
          name: "STRATA II",
          y: "",
          laki: 2,
          perempuan: 1,
        },
        {
          name: "BELUM MENGISI",
          y: "",
          laki: 32,
          perempuan: 30,
        },
      ].map((entry) => ({
        ...entry,
        y: entry.laki + entry.perempuan,
      })),
    },
  ],
};

export const pekerjaanChart = {
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },
  title: {
    text: "Statistik Data Pekerjaan Tahun 2024",
    align: "center",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.y}</b>",
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45,
      showInLegend: true,
    },
  },
  series: [
    {
      name: "Jumlah Populasi",
      colorByPoint: true,
      data: [
        {
          name: "BELUM/TIDAK BEKERJA",
          y: "",
          laki: 35,
          perempuan: 25,
        },
        {
          name: "MENGURUS RUMAH TANGGA",
          y: "",
          laki: 0,
          perempuan: 32,
        },
        {
          name: "PELAJAR/MAHASISWA",
          y: "",
          laki: 539,
          perempuan: 496,
        },
        {
          name: "PEGAWAI NEGERI SIPIL (PNS)",
          y: "",
          laki: 4,
          perempuan: 3,
        },
        {
          name: "KEPOLISIAN RI (POLRI)",
          y: "",
          laki: 0,
          perempuan: 2,
        },
        {
          name: "TRANSPORTASI",
          y: "",
          laki: 1,
          perempuan: 0,
        },
        {
          name: "KARYAWAN SWASTA",
          y: "",
          laki: 3320,
          perempuan: 3344,
        },
        {
          name: "KARYAWAN BUMN",
          y: "",
          laki: 2,
          perempuan: 1,
        },
        {
          name: "KARYAWAN HONORER",
          y: "",
          laki: 1,
          perempuan: 0,
        },
        {
          name: "BURUH HARIAN LEPAS",
          y: "",
          laki: 27,
          perempuan: 2,
        },
        {
          name: "GURU",
          y: "",
          laki: 0,
          perempuan: 2,
        },
        {
          name: "DOKTER",
          y: "",
          laki: 0,
          perempuan: 1,
        },
        {
          name: "BIARAWATI",
          y: "",
          laki: 1,
          perempuan: 0,
        },
        {
          name: "WIRASWASTA",
          y: "",
          laki: 14,
          perempuan: 1,
        },
        {
          name: "LAINNYA",
          y: "",
          laki: 7,
          perempuan: 0,
        },
        {
          name: "BELUM MENGISI",
          y: "",
          laki: 32,
          perempuan: 30,
        },
      ].map((entry) => ({
        ...entry,
        y: entry.laki + entry.perempuan,
      })),
    },
  ],
};

export const agamaChart = {
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },
  title: {
    text: "Statistik Data Agama Tahun 2024",
    align: "center",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.y}</b>",
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45,
      showInLegend: true,
    },
  },
  series: [
    {
      name: "Jumlah Populasi",
      colorByPoint: true,
      data: [
        {
          name: "ISLAM",
          y: "",
          laki: 3941,
          perempuan: 3910,
        },
        {
          name: "PROSTESTAN",
          y: "",
          laki: 0,
          perempuan: 1,
        },
        {
          name: "KATOLIK",
          y: "",
          laki: 2,
          perempuan: 0,
        },
        {
          name: "HINDU",
          y: "",
          laki: 0,
          perempuan: 0,
        },
        {
          name: "BUDDHA",
          y: "",
          laki: 0,
          perempuan: 0,
        },
        {
          name: "KHONGHUCU",
          y: "",
          laki: 0,
          perempuan: 0,
        },
        {
          name: "KEPERCAYAAN TERHADAP TUHAN YME / LAINNYA",
          y: "",
          laki: 0,
          perempuan: 0,
        },
        {
          name: "BELUM MENGISI",
          y: "",
          laki: 40,
          perempuan: 29,
        },
      ].map((entry) => ({
        ...entry,
        y: entry.laki + entry.perempuan,
      })),
    },
  ],
};

export const jeniskelaminChart = {
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },
  title: {
    text: "Statistik Data Jenis Kelamin Tahun 2024",
    align: "center",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.y}</b>",
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45,
      showInLegend: true,
    },
  },
  series: [
    {
      name: "Jumlah Populasi",
      colorByPoint: true,
      data: [
        {
          name: "LAKI-LAKI",

          y: "",
          laki: 3983,
          perempuan: 0,
        },
        {
          name: "PEREMPUAN",
          y: "",
          laki: 0,
          perempuan: 3940,
        },
        {
          name: "BELUM MENGISI",
          y: "",
          laki: 0,
          perempuan: 0,
        },
      ].map((entry) => ({
        ...entry,
        y: entry.laki + entry.perempuan,
      })),
    },
  ],
};
