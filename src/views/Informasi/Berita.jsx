import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";

const Berita = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(9);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");

  const fetcher = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/news?search_query=${keyword}&page=${page}&limit=${limit}`
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
    ["news", keyword, page, pages, rows, limit],
    fetcher
  );

  if (!data) return <div>Loading...</div>;

  console.log(data.results);

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

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <form
        onSubmit={submitSearch}
        className="relative flex w-full max-w-[24rem]"
      >
        <Input
          label="Cari Berdasarkan Judul / Konten"
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
      <div className="grid grid-cols-3 gap-5 place-items-center relative">
        <div className="hidden 2xl:block absolute top-0 end-0 translate-x-10 -translate-y-10 z-50">
          <svg
            className="w-16 h-auto text-brand-500"
            width="121"
            height="135"
            viewBox="0 0 121 135"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="hidden 2xl:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
          <svg
            className="w-40 h-auto text-graphSecond"
            width="347"
            height="188"
            viewBox="0 0 347 188"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {data.results.map((ns) => (
          <Card key={ns.news_id} className="mt-6 w-96 group">
            <CardHeader floated={false} color="gray" className="relative h-56">
              <img
                src={ns.urlToThumbnail}
                alt="card"
                className="group-hover:scale-105 w-full h-full object-cover object-center"
              />
            </CardHeader>
            <CardBody>
              <Typography
                variant="h5"
                color="gray"
                className="mb-4 max-h-[100px] overflow-hidden text-ellipsis whitespace-pre"
              >
                <span className="bg-gradient-to-r from-brand-500/50 to-brand-500/40 bg-[length:0px_10px] hover:bg-[length:100%_3px] transition-[background-size] duration-500 group-hover:bg-[length:100%_10px] bg-no-repeat bg-left-bottom">
                  {ns.title}
                </span>
              </Typography>
              <Typography variant="paragraph" className="font-normal">
                <pre className="truncate font-sans">{ns.description}</pre>
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <div className="flex justify-between items-center gap-5">
                <div className="flex items-center justify-center gap-2">
                  <Avatar
                    size="md"
                    variant="circular"
                    alt="tania andrew"
                    className="border-2 border-white"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                  <Typography variant="h6" color="gray">
                    {ns.author.name}
                  </Typography>
                </div>
                <Typography variant="small" color="gray">
                  {format(new Date(ns.createdAt), "dd MMMM yyyy")}
                </Typography>
              </div>
              <Typography as="a" href={`./berita/${ns.news_id}`}>
                <Button variant="gradient" color="deep-purple" className="mt-5">
                  Selengkapnya
                </Button>
              </Typography>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-10 flex justify-center items-center">
        <div key={rows}>
          <ReactPaginate
            nextLabel={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-medium gap-2"
              >
                Next
                <ArrowRightIcon className="w-4 h-4" />
              </Typography>
            }
            previousLabel={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-medium gap-2"
              >
                <ArrowLeftIcon className="w-4 h-4" />
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
  );
};

export default Berita;
