import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Link } from "react-router-dom";
import MyProfilEdit from "./MyProfilEdit";
import { useCountries } from "use-react-countries";

const MyProfil = () => {
  const [open, setOpen] = useState(false);

  const { countries } = useCountries();
  const indonesia = countries.find((country) => country.name === "Indonesia");

  const handleOpen = () => setOpen(!open);

  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/api/user", {
      withCredentials: true,
    });
    return response.data;
  };

  const { data, mutate } = useSWR("users", fetcher, {
    revalidateOnFocus: false,
  });
  if (!data) return <div>Loading ...</div>;

  return (
    <div>
      <Card className="relative">
        <CardHeader floated={false} className="mx-0 my-0">
          <img
            src="/img/pattern1.png"
            alt="pattern1"
            className="object-cover object-center"
          />
        </CardHeader>
        <div className="w-[1200px] h-max bg-white/20 border-0 backdrop-blur-2xl backdrop-saturate-200 absolute left-1/2 -translate-x-1/2 top-[300px] rounded-3xl p-5">
          <Avatar
            variant="rounded"
            size="xl"
            alt="tania andrew"
            className="relative left-1/2 -translate-x-1/2"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <Typography
            variant="small"
            className="font-medium capitalize text-text text-center mt-5 text-lg"
          >
            {window.sessionStorage.getItem("fullname")}
          </Typography>
        </div>
        <CardBody>
          <div className="flex flex-col space-y-5">
            <div className="grid grid-cols-3 gap-5 mt-32">
              <Input
                label="Nama Lengkap"
                size="lg"
                defaultValue={data?.fullname || ""}
                readOnly
              />
              <Input
                label="NIK"
                size="lg"
                defaultValue={data?.nik || ""}
                readOnly
              />
              <Input
                label="Jenis Kelamin"
                size="lg"
                defaultValue={data?.gender || ""}
                readOnly
              />
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="grid gap-5">
                <Textarea
                  label="Alamat Lengkap"
                  size="lg"
                  defaultValue={data?.address || ""}
                  readOnly
                />
                <Input
                  label="Agama"
                  size="lg"
                  defaultValue={data?.religion || ""}
                  readOnly
                />
              </div>
              <div className="grid grid-rows-3 gap-5">
                <Input
                  label="Dusun"
                  size="lg"
                  defaultValue={data?.village || ""}
                  readOnly
                />
                <div className="grid grid-cols-2 gap-5">
                  <Input
                    label="RT"
                    size="lg"
                    defaultValue={data?.rt || ""}
                    readOnly
                    containerProps={{ className: "min-w-[40px]" }}
                  />
                  <Input
                    label="RW"
                    size="lg"
                    defaultValue={data?.rw || ""}
                    readOnly
                    containerProps={{ className: "min-w-[40px]" }}
                  />
                </div>
                <Input
                  label="Kode Pos"
                  size="lg"
                  defaultValue={data?.zipcode || ""}
                  readOnly
                />
              </div>
              <div className="grid grid-rows-3 gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <Input
                    label="Tempat"
                    size="lg"
                    defaultValue={data?.place || ""}
                    readOnly
                    containerProps={{ className: "min-w-[40px]" }}
                  />
                  <Input
                    label="Tanggal Lahir"
                    size="lg"
                    defaultValue={
                      data?.birthday
                        ? format(new Date(data.birthday), "dd MMMM yyyy", {
                            locale: id,
                          })
                        : ""
                    }
                    readOnly
                    containerProps={{ className: "min-w-[40px]" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <Input
                    label="Pekerjaan"
                    size="lg"
                    defaultValue={data?.job || ""}
                    readOnly
                    containerProps={{ className: "min-w-[40px]" }}
                  />
                  <Input
                    label="Pendidikan Terakhir"
                    size="lg"
                    defaultValue={data?.education || ""}
                    readOnly
                    containerProps={{ className: "min-w-[40px]" }}
                  />
                </div>
                <div className="relative flex w-full max-w-full">
                  <Button
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3 cursor-default"
                  >
                    <img
                      src={indonesia.flags.svg}
                      alt={indonesia.name}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    {indonesia.countryCallingCode}
                  </Button>
                  <Input
                    type="tel"
                    placeholder="Nomor HP Anda"
                    label="No HP"
                    containerProps={{
                      className: "min-w-0",
                    }}
                    defaultValue={data?.phoneNumber || ""}
                    name="phoneNumber"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Link to={`edit/${data?.id}`}>
                <Button
                  onClick={handleOpen}
                  color="deep-purple"
                  variant="gradient"
                  fullWidth
                >
                  Ubah
                </Button>
              </Link>
              <Link to="..">
                <Button variant="gradient" color="deep-purple" fullWidth>
                  Kembali
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
      <MyProfilEdit
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        data={data}
        mutate={mutate}
      />
    </div>
  );
};

export default MyProfil;
