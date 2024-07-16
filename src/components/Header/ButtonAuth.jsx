import { Button } from "@material-tailwind/react";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ButtonAuth = ({ style, fullWidth }) => {
  return (
    <div className={style}>
      <Link to="auth/masuk">
        <Button
          size="sm"
          variant="gradient"
          color="deep-purple"
          fullWidth={fullWidth}
        >
          Masuk
        </Button>
      </Link>
      <Link to="auth/daftar">
        <Button
          size="sm"
          variant="gradient"
          fullWidth={fullWidth}
          color="deep-purple"
        >
          Daftar
        </Button>
      </Link>
    </div>
  );
};

ButtonAuth.propTypes = {
  style: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default ButtonAuth;
