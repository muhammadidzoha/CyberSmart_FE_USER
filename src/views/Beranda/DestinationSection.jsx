import {
  Typography,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import React from "react";
import axios from "axios";
import useSWR from "swr";

const DestinationSection = () => {
  const topDestination = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/destinationTop"
    );
    return response.data;
  };

  const top2Destination = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/destinationTop2"
    );
    return response.data;
  };

  const { data: topdestination } = useSWR("top", topDestination);
  const { data: top2destination } = useSWR("top2", top2Destination);

  if (!topdestination || !top2destination) return <div>Loading...</div>;

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <Typography
          variant="h2"
          className="text-2xl font-bold md:text-4xl md:leading-tight"
          color="gray"
        >
          Potensi Desa Citeureup
        </Typography>
        <Typography variant="paragraph" color="gray" className="mt-1">
          Ekplorasi potensi di Desa Citeureup
        </Typography>
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5 relative">
        <div className="hidden 2xl:block absolute -top-44 -start-44 rotate-180 -z-[1] w-48 h-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg ">
          <div className="bg-lightPrimary w-48 h-48 rounded-lg"></div>
        </div>

        <div className="hidden 2xl:block absolute -bottom-12 rotate-180 -end-20 -z-[1] w-48 h-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
          <div className="bg-lightPrimary w-48 h-48 rounded-full"></div>
        </div>
        {topdestination.map((destination) => (
          <Card
            key={destination.destination_id}
            color="transparent"
            variant="gradient"
            shadow={false}
            className="group"
          >
            <CardHeader
              color="transparent"
              floated={false}
              className="mx-0 my-0 group-hover:scale-105 rounded-b-none"
            >
              <img src="src/assets/potensi/destinasi1.webp" alt="" />
            </CardHeader>
            <CardBody className="flex flex-col justify-between !p-0 space-y-5 !pt-5">
              <Typography color="gray" variant="h4">
                <span className="bg-gradient-to-r from-brand-500/50 to-brand-500/40 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
                  {destination.name}
                </span>
              </Typography>
              <Typography color="gray" className="text-justify font-normal">
                {destination.description}
              </Typography>
              <Typography
                as="a"
                href={`informasi/potensi-desa/${destination.destination_id}`}
              >
                <Button
                  variant="gradient"
                  color="deep-purple"
                  className="flex items-center gap-2 w-max"
                >
                  Selengkapnya
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </Typography>
            </CardBody>
          </Card>
        ))}
        <div className="grid gap-5">
          {top2destination.map((destination) => (
            <Card
              key={destination.destination_id}
              color="transparent"
              shadow={false}
              className="w-full max-w-[48rem] flex-row group"
            >
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/5 shrink-0 rounded-r-none group-hover:scale-105"
              >
                <img
                  src={destination.urlToImage}
                  alt="card"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody className="flex flex-col justify-between !p-0 !px-6">
                <Typography variant="h4" color="gray">
                  <span className="bg-gradient-to-r from-brand-500/50 to-brand-500/40 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
                    {destination.name}
                  </span>
                </Typography>
                <Typography color="gray" className="font-normal text-justify">
                  {destination.description}
                </Typography>
                <Typography
                  as="a"
                  href={`informasi/potensi-desa/${destination.destination_id}`}
                >
                  <Button
                    variant="gradient"
                    color="deep-purple"
                    className="flex items-center gap-2 w-max"
                  >
                    Selengkapnya
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Typography as="a" href="/informasi/potensi-desa">
          <Button variant="gradient" color="deep-purple">
            Lebih Banyak
          </Button>
        </Typography>
      </div>
    </div>
  );
};

export default DestinationSection;
