import {
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Typography,
  Textarea,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import axios from "axios";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const BeritaDetail = () => {
  const { id } = useParams();
  const [currentRoute, setCurrentRoute] = useState("Informasi");
  const location = useLocation();
  const navigate = useNavigate();
  const [expire, setExpire] = useState("");
  const [token, setToken] = useState("");
  const pathnames = location.pathname.split("/").filter((x) => x);

  const url = location.pathname;

  const timeAgo = (timestamp) => {
    const currentDate = new Date();
    const commentDate = new Date(timestamp);
    const timeDifference = Math.floor((currentDate - commentDate) / 60000); // Menghitung selisih waktu dalam menit

    if (timeDifference < 1) {
      return "Baru saja";
    } else if (timeDifference < 60) {
      return `${timeDifference} ${
        timeDifference === 1 ? "menit" : "menit"
      } yang lalu`;
    } else if (timeDifference < 1440) {
      const hoursDifference = Math.floor(timeDifference / 60);
      return `${hoursDifference} ${
        hoursDifference === 1 ? "jam" : "jam"
      } yang lalu`;
    } else {
      return null; // Selisih waktu lebih dari 24 jam, tampilkan null atau string kosong
    }
  };

  useEffect(() => {
    reToken();
  }, []);

  const reToken = async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/api/retoken", {
        withCredentials: true,
      });
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      console.log(error.response);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/api/retoken", {
          withCredentials: true,
        });
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const fetcher = async () => {
    const response = await axios.get(`http://localhost:5000/api/news/${id}`, {
      withCredentials: true,
    });
    return response.data;
  };

  const onSubmit = async () => {
    await reToken();
    try {
      const isLoggedIn = window.sessionStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        navigate("/auth/masuk");
      } else {
        const newComment = await axios.post(
          "http://localhost:5000/api/comentar/create",
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        mutate("news");
        setValues({
          comment_content: "",
          news_id: id,
        });
        toast.success("Berhasil menambahkan komentar", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: {
        comment_content: "",
        news_id: id,
      },
      onSubmit,
    });

  console.log(values);

  const { data } = useSWR("news", fetcher);

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
                  href="../berita"
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
                  Kembali ke blog
                </Typography>

                <Typography variant="h2" color="gray" className="xl:text-5xl">
                  {data.news.title}
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
                    {format(new Date(data.news.createdAt), "dd MMMM yyyy")}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    {data.news.views}x diliat
                  </Typography>
                  <Button variant="gradient" color="deep-purple">
                    <a
                      className="text-xs"
                      href={`whatsapp://send?text=${encodeURIComponent(
                        `${data.title}\n\nKlik untuk baca:\nhttp://localhost:5173${url}`
                      )}`}
                    >
                      Bagikan di WhatsApp
                    </a>
                  </Button>
                </div>

                <figure>
                  <img
                    className="w-full object-cover rounded-xl"
                    src={data.news.urlToThumbnail}
                    alt="News Description"
                  />
                  <figcaption className="mt-3 text-sm text-center text-navy-800 font-light">
                    {data.news.title}
                  </figcaption>
                </figure>

                <Typography
                  as="div"
                  variant="h6"
                  color="gray"
                  className="font-normal text-justify"
                >
                  <pre className="whitespace-pre-line font-sans">
                    {data.news.content}
                  </pre>
                </Typography>

                <div>
                  <Typography
                    as="div"
                    variant="h6"
                    color="gray"
                    className="font-normal text-justify"
                  >
                    Berikan Komentar
                  </Typography>
                  <div className="flex w-full flex-row items-center gap-2 mt-2 rounded-md border border-gray-900/10 bg-gray-900/5 p-2">
                    <form onSubmit={handleSubmit} className="flex w-full">
                      <Textarea
                        rows={1}
                        resize={true}
                        placeholder="Komentar Anda"
                        name="comment_content"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.comment_content}
                        className="min-h-full !border-0 focus:border-transparent"
                        containerProps={{
                          className: "grid h-full",
                        }}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <div>
                        <IconButton
                          type="submit"
                          variant="text"
                          className="rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                            />
                          </svg>
                        </IconButton>
                      </div>
                    </form>
                  </div>
                </div>

                <div>
                  <Typography
                    as="div"
                    variant="h6"
                    color="gray"
                    className="font-normal text-justify"
                  >
                    {data.commentCount} Komentar
                  </Typography>
                  {data.news.comentars.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start gap-3 my-5"
                    >
                      <Avatar
                        variant="circular"
                        size="md"
                        alt="tania andrew"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      />
                      <div>
                        <div className="flex gap-20">
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal capitalize"
                          >
                            {comment.author.fullname}
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="capitalize text-xs"
                          >
                            {timeAgo(comment.createdAt)}
                          </Typography>
                        </div>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {comment.comment_content}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
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

export default BeritaDetail;
