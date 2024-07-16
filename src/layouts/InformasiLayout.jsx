import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import routes from "../routes/routes";
import { Breadcrumbs, Typography } from "@material-tailwind/react";

const InformasiLayout = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/informasi") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div>
      <div className="max-w-[85rem] mx-auto p-4">
        <Typography variant="h3" color="gray" className="shrink capitalize">
          {pathnames[1]}
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
          <Typography
            variant="small"
            color="gray"
            className="capitalize cursor-text"
          >
            {pathnames[1]}
          </Typography>
        </Breadcrumbs>
      </div>
      <Routes>{getRoutes(routes)}</Routes>
    </div>
  );
};

export default InformasiLayout;
