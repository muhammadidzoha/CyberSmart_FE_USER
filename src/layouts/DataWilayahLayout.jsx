import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TABLE_ROWS = [
  {
    wilayah: "Dusun 3",
    kk: 2,
    jiwa: 2850,
    laki: 1448,
    perempuan: 1402,
    rw: [
      {
        name: "RW 9",
        kk: 0,
        jiwa: 1106,
        laki: 566,
        perempuan: 540,
        rt: [
          {
            name: "RT 3",
            kk: 0,
            jiwa: 305,
            laki: 150,
            perempuan: 155,
          },
          {
            name: "RT 4",
            kk: 0,
            jiwa: 183,
            laki: 97,
            perempuan: 86,
          },
          {
            name: "RT 2",
            kk: 0,
            jiwa: 253,
            laki: 129,
            perempuan: 124,
          },
          {
            name: "RT 5",
            kk: 0,
            jiwa: 172,
            laki: 84,
            perempuan: 88,
          },
          {
            name: "RT 1",
            kk: 0,
            jiwa: 193,
            laki: 106,
            perempuan: 87,
          },
        ],
      },
      {
        name: "RW 8",
        kk: 1,
        jiwa: 848,
        laki: 425,
        perempuan: 423,
        rt: [
          {
            name: "RT 2",
            kk: 0,
            jiwa: 163,
            laki: 80,
            perempuan: 80,
          },
          {
            name: "RT 4",
            kk: 1,
            jiwa: 344,
            laki: 165,
            perempuan: 179,
          },
          {
            name: "RT 3",
            kk: 0,
            jiwa: 209,
            laki: 103,
            perempuan: 106,
          },
          {
            name: "RT 1",
            kk: 0,
            jiwa: 132,
            laki: 74,
            perempuan: 58,
          },
        ],
      },
      {
        name: "RW 10",
        kk: 0,
        jiwa: 629,
        laki: 317,
        perempuan: 312,
        rt: [
          {
            name: "RT 2",
            kk: 0,
            jiwa: 199,
            laki: 99,
            perempuan: 100,
          },
          {
            name: "RT 3",
            kk: 0,
            jiwa: 172,
            laki: 89,
            perempuan: 83,
          },
          {
            name: "RT 4",
            kk: 0,
            jiwa: 111,
            laki: 59,
            perempuan: 52,
          },
          {
            name: "RT 1",
            kk: 0,
            jiwa: 147,
            laki: 70,
            perempuan: 77,
          },
        ],
      },
      {
        name: "RW 11",
        kk: 1,
        jiwa: 267,
        laki: 140,
        perempuan: 127,
        rt: [
          {
            name: "RT 3",
            kk: 1,
            jiwa: 157,
            laki: 78,
            perempuan: 79,
          },
          {
            name: "RT 2",
            kk: 0,
            jiwa: 101,
            laki: 57,
            perempuan: 44,
          },
        ],
      },
    ],
  },
  {
    wilayah: "Dusun 4",
    kk: 1128,
    jiwa: 2701,
    laki: 1325,
    perempuan: 1376,
    rw: [
      {
        name: "RW 13",
        kk: 347,
        jiwa: 884,
        laki: 449,
        perempuan: 435,
        rt: [
          {
            name: "RT 1",
            kk: 54,
            jiwa: 125,
            laki: 66,
            perempuan: 59,
          },
          {
            name: "RT 4",
            kk: 29,
            jiwa: 72,
            laki: 33,
            perempuan: 39,
          },
          {
            name: "RT 2",
            kk: 28,
            jiwa: 77,
            laki: 39,
            perempuan: 38,
          },
          {
            name: "RT 5",
            kk: 39,
            jiwa: 103,
            laki: 58,
            perempuan: 45,
          },
          {
            name: "RT 7",
            kk: 50,
            jiwa: 122,
            laki: 63,
            perempuan: 59,
          },
          {
            name: "RT 3",
            kk: 69,
            jiwa: 191,
            laki: 87,
            perempuan: 104,
          },
          {
            name: "RT 6",
            kk: 48,
            jiwa: 122,
            laki: 68,
            perempuan: 54,
          },
          {
            name: "RT 8",
            kk: 30,
            jiwa: 72,
            laki: 35,
            perempuan: 37,
          },
        ],
      },
      {
        name: "RW 15",
        kk: 170,
        jiwa: 373,
        laki: 170,
        perempuan: 203,
        rt: [
          {
            name: "RT 2",
            kk: 34,
            jiwa: 80,
            laki: 36,
            perempuan: 44,
          },
          {
            name: "RT 3",
            kk: 36,
            jiwa: 81,
            laki: 36,
            perempuan: 45,
          },
          {
            name: "RT 4",
            kk: 50,
            jiwa: 106,
            laki: 48,
            perempuan: 58,
          },
          {
            name: "RT 1",
            kk: 50,
            jiwa: 106,
            laki: 50,
            perempuan: 56,
          },
        ],
      },
      {
        name: "RW 14",
        kk: 186,
        jiwa: 451,
        laki: 216,
        perempuan: 235,
        rt: [
          {
            name: "RT 2",
            kk: 41,
            jiwa: 93,
            laki: 47,
            perempuan: 46,
          },
          {
            name: "RT 1",
            kk: 31,
            jiwa: 86,
            laki: 44,
            perempuan: 42,
          },
          {
            name: "RT 5",
            kk: 20,
            jiwa: 55,
            laki: 23,
            perempuan: 32,
          },
          {
            name: "RT 6",
            kk: 23,
            jiwa: 58,
            laki: 27,
            perempuan: 31,
          },
          {
            name: "RT 3",
            kk: 44,
            jiwa: 94,
            laki: 41,
            perempuan: 53,
          },
          {
            name: "RT 4",
            kk: 27,
            jiwa: 65,
            laki: 34,
            perempuan: 31,
          },
        ],
      },
      {
        name: "RW 17",
        kk: 116,
        jiwa: 258,
        laki: 130,
        perempuan: 128,
        rt: [
          {
            name: "RT 3",
            kk: 40,
            jiwa: 99,
            laki: 50,
            perempuan: 49,
          },
          {
            name: "RT 5",
            kk: 19,
            jiwa: 40,
            laki: 19,
            perempuan: 21,
          },
          {
            name: "RT 4",
            kk: 16,
            jiwa: 34,
            laki: 19,
            perempuan: 15,
          },
          {
            name: "RT 1",
            kk: 21,
            jiwa: 43,
            laki: 22,
            perempuan: 21,
          },
          {
            name: "RT 2",
            kk: 20,
            jiwa: 42,
            laki: 20,
            perempuan: 22,
          },
        ],
      },
      {
        name: "RW 12",
        kk: 128,
        jiwa: 315,
        laki: 154,
        perempuan: 161,
        rt: [
          {
            name: "RT 4",
            kk: 38,
            jiwa: 94,
            laki: 43,
            perempuan: 51,
          },
          {
            name: "RT 1",
            kk: 19,
            jiwa: 42,
            laki: 20,
            perempuan: 22,
          },
          {
            name: "RT 5",
            kk: 8,
            jiwa: 17,
            laki: 9,
            perempuan: 8,
          },
          {
            name: "RT 2",
            kk: 30,
            jiwa: 81,
            laki: 38,
            perempuan: 43,
          },
          {
            name: "RT 3",
            kk: 33,
            jiwa: 81,
            laki: 44,
            perempuan: 37,
          },
        ],
      },
      {
        name: "RW 16",
        kk: 181,
        jiwa: 420,
        laki: 206,
        perempuan: 214,
        rt: [
          {
            name: "RT 4",
            kk: 27,
            jiwa: 56,
            laki: 28,
            perempuan: 28,
          },
          {
            name: "RT 5",
            kk: 50,
            jiwa: 101,
            laki: 51,
            perempuan: 50,
          },
          {
            name: "RT 1",
            kk: 14,
            jiwa: 59,
            laki: 28,
            perempuan: 31,
          },
          {
            name: "RT 6",
            kk: 42,
            jiwa: 95,
            laki: 47,
            perempuan: 48,
          },
          {
            name: "RT 7",
            kk: 13,
            jiwa: 27,
            laki: 14,
            perempuan: 13,
          },
          {
            name: "RT 3",
            kk: 12,
            jiwa: 24,
            laki: 9,
            perempuan: 15,
          },
          {
            name: "RT 2",
            kk: 23,
            jiwa: 58,
            laki: 29,
            perempuan: 29,
          },
        ],
      },
    ],
  },
];

const DataWilayahLayout = () => {
  const [currentRoute, setCurrentRoute] = useState("Data Wilayah");
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [query, setQuery] = useState("");

  const bySearch = TABLE_ROWS.map((row) => row);

  console.log(bySearch);

  const handleSearch = (e) => {
    setQuery(e);
  };

  console.log(query);

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
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <Typography
            variant="h2"
            className="text-2xl font-bold md:text-4xl md:leading-tight"
            color="gray"
          >
            Data Populasi Per Wilayah
          </Typography>
        </div>

        <div className="w-96">
          <Input label="search" onClick={(e) => handleSearch(e.target.value)} />
          <Button>TES</Button>
        </div>

        <div>
          {TABLE_ROWS.map((row) => (
            <table key={row.jiwa}>
              <thead>
                <tr>
                  <th>Wilayah</th>
                </tr>
              </thead>
              <tbody>
                <td>{row.laki}</td>
              </tbody>
            </table>
          )).includes(query)}
        </div>

        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none opacity-70"
                >
                  No
                </Typography>
              </th>
              <th
                colSpan={3}
                className="border-b border-navy-800 bg-lightPrimary p-4"
              >
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none opacity-70"
                >
                  Wilayah
                </Typography>
              </th>
              <th className="border-b border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none opacity-70"
                >
                  KK
                </Typography>
              </th>
              <th className="border-b border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none opacity-70"
                >
                  Jiwa
                </Typography>
              </th>
              <th className="border-b border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none opacity-70"
                >
                  L
                </Typography>
              </th>
              <th className="border-b border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none opacity-70"
                >
                  P
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              ({ wilayah, kk, jiwa, laki, perempuan, rw }, index) => {
                const classes = "p-4 border-y border-navy-800";

                return (
                  <>
                    <tr key={index}>
                      <td className={`bg-brand-50/50 ${classes}`}>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className={`bg-brand-50/50 ${classes}`} colSpan={3}>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {wilayah}
                        </Typography>
                      </td>
                      <td className={`bg-brand-50/50 ${classes}`}>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {kk}
                        </Typography>
                      </td>
                      <td className={`bg-brand-50/50 ${classes}`}>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {jiwa}
                        </Typography>
                      </td>
                      <td className={`bg-brand-50/50 ${classes}`}>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {laki}
                        </Typography>
                      </td>
                      <td className={`bg-brand-50/50 ${classes}`}>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {perempuan}
                        </Typography>
                      </td>
                    </tr>
                    {rw.map(
                      ({ name, kk, jiwa, laki, perempuan, rt }, index) => (
                        <>
                          <tr key={name}>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-normal"
                              >
                                {}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-normal"
                              >
                                {index + 1}
                              </Typography>
                            </td>
                            <td className={classes} colSpan={2}>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-normal"
                              >
                                {name}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-normal"
                              >
                                {kk}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-normal"
                              >
                                {jiwa}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-normal"
                              >
                                {laki}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-normal"
                              >
                                {perempuan}
                              </Typography>
                            </td>
                          </tr>
                          <>
                            {rt.map(
                              ({ name, kk, jiwa, laki, perempuan }, index) => {
                                const classesRT = `${
                                  index % 2 === 0 ? "bg-brand-50/50" : ""
                                }`;

                                return (
                                  <tr key={name}>
                                    <td className={`${classes} ${classesRT}`}>
                                      <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                      >
                                        {}
                                      </Typography>
                                    </td>
                                    <td className={`${classes} ${classesRT}`}>
                                      <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                      >
                                        {}
                                      </Typography>
                                    </td>
                                    <td className={`${classes} ${classesRT}`}>
                                      <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                      >
                                        {index + 1}
                                      </Typography>
                                    </td>
                                    <td className={`${classes} ${classesRT}`}>
                                      <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                      >
                                        {name}
                                      </Typography>
                                    </td>
                                    <td className={`${classes} ${classesRT}`}>
                                      <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                      >
                                        {kk}
                                      </Typography>
                                    </td>
                                    <td className={`${classes} ${classesRT}`}>
                                      <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                      >
                                        {jiwa}
                                      </Typography>
                                    </td>
                                    <td className={`${classes} ${classesRT}`}>
                                      <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                      >
                                        {laki}
                                      </Typography>
                                    </td>
                                    <td className={`${classes} ${classesRT}`}>
                                      <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                      >
                                        {perempuan}
                                      </Typography>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </>
                        </>
                      )
                    )}
                  </>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataWilayahLayout;
