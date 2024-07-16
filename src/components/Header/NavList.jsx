import {
  Collapse,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const menus = [
  {
    id: 1,
    title: "Beranda",
    url: "/",
    status: true,
    subMenus: [],
  },
  {
    id: 2,
    title: "Profil",
    url: "/profil",
    status: true,
    subMenus: [],
  },
  {
    id: 3,
    title: "Data Desa",
    url: "",
    status: true,
    subMenus: [
      {
        subMenuId: 1,
        subMenuTitle: "Data Wilayah Administratif",
        subMenuLayout: "",
        subMenuUrl: "data-wilayah",
        subMenuStatus: true,
      },
      {
        subMenuId: 2,
        subMenuTitle: "Data Umur (Rentang)",
        subMenuLayout: "/data-statistik",
        subMenuUrl: "umur",
        subMenuStatus: true,
      },
      {
        subMenuId: 3,
        subMenuTitle: "Data Pendidikan",
        subMenuLayout: "/data-statistik",
        subMenuUrl: "pendidikan",
        subMenuStatus: true,
      },
      {
        subMenuId: 4,
        subMenuTitle: "Data Pekerjaan",
        subMenuLayout: "/data-statistik",
        subMenuUrl: "pekerjaan",
        subMenuStatus: true,
      },
      {
        subMenuId: 5,
        subMenuTitle: "Data Agama",
        subMenuLayout: "/data-statistik",
        subMenuUrl: "agama",
        subMenuStatus: true,
      },
      {
        subMenuId: 6,
        subMenuTitle: "Data Jenis Kelamin",
        subMenuLayout: "/data-statistik",
        subMenuUrl: "jenis-kelamin",
        subMenuStatus: true,
      },
    ],
  },
  {
    id: 4,
    title: "Informasi",
    url: "",
    status: true,
    subMenus: [
      {
        subMenuId: 8,
        subMenuTitle: "Berita",
        subMenuLayout: "/informasi",
        subMenuUrl: "berita",
        subMenuStatus: true,
      },
      {
        subMenuId: 9,
        subMenuTitle: "Pengumuman",
        subMenuLayout: "/informasi",
        subMenuUrl: "pengumuman",
        subMenuStatus: true,
      },
      {
        subMenuId: 10,
        subMenuTitle: "Potensi Desa",
        subMenuLayout: "/informasi",
        subMenuUrl: "potensi-desa",
        subMenuStatus: true,
      },
    ],
  },
  {
    id: 5,
    title: "Transparansi APBD",
    url: "/transparansi",
    status: true,
    subMenus: [],
  },
];

const NavList = ({ onCloseCollapse }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleMobileSubMenuClick = () => {
    setOpen(0);
    onCloseCollapse();
  };

  const handleSubMenuClick = () => {
    setOpen(0);
  };

  const handleMenuClick = () => {
    if (window.innerWidth <= 720) {
      onCloseCollapse();
    }
  };

  return (
    <>
      {menus
        .filter((menu) => menu.status)
        .map((menu) => (
          <List
            key={menu.id}
            className="mt-5 last-of-type:mb-5 lg:last-of-type:mb-0 p-0 lg:mt-0 lg:mb-0 lg:flex-row min-w-0"
          >
            {menu.status && menu.subMenus.length > 0 ? (
              <>
                <Menu
                  open={open === menu.id}
                  offset={{ mainAxis: 20 }}
                  placement="bottom-start"
                  allowHover={true}
                >
                  <MenuHandler>
                    <Typography
                      as="div"
                      variant="small"
                      className="font-medium"
                      color="gray"
                    >
                      <ListItem
                        selected={open === menu.id}
                        className="flex items-center gap-2 py-2 pr-4 font-medium"
                        onClick={() => handleOpen(menu.id)}
                      >
                        {menu.title}
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`block h-3 w-3 transition-transform ${
                            open === menu.id ? "rotate-180" : ""
                          }`}
                        />
                      </ListItem>
                    </Typography>
                  </MenuHandler>
                  <MenuList className="hidden rounded-xl lg:block">
                    {menu.subMenus.map((subMenu) => (
                      <Typography
                        as="a"
                        href={subMenu.subMenuLayout + "/" + subMenu.subMenuUrl}
                        onClick={handleSubMenuClick}
                        key={subMenu.subMenuId}
                        variant="small"
                        color="gray"
                      >
                        <MenuItem>{subMenu.subMenuTitle}</MenuItem>
                      </Typography>
                    ))}
                  </MenuList>
                </Menu>
                <div className="block lg:hidden">
                  <Collapse open={open === menu.id}>
                    {menu.subMenus.map((subMenu) => (
                      <Typography
                        key={subMenu.subMenuId}
                        as="a"
                        href={subMenu.subMenuLayout + "/" + subMenu.subMenuUrl}
                        onClick={handleMobileSubMenuClick}
                        variant="small"
                        className="font-medium"
                        color="gray"
                      >
                        <MenuItem>{subMenu.subMenuTitle}</MenuItem>
                      </Typography>
                    ))}
                  </Collapse>
                </div>
              </>
            ) : (
              <Typography
                as="a"
                href={menu.url}
                onClick={handleMenuClick}
                variant="small"
                className="font-medium"
                color="gray"
              >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                  {menu.title}
                </ListItem>
              </Typography>
            )}
          </List>
        ))}
    </>
  );
};

NavList.propTypes = {
  onCloseCollapse: PropTypes.func,
};

export default NavList;
