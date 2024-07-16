import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { format } from "date-fns";
import React from "react";
import useSWR from "swr";

const NewsSection = () => {
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/api/newsTop");
    return response.data;
  };

  const { data } = useSWR("news", fetcher);

  console.log(data);

  if (!data) return <div>Loading...</div>;

  const handleView = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/news/updateViews/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <Typography
          variant="h2"
          className="text-2xl font-bold md:text-4xl md:leading-tight"
          color="gray"
        >
          Berita
        </Typography>
        <Typography variant="paragraph" color="gray" className="mt-1">
          Menyajikan berita terupdate seputar Desa Citeureup
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 relative">
        {/* Pattern start */}
        <div className="hidden 2xl:block absolute top-0 end-0 translate-x-20 -translate-y-20 z-50">
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
        {/* Pattern end */}
        {data.map((news) => (
          <Card
            key={news.news_id}
            shadow={false}
            className="relative group grid w-full h-[30rem] items-end justify-center overflow-hidden text-center"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center group-hover:scale-105"
            >
              <img
                src={news.urlToThumbnail}
                alt="news"
                className="absolute inset-0 m-0 h-full w-full rounded-none object-cover object-center"
              />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="h4"
                color="white"
                className="mb-6 text-start font-medium leading-[1.5] capitalize"
              >
                <span className="bg-gradient-to-r from-brand-100/50 to-brand-100/40 bg-[length:0px_10px] hover:bg-[length:100%_3px] transition-[background-size] duration-500 group-hover:bg-[length:100%_10px] bg-no-repeat bg-left-bottom">
                  {news.title}
                </span>
              </Typography>
              <div className="flex gap-5 ">
                <Avatar
                  size="lg"
                  variant="circular"
                  alt="tania andrew"
                  className="border-2 border-white"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
                <div className="flex flex-col space-y-2 items-start justify-center">
                  <Typography variant="h6" color="white">
                    {news.author.name}
                  </Typography>
                  <Typography variant="paragraph" color="white">
                    {format(new Date(news.createdAt), "dd MMMM yyyy")}
                  </Typography>
                </div>
              </div>
              <div className="flex">
                <Typography as="a" href={`informasi/berita/${news.news_id}`}>
                  <Button
                    variant="gradient"
                    color="white"
                    className="mt-5"
                    onClick={() => handleView(news.news_id)}
                  >
                    Selengkapnya
                  </Button>
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-5">
        <Typography as="a" href="/informasi/berita">
          <Button variant="gradient" color="deep-purple">
            Lebih Banyak
          </Button>
        </Typography>
      </div>
    </div>
  );
};

export default NewsSection;
