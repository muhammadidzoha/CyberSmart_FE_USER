import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import React from "react";
import Marquee from "react-fast-marquee";

const items = [
  {
    id: 1,
    jabatan: "Kepala Desa",
    nama: "Fathi Adli K. Stk. Amd",
    nip: 5547010203,
    url: "/src/assets/aparatDesa/avatar1.png",
    alt: "Gambar Kepala Desa",
  },
  {
    id: 2,
    jabatan: "Sekretaris Desa",
    nama: "Annisa Ramdani. Spd. Md",
    nip: 5547020304,
    url: "/src/assets/aparatDesa/avatar2.png",
    alt: "Gambar Sektretaris Desa",
  },
  {
    id: 3,
    jabatan: "Kaur Umum",
    nama: "Andre Naibaho. Sia. Kpd",
    nip: 5547050902,
    url: "/src/assets/aparatDesa/avatar3.png",
    alt: "Gambar Kaur Umum Desa",
  },
  {
    id: 4,
    jabatan: "Bendehara Desa",
    nama: "Nita Vior. Abd. Onc",
    nip: 5547090905,
    url: "/src/assets/aparatDesa/avatar4.png",
    alt: "Gambar Bendehara Desa",
  },
  {
    id: 5,
    jabatan: "Kaur Keuangan",
    nama: "Sudaryanto. Siu, Dtk",
    nip: 5547030808,
    url: "/src/assets/aparatDesa/avatar5.png",
    alt: "Gambar Kaur Keuangan Desa",
  },
];

const GovernanceSection = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <Typography
          variant="h2"
          className="text-2xl font-bold md:text-4xl md:leading-tight"
          color="gray"
        >
          Pemerintah Desa
        </Typography>
        <Typography variant="paragraph" color="gray" className="mt-1">
          Seputar Struktur Organisasi Desa Citeureup
        </Typography>
      </div>
      <div className="hidden 2xl:flex">
        <Marquee speed={200} autoFill>
          {items.map((item) => (
            <Card key={item.id} className="w-96 mx-5">
              <CardHeader floated={false} className="h-80">
                <img src={item.url} alt={item.alt} />
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h4" color="gray" className="mb-2">
                  {item.nama}
                </Typography>
                <Typography color="gray" className="font-medium" textGradient>
                  {item.nip}
                </Typography>
              </CardBody>
              <CardFooter>
                <Typography
                  color="gray"
                  className="font-medium text-center"
                  textGradient
                >
                  {item.jabatan}
                </Typography>
              </CardFooter>
            </Card>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default GovernanceSection;
