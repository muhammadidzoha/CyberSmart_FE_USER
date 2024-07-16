import {
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { format } from "date-fns";
import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import useSWR from "swr";

const DestinationDetail = () => {
  const { id } = useParams();
  const [currentRoute, setCurrentRoute] = useState("Informasi");
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const fetcher = async (req, res) => {
    const response = await axios.get(
      `http://localhost:5000/api/destination/${id}`
    );
    return response.data;
  };

  const { data } = useSWR("destinations", fetcher);

  if (!data) return <div>Loading...</div>;

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
          <Typography
            variant="small"
            color="gray"
            className="capitalize cursor-text"
          >
            {pathnames[2]}
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-12">
          <div className="lg:col-span-2">
            <div className="py-8 lg:pe-8">
              <div className="space-y-5 lg:space-y-8">
                <Typography
                  as="a"
                  href="../potensi-desa"
                  variant="small"
                  color="gray"
                  className="inline-flex items-center gap-x-1.5 decoration-2 hover:font-medium"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>{" "}
                  Kembali ke potensi desa
                </Typography>

                <Typography variant="h2" color="gray" className="xl:text-5xl">
                  {data.name}
                </Typography>

                <div className="flex items-center gap-x-5">
                  <Button
                    variant="text"
                    color="deep-purple"
                    className="cursor-text"
                  >
                    Company News
                  </Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    {format(new Date(data.created_at), "dd MMMM yyyy")}
                  </Typography>
                </div>

                <figure>
                  <img
                    className="w-full object-cover rounded-xl"
                    src={data.urlToImage}
                    alt="News Description"
                  />
                  <figcaption className="mt-3 text-sm text-center text-navy-800 font-light">
                    {data.name}
                  </figcaption>
                </figure>

                <Typography
                  as="div"
                  variant="h6"
                  color="gray"
                  className="font-normal text-justify"
                >
                  <pre className="whitespace-pre-line font-sans">
                    {data.content}
                  </pre>
                </Typography>
              </div>
            </div>
          </div>
          <Card
            color="transparent"
            shadow={false}
            className="lg:col-span-1 xl:w-full xl:h-full lg:bg-gradient-to-r lg:from-gray-100 lg:via-transparent lg:to-transparent"
          >
            <CardBody>
              <div className="sticky top-0 start-0">
                <Typography
                  variant="h5"
                  color="gray"
                  className="border-b border-navy-800 pb-4 mb-4"
                >
                  Terbaru
                </Typography>
                <div className="flex flex-col space-y-10">
                  <Link to="/">
                    <Card color="transparent" shadow={false} className="group">
                      <CardBody className="flex items-center !p-0">
                        <div className="grow">
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-semibold group-hover:text-brand-500"
                          >
                            5 Reasons to Not start a UX Designer Career in
                            2022/2023
                          </Typography>
                        </div>
                        <div className="flex-shrink-0 relative rounded-lg overflow-hidden w-20 h-20">
                          <img
                            className="w-full h-full absolute top-0 start-0 object-cover rounded-lg"
                            src="https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            alt="Description"
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                  <Link to="/">
                    <Card color="transparent" shadow={false} className="group">
                      <CardBody className="flex items-center !p-0">
                        <div className="grow">
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-semibold group-hover:text-brand-500"
                          >
                            5 Reasons to Not start a UX Designer Career in
                            2022/2023
                          </Typography>
                        </div>
                        <div className="flex-shrink-0 relative rounded-lg overflow-hidden w-20 h-20">
                          <img
                            className="w-full h-full absolute top-0 start-0 object-cover rounded-lg"
                            src="https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            alt="Description"
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                  <Link to="/">
                    <Card color="transparent" shadow={false} className="group">
                      <CardBody className="flex items-center !p-0">
                        <div className="grow">
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-semibold group-hover:text-brand-500"
                          >
                            5 Reasons to Not start a UX Designer Career in
                            2022/2023
                          </Typography>
                        </div>
                        <div className="flex-shrink-0 relative rounded-lg overflow-hidden w-20 h-20">
                          <img
                            className="w-full h-full absolute top-0 start-0 object-cover rounded-lg"
                            src="https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            alt="Description"
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
