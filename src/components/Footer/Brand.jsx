import { Typography } from "@material-tailwind/react";
import React from "react";

const Brand = () => {
  return (
    <div className="flex gap-3 items-center">
      <img src="/logo.png" alt="Logo" className="w-[50px]" />
      <div className="hidden md:block">
        <Typography variant="h1" color="gray" className="text-xs md:text-sm">
          Desa Citereup
        </Typography>
        <Typography
          variant="paragraph"
          color="gray"
          className="text-xs md:text-sm"
        >
          Kabupaten Bandung
        </Typography>
      </div>
    </div>
  );
};

export default Brand;
