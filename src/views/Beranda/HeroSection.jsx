import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/img/pattern2.png')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="mt-5 max-w-xl text-center mx-auto">
          <Typography
            variant="h1"
            className="text-4xl md:text-5xl lg:text-6xl"
            color="gray"
          >
            Website Resmi Pemerintah Desa Citeureup
          </Typography>
        </div>
        <div className="mt-5 max-w-xl text-center mx-auto">
          <Typography variant="paragraph" className="text-lg" color="gray">
            Mengakses Informasi Desa Secara Cepat website pemerintah Desa
            Citeureup memudahkan warga desa untuk tetap terinformasi dan
            terlibat dalam kehidupan desa mereka dengan lebih efisien dan mudah.
          </Typography>
        </div>
        <div className="mt-10 gap-3 flex justify-center">
          <Link to="profil">
            <Button variant="gradient" color="deep-purple">
              Tentang Kita
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
