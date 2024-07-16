import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfilSection from "../views/Profil/ProfilSection";
import InformationSection from "../views/Profil/InformationSection";
import GovernanceSection from "../views/Profil/GovernanceSection";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import VisiMisiSection from "../views/Profil/VisiMisiSection";

const ProfilLayout = () => {
  const [currentRoute, setCurrentRoute] = useState("Profil");
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const mainPath = pathnames[0];

  return (
    <div className="overflow-hidden">
      <div className="max-w-[85rem] mx-auto p-4">
        <Typography variant="h3" color="gray" className="shrink capitalize">
          {currentRoute}
        </Typography>
        <Breadcrumbs>
          <Link to="/">
            <Typography variant="small" color="gray" className="capitalize">
              Beranda
            </Typography>
          </Link>
          <Typography
            variant="small"
            color="gray"
            className="capitalize cursor-text"
          >
            {pathnames[0]}
          </Typography>
        </Breadcrumbs>
      </div>
      <ProfilSection />
      <InformationSection />
      <VisiMisiSection />
      <GovernanceSection />
    </div>
  );
};

export default ProfilLayout;
