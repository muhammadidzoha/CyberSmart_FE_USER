import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TransparansiTable from "../views/TransparansiAPBD/TransparansiTable";
import axios from "axios";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";

const columnData = ({ mutate }) => [
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
    accessorKey: "title",
    header: "TITLE",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {props.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "date_of_publication",
    header: "PUBLISH",
    cell: (props) => (
      <Typography variant="small" color="gray">
        {format(new Date(props.getValue()), "dd MMMM yyyy")}
      </Typography>
    ),
  },
  {
    accessorKey: "",
    header: "ACTION",
    cell: (props) => {
      const handleDownload = async (transparency_id) => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/transparency/${transparency_id}`
          );

          const apbdFile = response.data.urlToApbdFile;
          window.location.href = apbdFile;
        } catch (error) {
          console.log(error);
        }
      };

      const handleView = async (transparency_id) => {
        try {
          window.location.href = `http://localhost:5000/api/transparencyShow/${transparency_id}`;
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="gradient"
            color="deep-purple"
            onClick={() => handleView(props.row.original.transparency_id)}
          >
            Lihat
          </Button>
          <Button
            variant="gradient"
            color="deep-purple"
            onClick={() => handleDownload(props.row.original.transparency_id)}
          >
            Unduh
          </Button>
        </div>
      );
    },
  },
];

const KeuanganLayout = () => {
  const [currentRoute, setCurrentRoute] = useState("APBD");
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const mainPath = pathnames[0];

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(9);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");

  const fetcher = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/transparencys?search_query=${keyword}&page=${page}&limit=${limit}`
    );

    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
    return response.data;
  };

  useEffect(() => {
    mutate();
  }, [page, keyword, pages, rows]);

  const { data, mutate } = useSWR(
    ["transparencys", keyword, page, pages, rows, limit],
    fetcher
  );

  if (!data) return <div>Loading...</div>;

  const handleSearch = (e) => {
    setQuery(e);
  };

  const submitSearch = () => {
    setPage(0);
    setKeyword(query);
  };

  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  const columns = columnData({ mutate });

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
            {mainPath}
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <form
          onSubmit={submitSearch}
          className="relative flex w-full max-w-[24rem] my-5"
        >
          <Input
            label="Cari berdasarkan Judul"
            name="query"
            color="deep-purple"
            onChange={(e) => handleSearch(e.target.value)}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            type="submit"
            variant="gradient"
            color="deep-purple"
            className="!absolute right-1 top-1 rounded"
          >
            Cari
          </Button>
        </form>
        <TransparansiTable columnsData={columns} tableData={data.results} />
        <div className="my-5 flex justify-between">
          <Typography variant="small" color="gray">
            Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
          </Typography>
          <div key={rows}>
            <ReactPaginate
              nextLabel={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-medium"
                >
                  Next
                  {/* <BsArrowRightShort className="w-6 h-6" /> */}
                </Typography>
              }
              previousLabel={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-medium"
                >
                  {/* <BsArrowLeftShort className="w-6 h-6" /> */}
                  Prev
                </Typography>
              }
              nextClassName="hover:bg-gray-900/10 px-4 py-2 rounded-lg"
              previousClassName="hover:bg-gray-900/10 px-4 py-2 rounded-lg"
              pageCount={Math.min(10, data.totalPage)}
              onPageChange={handlePageChange}
              containerClassName="flex items-center space-x-2 text-navy-800 text-sm font-medium"
              pageLinkClassName="text-navy-800 px-4 py-2 rounded-lg hover:bg-gray-900/10"
              activeLinkClassName="bg-brand-500 text-white hover:bg-brand-500"
              disabledLinkClassName="font-thin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeuanganLayout;
