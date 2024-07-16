import React from "react";
import Brand from "./Brand";
import Information from "./Information";
import SocialMedia from "./SocialMedia";
import { Navbar } from "@material-tailwind/react";

const Footer = () => {
  return (
    <Navbar color="transparent" fullWidth>
      <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 justify-center md:justify-between items-center">
        <Brand />
        <Information />
        <SocialMedia />
      </div>
    </Navbar>
  );
};

export default Footer;
