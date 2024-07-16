import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import React from "react";

const features = [
  {
    id: 1,
    name: "Layanan Pengajuan",
    desc: "Tertib bersama Desa Citeureup. Urus persuratan dan pengajuan surat Anda, dan rasakan kemudahan sebagai warga Desa Citeureup.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 255 255"
        className="mb-4 text-brand-500 bg-lightPrimary p-2 rounded-lg group-hover:bg-gray-900/10"
      >
        <path
          fill="currentColor"
          d="M200 112a8 8 0 0 1-8 8h-40a8 8 0 0 1 0-16h40a8 8 0 0 1 8 8m-8 24h-40a8 8 0 0 0 0 16h40a8 8 0 0 0 0-16m40-80v144a16 16 0 0 1-16 16H40a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h176a16 16 0 0 1 16 16m-16 144V56H40v144zm-80.26-34a8 8 0 1 1-15.5 4c-2.63-10.26-13.06-18-24.25-18s-21.61 7.74-24.25 18a8 8 0 1 1-15.5-4a39.84 39.84 0 0 1 17.19-23.34a32 32 0 1 1 45.12 0a39.76 39.76 0 0 1 17.2 23.34ZM96 136a16 16 0 1 0-16-16a16 16 0 0 0 16 16"
        />
      </svg>
    ),
    url: "layanan-pengajuan",
  },
  {
    id: 2,
    name: "Layanan Pengaduan",
    desc: "Kami selalu mendengar Anda. Adukan seluruh keresahan Anda selama berada di Desa Citeureup melalui pengaduan kami.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 640 512"
        className="mb-4 text-brand-500 bg-lightPrimary p-2 rounded-lg group-hover:bg-gray-900/10"
      >
        <path
          fill="currentColor"
          d="M144 320a80 80 0 1 1 0-160a80 80 0 1 1 0 160m119.8 0c15.3-22.9 24.2-50.4 24.2-80c0-79.5-64.5-144-144-144S0 160.5 0 240s64.5 144 144 144h352c79.5 0 144-64.5 144-144S575.5 96 496 96s-144 64.5-144 144c0 29.6 8.9 57.1 24.2 80zM496 160a80 80 0 1 1 0 160a80 80 0 1 1 0-160"
        />
      </svg>
    ),
    url: "/",
  },
  {
    id: 3,
    name: "UMKM",
    desc: "Bersama-sama kita satukan semangat penuh solidaritas menghadapi tantangan pandemi dan transformasi UMKM masa depan.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        className="mb-4 text-brand-500 bg-lightPrimary p-2 rounded-lg group-hover:bg-gray-900/10"
      >
        <path
          fill="currentColor"
          d="M19.148 2.971A2.008 2.008 0 0 0 17.434 2H6.566c-.698 0-1.355.372-1.714.971L2.143 7.485A.995.995 0 0 0 2 8a3.97 3.97 0 0 0 1 2.618V19c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8.382A3.97 3.97 0 0 0 22 8a.995.995 0 0 0-.143-.515zm.836 5.28A2.003 2.003 0 0 1 18 10c-1.103 0-2-.897-2-2c0-.068-.025-.128-.039-.192l.02-.004L15.22 4h2.214zM10.819 4h2.361l.813 4.065C13.958 9.137 13.08 10 12 10s-1.958-.863-1.993-1.935zM6.566 4H8.78l-.76 3.804l.02.004C8.025 7.872 8 7.932 8 8c0 1.103-.897 2-2 2a2.003 2.003 0 0 1-1.984-1.749zM10 19v-3h4v3zm6 0v-3c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H5v-7.142c.321.083.652.142 1 .142a3.99 3.99 0 0 0 3-1.357c.733.832 1.807 1.357 3 1.357s2.267-.525 3-1.357A3.99 3.99 0 0 0 18 12c.348 0 .679-.059 1-.142V19z"
        />
      </svg>
    ),
    url: "/",
  },
];

const FeatureSection = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <Typography
          variant="h2"
          className="text-2xl font-bold md:text-4xl md:leading-tight"
          color="gray"
        >
          Daftar Fitur
        </Typography>
        <Typography variant="paragraph" color="gray" className="mt-1">
          Silakan Pilih menu sesuai yang anda butuhkan
        </Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
        {features.map((feature) => (
          <Card
            className="group hover:bg-gray-200 z-10 overflow-hidden"
            key={feature.id}
          >
            <div className="bg-[url('/img/pattern3.png')] w-64 h-32 -left-36 top-0 -z-[1] absolute"></div>
            <div className="bg-[url('/img/pattern3.png')] w-64 h-32 -right-36 bottom-0 -z-[1] absolute"></div>
            <CardBody>
              {feature.icon}
              <Typography variant="h5" color="gray" className="mb-2">
                {feature.name}
              </Typography>
              <Typography
                variant="paragraph"
                color="gray"
                className="min-h-[104px]"
              >
                {feature.desc}
              </Typography>
            </CardBody>
            <CardFooter>
              <Typography as="a" href={feature.url}>
                <Button
                  size="sm"
                  variant="gradient"
                  color="deep-purple"
                  className="flex items-center gap-2"
                >
                  Selengkapnya
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </Typography>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
