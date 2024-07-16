import React, { useState } from "react";
import {
  UserCircleIcon,
  PowerIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  Avatar,
  Collapse,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = ({ style, placement }) => {
  const profileMenuItems = [
    {
      label: "Profil Saya",
      icon: UserCircleIcon,
      onClick: () => handleProfile(),
    },
    {
      label: "Track Pengajuan",
      icon: DocumentIcon,
      onClick: () => handleTrackPengajuan(),
    },
    {
      label: "Keluar",
      icon: PowerIcon,
      onClick: () => handleSignOut(),
    },
  ];

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleProfile = () => navigate("profil-saya");

  const handleTrackPengajuan = () => navigate("track-pengajuan");

  const handleSignOut = async () => {
    try {
      await axios.delete("http://localhost:5000/api/logout", {
        withCredentials: true,
      });
      window.sessionStorage.removeItem("isLoggedIn");
      window.sessionStorage.removeItem("fullname");
      window.localStorage.removeItem("hasDrawerBeenOpened");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getFirstName = (fullName) => {
    const nameArray = fullName.split(" ");

    const firstName = nameArray[0];

    return firstName;
  };

  return (
    <div className={style}>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement={placement}>
        <MenuHandler>
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full py-0.5 pr-2 pl-2 lg:ml-auto"
          >
            <Typography
              className="capitalize font-medium"
              variant="small"
              color="gray"
            >
              {getFirstName(window.sessionStorage.getItem("fullname"))}
            </Typography>
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-navy-800 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1 hidden lg:block z-[1200]">
          {profileMenuItems.map(({ label, icon, onClick }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => {
                  closeMenu();
                  onClick && onClick();
                }}
                className={`flex items-center gap-2 rounded outline-none ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "gray"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMenuOpen}>
          {profileMenuItems.map(({ label, onClick }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <Typography
                key={label}
                as="div"
                variant="small"
                className={`font-medium ${
                  isLastItem ? "text-red-500" : "text-text"
                }`}
              >
                <MenuItem
                  onClick={() => {
                    closeMenu();
                    onClick && onClick();
                  }}
                  className={`flex items-center gap-2 rounded outline-none ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 hover:text-red-500"
                      : ""
                  }`}
                >
                  {label}
                </MenuItem>
              </Typography>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
};

Profile.propTypes = {
  style: PropTypes.string,
  placement: PropTypes.string,
};

export default Profile;
