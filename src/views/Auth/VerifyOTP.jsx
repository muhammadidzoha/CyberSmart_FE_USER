import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password/otp",
        otp,
        { withCredentials: true }
      );

      const successMessage = response.data.msg;

      await toast.promise(
        new Promise((resolve) =>
          setTimeout(() => resolve(successMessage), 1000)
        ),
        {
          pending: {
            render() {
              return "Memverifikasi OTP...";
            },
          },
          success: {
            render({ data }) {
              return data;
            },
            onClose() {
              navigate("../reset-password");
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
        autoClose: 2000, // Durasi tampilan notifikasi (ms)
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
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
    },
    onSubmit,
  });

  const convertValuesToOTPString = (values) => {
    const otpArray = Object.values(values);
    return otpArray.join("");
  };

  const otpString = convertValuesToOTPString(values);
  const otp = {
    otp: otpString,
  };

  const [pin, setPin] = useState(Array(6).fill(""));

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
              Silahkan Masukan OTP Anda
            </Typography>
          </div>
        </div>
        <CardHeader
          floated={false}
          className="mb-4 grid h-28 place-items-center bg-[url('/img/pattern1.png')] bg-center bg-cover"
        ></CardHeader>
        <CardBody className="flex flex-col gap-4">
          <div className="flex space-x-2">
            {pin.map((digit, index) => (
              <Input
                label={`${index + 1}`}
                id={`${index + 1}`}
                name={`${index + 1}`}
                key={index}
                maxLength={1}
                className="text-center"
                containerProps={{ className: "min-w-[40px]" }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            loading={loading}
            className="flex justify-center"
            onClick={onSubmit}
            variant="gradient"
            fullWidth
            color="deep-purple"
          >
            Kirim
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyOTP;
