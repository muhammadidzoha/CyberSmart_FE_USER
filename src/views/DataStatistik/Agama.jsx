import { Card, Typography } from "@material-tailwind/react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Highcharts3D from "highcharts/highcharts-3d";
import React from "react";
import { agamaChart } from "./variabels/chart";

Highcharts3D(Highcharts);

const TABLE_ROWS = agamaChart.series[0].data.map((dataPoint) => ({
  name: dataPoint.name,
  y: dataPoint.y,
  persen: dataPoint.persen,
  laki: dataPoint.laki,
  perempuan: dataPoint.perempuan,
}));

const totalLaki = TABLE_ROWS.reduce((acc, row) => acc + row.laki, 0);
const totalPerempuan = TABLE_ROWS.reduce((acc, row) => acc + row.perempuan, 0);
const totalJiwa = totalLaki + totalPerempuan;

const persentaseTotalLaki = totalLaki !== 0 ? (totalLaki / totalJiwa) * 100 : 0;
const persentaseTotalPerempuan =
  totalPerempuan !== 0 ? (totalPerempuan / totalJiwa) * 100 : 0;

const persentaseTotalJiwa = persentaseTotalLaki + persentaseTotalPerempuan;

const Agama = () => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={agamaChart} />
      <div className="max-w-2xl mx-auto text-center my-10 lg:my-14">
        <Typography
          variant="h2"
          className="text-2xl font-bold md:text-4xl md:leading-tight"
          color="gray"
        >
          Tabel
        </Typography>
      </div>
      <Card color="transparent" shadow={false}>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th
                rowSpan={2}
                className="border-y border-navy-800 bg-lightPrimary p-4"
              >
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none"
                >
                  No
                </Typography>
              </th>
              <th
                rowSpan={2}
                className="border-y border-r border-navy-800 bg-lightPrimary p-4"
              >
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none"
                >
                  Kelompok
                </Typography>
              </th>
              <th
                colSpan={2}
                className="border-y border-navy-800 bg-lightPrimary p-4"
              >
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center
                  "
                >
                  Jumlah
                </Typography>
              </th>
              <th
                colSpan={2}
                className="border-y border-navy-800 bg-lightPrimary p-4"
              >
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center"
                >
                  Laki-Laki
                </Typography>
              </th>
              <th
                colSpan={2}
                className="border-y border-navy-800 bg-lightPrimary p-4"
              >
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center"
                >
                  Perempuan
                </Typography>
              </th>
            </tr>
            <tr>
              <th className="border-b border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center"
                >
                  Jiwa
                </Typography>
              </th>
              <th className="border-b border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center"
                >
                  %
                </Typography>
              </th>
              <th className="border-b border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center"
                >
                  Jiwa
                </Typography>
              </th>
              <th className="border-b border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center"
                >
                  %
                </Typography>
              </th>
              <th className="border-b border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center"
                >
                  Jiwa
                </Typography>
              </th>
              <th className="border-b border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center"
                >
                  %
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ name, y, persen, laki, perempuan }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-navy-800";

              // Menghitung persentase
              const persentaseLaki =
                totalLaki !== 0 ? (laki / totalLaki) * 100 : 0;
              const persentasePerempuan =
                totalPerempuan !== 0 ? (perempuan / totalPerempuan) * 100 : 0;
              const persentaseJiwa =
                totalJiwa !== 0 ? (y / totalJiwa) * 100 : 0;

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal opacity-70"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal opacity-70"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal opacity-70 text-center"
                    >
                      {y}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal opacity-70 text-center"
                    >
                      {persentaseJiwa.toFixed(2)}%
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal opacity-70 text-center"
                    >
                      {laki}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal opacity-70 text-center"
                    >
                      {persentaseLaki.toFixed(2)}%
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal opacity-70 text-center"
                    >
                      {perempuan}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal opacity-70 text-center"
                    >
                      {persentasePerempuan.toFixed(2)}%
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th className="border-y border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none"
                ></Typography>
              </th>
              <th className="border-y border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none"
                >
                  Total
                </Typography>
              </th>
              <th className="border-y border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center
                  "
                >
                  {totalJiwa}
                </Typography>
              </th>
              <th className="border-y border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center
                  "
                >
                  {persentaseTotalJiwa.toFixed(2)}%
                </Typography>
              </th>
              <th className="border-y border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center"
                >
                  {totalLaki}
                </Typography>
              </th>
              <th className="border-y border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center
                  "
                >
                  {persentaseTotalLaki.toFixed(2)}%
                </Typography>
              </th>
              <th className="border-y border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center"
                >
                  {totalPerempuan}
                </Typography>
              </th>
              <th className="border-y border-navy-800 bg-lightPrimary p-4">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal leading-none text-center
                  "
                >
                  {persentaseTotalPerempuan.toFixed(2)}%
                </Typography>
              </th>
            </tr>
          </tfoot>
        </table>
      </Card>
    </div>
  );
};

export default Agama;
