import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes/routes";
import ProtectedRoute from "../routes/ProtectedRoute";

const AuthLayout = () => {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth" && prop.isProtected === false) {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else if (prop.isProtected) {
        return (
          <Route
            path={`/${prop.path}`}
            element={<ProtectedRoute>{prop.component}</ProtectedRoute>}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div>
      <Routes>{getRoutes(routes)}</Routes>
    </div>
  );
};

export default AuthLayout;
