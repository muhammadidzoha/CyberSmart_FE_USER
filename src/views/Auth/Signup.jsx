import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formatPassword, setFormatPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const onFocus = () => {
    setFormatPassword(true);
  };

  const blurPassword = (e) => {
    handleBlur(e);
    setFormatPassword(false);
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      await axios.post("http://localhost:5000/api/create", values);
      const waitForToast = new Promise((resolve) => {
        toast.success("Pendaftaran berhasil!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          onClose: () => {
            resolve();
          },
        });
      });
      await waitForToast;
      navigate("../masuk");
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000, // Durasi tampilan notifikasi (ms)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { values, handleChange, handleBlur } = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confPassword: "",
    },
    onSubmit,
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-96">
        <div className="flex justify-center items-center gap-3 mt-4">
          <img src="/logo.png" alt="logo" className="w-[50px]" />
          <div>
            <Typography variant="h6" color="gray">
              Selamat Datang di Desa Citeureup
            </Typography>
            <Typography variant="h6" color="gray">
              Silahkan Daftar
            </Typography>
          </div>
        </div>
        <CardHeader
          floated={false}
          className="mb-4 grid h-28 place-items-center bg-[url('/img/pattern1.png')] bg-center bg-cover"
        ></CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Nama Lengkap"
            size="lg"
            id="fullname"
            name="fullname"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            type="email"
            label="Email"
            size="lg"
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div>
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              size="lg"
              id="password"
              name="password"
              onChange={handleChange}
              onBlur={blurPassword}
              onFocus={onFocus}
              icon={
                <div onClick={toggleShowPassword}>
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 256 256"
                      className="cursor-pointer"
                    >
                      <path
                        fill="currentColor"
                        d="M245.48 125.57c-.34-.78-8.66-19.23-27.24-37.81C201 70.54 171.38 50 128 50S55 70.54 37.76 87.76c-18.58 18.58-26.9 37-27.24 37.81a6 6 0 0 0 0 4.88c.34.77 8.66 19.22 27.24 37.8C55 185.47 84.62 206 128 206s73-20.53 90.24-37.75c18.58-18.58 26.9-37 27.24-37.8a6 6 0 0 0 0-4.88M128 194c-31.38 0-58.78-11.42-81.45-33.93A134.77 134.77 0 0 1 22.69 128a134.56 134.56 0 0 1 23.86-32.06C69.22 73.42 96.62 62 128 62s58.78 11.42 81.45 33.94A134.56 134.56 0 0 1 233.31 128C226.94 140.21 195 194 128 194m0-112a46 46 0 1 0 46 46a46.06 46.06 0 0 0-46-46m0 80a34 34 0 1 1 34-34a34 34 0 0 1-34 34"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 256 256"
                      className="cursor-pointer"
                    >
                      <path
                        fill="currentColor"
                        d="M52.44 36a6 6 0 0 0-8.88 8l20.88 23c-37.28 21.9-53.23 57-53.92 58.57a6 6 0 0 0 0 4.88c.34.77 8.66 19.22 27.24 37.8C55 185.47 84.62 206 128 206a124.91 124.91 0 0 0 52.57-11.25l23 25.29a6 6 0 0 0 8.88-8.08Zm48.62 71.32l45 49.52a34 34 0 0 1-45-49.52M128 194c-31.38 0-58.78-11.42-81.45-33.93A134.57 134.57 0 0 1 22.69 128c4.29-8.2 20.1-35.18 50-51.91l20.2 22.21a46 46 0 0 0 61.35 67.48l17.81 19.6A113.47 113.47 0 0 1 128 194m6.4-99.4a6 6 0 0 1 2.25-11.79a46.17 46.17 0 0 1 37.15 40.87a6 6 0 0 1-5.42 6.53h-.56a6 6 0 0 1-6-5.45A34.1 34.1 0 0 0 134.4 94.6m111.08 35.85c-.41.92-10.37 23-32.86 43.12a6 6 0 1 1-8-8.94A134.07 134.07 0 0 0 233.31 128a134.67 134.67 0 0 0-23.86-32.07C186.78 73.42 159.38 62 128 62a120.19 120.19 0 0 0-19.69 1.6a6 6 0 1 1-2-11.83A131.12 131.12 0 0 1 128 50c43.38 0 73 20.54 90.24 37.76c18.58 18.58 26.9 37 27.24 37.81a6 6 0 0 1 0 4.88"
                      />
                    </svg>
                  )}
                </div>
              }
            />
            {formatPassword ? (
              <div>
                <Typography
                  variant="small"
                  color="gray"
                  className="mt-2 flex items-center gap-1 font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Password minimal 6 karakter
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="mt-2 flex items-center gap-1 font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Password harus diawali dengan huruf kapital
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="mt-2 flex items-center gap-1 font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Password dikombinasikan dengan angka dan simbol
                </Typography>
              </div>
            ) : null}
          </div>
          <Input
            type={showPassword2 ? "text" : "password"}
            label="Confirm Password"
            size="lg"
            id="confPassword"
            name="confPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            icon={
              <div onClick={toggleShowPassword2}>
                {showPassword2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 256 256"
                    className="cursor-pointer"
                  >
                    <path
                      fill="currentColor"
                      d="M245.48 125.57c-.34-.78-8.66-19.23-27.24-37.81C201 70.54 171.38 50 128 50S55 70.54 37.76 87.76c-18.58 18.58-26.9 37-27.24 37.81a6 6 0 0 0 0 4.88c.34.77 8.66 19.22 27.24 37.8C55 185.47 84.62 206 128 206s73-20.53 90.24-37.75c18.58-18.58 26.9-37 27.24-37.8a6 6 0 0 0 0-4.88M128 194c-31.38 0-58.78-11.42-81.45-33.93A134.77 134.77 0 0 1 22.69 128a134.56 134.56 0 0 1 23.86-32.06C69.22 73.42 96.62 62 128 62s58.78 11.42 81.45 33.94A134.56 134.56 0 0 1 233.31 128C226.94 140.21 195 194 128 194m0-112a46 46 0 1 0 46 46a46.06 46.06 0 0 0-46-46m0 80a34 34 0 1 1 34-34a34 34 0 0 1-34 34"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 256 256"
                    className="cursor-pointer"
                  >
                    <path
                      fill="currentColor"
                      d="M52.44 36a6 6 0 0 0-8.88 8l20.88 23c-37.28 21.9-53.23 57-53.92 58.57a6 6 0 0 0 0 4.88c.34.77 8.66 19.22 27.24 37.8C55 185.47 84.62 206 128 206a124.91 124.91 0 0 0 52.57-11.25l23 25.29a6 6 0 0 0 8.88-8.08Zm48.62 71.32l45 49.52a34 34 0 0 1-45-49.52M128 194c-31.38 0-58.78-11.42-81.45-33.93A134.57 134.57 0 0 1 22.69 128c4.29-8.2 20.1-35.18 50-51.91l20.2 22.21a46 46 0 0 0 61.35 67.48l17.81 19.6A113.47 113.47 0 0 1 128 194m6.4-99.4a6 6 0 0 1 2.25-11.79a46.17 46.17 0 0 1 37.15 40.87a6 6 0 0 1-5.42 6.53h-.56a6 6 0 0 1-6-5.45A34.1 34.1 0 0 0 134.4 94.6m111.08 35.85c-.41.92-10.37 23-32.86 43.12a6 6 0 1 1-8-8.94A134.07 134.07 0 0 0 233.31 128a134.67 134.67 0 0 0-23.86-32.07C186.78 73.42 159.38 62 128 62a120.19 120.19 0 0 0-19.69 1.6a6 6 0 1 1-2-11.83A131.12 131.12 0 0 1 128 50c43.38 0 73 20.54 90.24 37.76c18.58 18.58 26.9 37 27.24 37.81a6 6 0 0 1 0 4.88"
                    />
                  </svg>
                )}
              </div>
            }
          />
        </CardBody>
        <CardFooter className="pt-0 flex flex-col space-y-5">
          <Button
            loading={isLoading}
            className="flex justify-center"
            variant="gradient"
            color="deep-purple"
            fullWidth
            onClick={onSubmit}
          >
            Daftar
          </Button>
          <Typography as="a" href="/">
            <Button variant="gradient" color="deep-purple" fullWidth>
              Kembali
            </Button>
          </Typography>
          <Typography
            as="div"
            variant="small"
            className="mt-6 flex justify-center"
          >
            Sudah punya akun?
            <Typography variant="small" color="gray" className="ml-1 font-bold">
              <Link to="../masuk">Masuk</Link>
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
