import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/forgot-password",
        values,
        {
          withCredentials: true,
        }
      );

      const successMessage = response.data.msg;

      const responseData = JSON.parse(response.config.data);
      const emailValue = responseData.email;

      await toast.promise(
        new Promise((resolve) =>
          setTimeout(() => resolve(successMessage), 1000)
        ),
        {
          pending: {
            render() {
              return "Mengirimkan OTP...";
            },
          },
          success: {
            render({ data }) {
              return data;
            },
            onClose() {
              window.sessionStorage.setItem("email", emailValue);
              navigate("otp");
            },
            autoClose: 2000,
          },
          error: {
            render({ data }) {
              return `${data}`;
            },
          },
        }
      );
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const { values, handleChange, handleBlur } = useFormik({
    initialValues: {
      email: "",
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
              Silahkan Lupa Password
            </Typography>
          </div>
        </div>
        <CardHeader
          floated={false}
          className="mb-4 grid h-28 place-items-center bg-[url('/img/pattern1.png')] bg-center bg-cover"
        ></CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            size="lg"
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </CardBody>
        <CardFooter className="pt-0 flex flex-col space-y-5">
          <Button
            className="flex justify-center"
            loading={loading}
            variant="gradient"
            fullWidth
            onClick={onSubmit}
            color="deep-purple"
          >
            Kirim OTP
          </Button>
          <Typography as="a" href="/">
            <Button variant="gradient" color="deep-purple" fullWidth>
              Kembali
            </Button>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
