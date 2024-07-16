import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRouteLayanan = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/auth/masuk" replace />;
  }

  return children;
};

PrivateRouteLayanan.propTypes = {
  children: PropTypes.node,
};

export default PrivateRouteLayanan;
