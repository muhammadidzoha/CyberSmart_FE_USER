import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  Drawer,
  Typography,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import Datepicker from "react-tailwindcss-datepicker";
import { useFormik } from "formik";
import axios from "axios";
import { useCountries } from "use-react-countries";

const DrawerProfil = ({ open, setOpen }) => {
  const { countries } = useCountries();
  const indonesia = countries.find((country) => country.name === "Indonesia");

  const onSubmit = async () => {
    try {
      await axios.patch("http://localhost:5000/api/updateUser", data, {
        withCredentials: true,
      });
      toast.success("Berhasil dilengkapi", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const { values, handleChange, handleBlur, setFieldValue } = useFormik({
    initialValues: {
      fullname: window.sessionStorage.getItem("fullname") || "",
      nik: 0,
      phoneNumber: 0,
      gender: "",
      address: "",
      village: "",
      zipcode: 0,
      rt: "",
      rw: "",
      place: "",
      birthday: {
        startDate: null,
      },
      job: "",
      education: "",
      religion: "",
    },
    onSubmit,
  });

  console.log(values);

  const data = {
    ...values,
    nik: parseInt(values.nik),
    phoneNumber: values.phoneNumber,
    zipcode: parseInt(values.zipcode),
    birthday: values.birthday.startDate,
  };

  useEffect(() => {
    if (open) {
      toast.info("Lengkapi profil anda terlebih dahulu", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  }, [open]);

  const handleDateSelect = (selectedDate) => {
    const formattedDate = selectedDate;
    setFieldValue("birthday", formattedDate);
  };

  return (
    <Drawer
      size={420}
      open={open}
      placement="right"
      className="p-4"
      overlayProps={{
        className: "h-screen fixed",
      }}
      dismiss={{
        outsidePress: false,
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          Profil Saya
        </Typography>
      </div>
      <Card shadow={false} className="w-96 mt-1">
        <CardBody className="flex flex-col gap-4 !p-0">
          <Input
            label="Nama Lengkap"
            size="md"
            className="text-xs"
            containerProps={{ className: "min-w-[40px]" }}
            value={values.fullname}
            readOnly
          />
          <Input
            label="NIK"
            size="md"
            className="text-xs"
            containerProps={{ className: "min-w-[40px]" }}
            value={values.nik}
            onChange={handleChange}
            onBlur={handleBlur}
            name="nik"
            maxLength={16}
          />
          <Select
            label="Jenis Kelamin"
            size="md"
            name="gender"
            onChange={(selectedValue) => {
              handleChange("gender")(selectedValue);
            }}
            onBlur={handleBlur}
            value={values.gender}
          >
            <Option value="perempuan">Perempuan</Option>
            <Option value="laki-laki">Laki-Laki</Option>
          </Select>
          <Textarea
            label="Alamat Lengkap"
            size="md"
            className="text-xs"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            name="address"
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Dusun"
              size="md"
              name="village"
              onChange={(selectedValue) => {
                handleChange("village")(selectedValue);
              }}
              containerProps={{ className: "min-w-[40px]" }}
              onBlur={handleBlur}
              value={values.village}
            >
              <Option value="dusun 1">Dusun 1</Option>
              <Option value="dusun 2">Dusun 2</Option>
              <Option value="dusun 3">Dusun 3</Option>
            </Select>
            <Input
              label="Kode Pos"
              size="md"
              className="text-xs"
              containerProps={{ className: "min-w-[40px]" }}
              value={values.zipcode}
              name="zipcode"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Rt"
              size="md"
              name="rt"
              onChange={(selectedValue) => {
                handleChange("rt")(selectedValue);
              }}
              containerProps={{ className: "min-w-[40px]" }}
              onBlur={handleBlur}
              value={values.rt}
            >
              <Option value="rt 01">Rt 01</Option>
              <Option value="rt 02">Rt 02</Option>
              <Option value="rt 03">Rt 03</Option>
              <Option value="rt 04">Rt 04</Option>
              <Option value="rt 05">Rt 05</Option>
            </Select>
            <Select
              label="Rw"
              size="md"
              name="rw"
              containerProps={{ className: "min-w-[40px]" }}
              onChange={(selectedValue) => {
                handleChange("rw")(selectedValue);
              }}
              onBlur={handleBlur}
              value={String(values.rw)}
            >
              <Option value="rw 01">Rw 01</Option>
              <Option value="rw 02">Rw 02</Option>
              <Option value="rw 03">Rw 03</Option>
              <Option value="rw 04">Rw 04</Option>
              <Option value="rw 05">Rw 05</Option>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Tempat Lahir"
              size="md"
              className="text-xs"
              containerProps={{ className: "min-w-[40px]" }}
              value={values.place}
              name="place"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Datepicker
              inputName="birthday"
              containerClassName="relative border border-blue-gray-200 rounded-[7px] transition-all"
              inputClassName="relative transition-all duration-300 py-2.5 pl-3 pr-14 w-full border-blue-gray-200 rounded-md font-normal text-sm text-blue-gray-700 placeholder-blue-gray-700 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-0"
              i18n="id"
              useRange={false}
              asSingle={true}
              value={values.birthday}
              placeholder="Tanggal Lahir"
              toggleClassName="absolute right-0 h-full px-2 text-blue-gray-500 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
              onChange={handleDateSelect}
              displayFormat="DD MMMM YYYY"
            />
          </div>
          <div className="relative flex w-full max-w-[24rem]">
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
              value={values.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <Select
            label="Pekerjaan"
            size="md"
            name="job"
            onChange={(selectedValue) => {
              handleChange("job")(selectedValue);
            }}
            onBlur={handleBlur}
            value={values.job}
          >
            <Option value="pns">PNS</Option>
            <Option value="tni/polri">TNI / POLRI</Option>
            <Option value="pensiunan">Pensiunan</Option>
            <Option value="karyawan swasta ">Karyawan Swasta </Option>
            <Option value="wiraswasta">Wiraswasta</Option>
            <Option value="buruh tani">Buruh Tani</Option>
            <Option value="guru/dosen">Guru / Dosen</Option>
            <Option value="mahasiswa/i">Mahasiswa / i</Option>
          </Select>
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Pendidikan Terakhir"
              size="md"
              value={values.education}
              containerProps={{ className: "min-w-[40px]" }}
              name="education"
              onChange={(selectedValue) => {
                handleChange("education")(selectedValue);
              }}
              onBlur={handleBlur}
            >
              <Option value="tk">TK</Option>
              <Option value="sd">SD</Option>
              <Option value="smp">SMP</Option>
              <Option value="sma">SMA</Option>
              <Option value="d3">D3</Option>
              <Option value="s1">S1</Option>
              <Option value="s2">S2</Option>
              <Option value="s3">S3</Option>
            </Select>
            <Select
              label="Agama"
              size="md"
              value={values.religion}
              containerProps={{ className: "min-w-[40px]" }}
              name="religion"
              onChange={(selectedValue) => {
                handleChange("religion")(selectedValue);
              }}
              onBlur={handleBlur}
            >
              <Option value="islam">Islam</Option>
              <Option value="protestan">Protestan</Option>
              <Option value="katolik">Katolik</Option>
              <Option value="hindu">Hindu</Option>
              <Option value="budha">Budha</Option>
              <Option value="khonghucu">Khonghucu</Option>
            </Select>
          </div>
        </CardBody>
        <CardFooter className="!p-0 !pt-5">
          <Button onClick={onSubmit} variant="gradient" fullWidth>
            Perbarui
          </Button>
        </CardFooter>
      </Card>
    </Drawer>
  );
};

DrawerProfil.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default DrawerProfil;
