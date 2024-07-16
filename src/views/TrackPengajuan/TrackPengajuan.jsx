import {
  Button,
  Card,
  CardBody,
  Dialog,
  Typography,
} from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnData = () => [
  {
    accessorKey: "",
    header: "NO",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.row.index + 1}
      </Typography>
    ),
  },
  {
    accessorKey: "letter_type",
    header: "TUJUAN SURAT",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "",
    header: "AKSI",
    cell: (props) => {
      const [openBerkas, setOpenBerkas] = useState(false);
      const [data, setData] = useState();

      const handleOpenDialog = async (request_id) => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/letter/${request_id}`
          );
          setData(response.data);
          setOpenBerkas(!openBerkas);
        } catch (error) {
          handleClose();
        }
      };

      const handleClose = () => {
        setOpenBerkas(false);
      };

      return (
        <div className="flex justify-center items-center gap-2">
          <Dialog
            open={openBerkas}
            handler={handleOpenDialog}
            className="bg-transparent shadow-none"
          >
            <Card className="overflow-scroll overflow-x-hidden max-h-[600px]">
              <CardBody>
                <div>
                  {data?.urlToPdfFile ? (
                    <>
                      <Typography>Surat Pengajuan:</Typography>
                      <iframe
                        src={data?.urlToPdfFile}
                        title={data?.request_id}
                        height={700}
                        className="w-full min-h-0"
                      ></iframe>
                    </>
                  ) : null}
                </div>
                <div className="mt-5">
                  {data?.urlPengantar ? (
                    <>
                      <Typography>Surat Pengantar:</Typography>
                      <img src={data?.urlPengantar} alt="" />
                    </>
                  ) : null}
                </div>
                <div className="mt-5">
                  {data?.urlKK ? (
                    <>
                      <Typography>Kartu Keluarga:</Typography>
                      <img src={data?.urlKK} alt="" />
                    </>
                  ) : null}
                </div>
                <div className="mt-5">
                  {data?.urlAkte ? (
                    <>
                      <Typography>Akte Kelahiran: </Typography>
                      <img src={data?.urlAkte} alt="" />
                    </>
                  ) : null}
                </div>
                <div className="mt-5">
                  {data?.urlSuratKelahiran ? (
                    <>
                      <Typography>Surat Kelahiran: </Typography>
                      <img src={data?.urlSuratKelahiran} alt="" />
                    </>
                  ) : null}
                </div>
                <div className="mt-5">
                  {data?.urlSuratKematian ? (
                    <>
                      <Typography>Surat Kematian: </Typography>
                      <img src={data?.urlSuratKematian} alt="" />
                    </>
                  ) : null}
                </div>
                <div className="mt-5">
                  {data?.urlKTPAyah ? (
                    <>
                      <Typography>KTP Ayah: </Typography>
                      <img src={data?.urlKTPAyah} alt="" />
                    </>
                  ) : null}
                </div>
                <div className="mt-5">
                  {data?.urlKTPIbu ? (
                    <>
                      <Typography>KTP Ibu: </Typography>
                      <img src={data?.urlKTPIbu} alt="" />
                    </>
                  ) : null}
                </div>
                <div className="mt-5">
                  {data?.urlKTPMeninggal ? (
                    <>
                      <Typography>KTP Yang Meninggal: </Typography>
                      <img src={data?.urlKTPMeninggal} alt="" />
                    </>
                  ) : null}
                </div>
                <div className="mt-5">
                  {data?.urlKTPPemohon ? (
                    <>
                      <Typography>KTP Pemohon: </Typography>
                      <img src={data?.urlKTPPemohon} alt="" />
                    </>
                  ) : null}
                </div>
              </CardBody>
            </Card>
          </Dialog>
          <Button
            variant="gradient"
            color="deep-purple"
            size="sm"
            onClick={() => handleOpenDialog(props.row.original.request_id)}
          >
            Lihat Berkas
          </Button>
        </div>
      );
    },
  },
];

const TrackPengajuan = () => {
  const columnsData = columnData();

  const columns = useMemo(() => columnsData, []);

  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/api/letterAuthor");
    return response.data;
  };

  const { data: letters } = useSWR("letter", fetcher);
  const data = useMemo(() => letters, [letters]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!letters) return <div>Loading...</div>;

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <Typography
          variant="h2"
          className="text-2xl font-bold md:text-4xl md:leading-tight"
          color="gray"
        >
          Track Pengajuan Anda
        </Typography>
        <Typography variant="paragraph" color="gray" className="mt-1">
          Melihat hasil surat pengantar yang diajukan
        </Typography>
      </div>
      <div>
        <table className="w-full table-auto text-left">
          {table.getHeaderGroups().map((headerGroup) => (
            <thead key={headerGroup.id}>
              <tr>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="[&:nth-child(8)]:text-center last:text-center bg-lightPrimary p-4"
                  >
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal leading-none"
                    >
                      {header.column.columnDef.header}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
          ))}
          <tbody>
            {table.getRowModel() &&
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-4 border-b border-navy-800 max-w-[850px]"
                    >
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Typography>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackPengajuan;
