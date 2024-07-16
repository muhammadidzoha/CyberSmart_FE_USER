import React, { useState } from "react";
import routes from "../routes/routes";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@material-tailwind/react";

const DataStatistikLayout = () => {
  const [currentRoute, setCurrentRoute] = useState("Data Statistik");
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/data-statistik") {
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
          <Typography
            variant="small"
            color="gray"
            className="capitalize cursor-text"
          >
            {pathnames[1]}
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <Routes>{getRoutes(routes)}</Routes>
      </div>
    </div>
  );
};

export default DataStatistikLayout;
