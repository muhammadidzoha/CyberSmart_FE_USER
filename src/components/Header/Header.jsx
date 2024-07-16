import { Collapse, IconButton, Navbar } from "@material-tailwind/react";
import React, { useState } from "react";
import Brand from "./Brand";
import NavList from "./NavList";
import ButtonAuth from "./ButtonAuth";
import Profile from "./Profile";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    window.sessionStorage.getItem("isLoggedIn")
  );

  const handleCloseCollapse = () => {
    setOpenNav(false);
  };

  return (
    <Navbar className="bg-white sticky top-0 max-w-[20rem] md:max-w-xl lg:max-w-[85rem] mx-auto p-5 z-[1100]">
      {/* TopBar */}
      <div className="flex items-center justify-between">
        <Brand />
        {isLoggedIn ? (
          <Profile style="hidden lg:block" placement="bottom-end" />
        ) : (
          <ButtonAuth style="hidden lg:flex lg:gap-2" />
        )}
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <div className="items-center justify-start lg:mt-5 hidden lg:flex">
        <NavList />
      </div>
      <Collapse
        animate={{
          mount: {
            x: 0,
            y: 0,
          },
          unmount: {
            x: 100,
            y: 0,
          },
        }}
        open={openNav}
      >
        <NavList onCloseCollapse={handleCloseCollapse} />
        {isLoggedIn ? (
          <Profile placement="left-start" />
        ) : (
          <ButtonAuth fullWidth style="grid grid-cols-2" />
        )}
      </Collapse>
    </Navbar>
  );
};

export default Header;
