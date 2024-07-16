import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { id } from "date-fns/locale";
import axios from "axios";
import { useCountries } from "use-react-countries";

const MyProfilEdit = ({ open, setOpen, handleOpen, data, mutate }) => {
  const navigate = useNavigate();
  const { idUser } = useParams();

  const { countries } = useCountries();
  const indonesia = countries.find((country) => country.name === "Indonesia");

  const handleClose = () => {
    setOpen(false);
    navigate(".");
  };

  const onSubmit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/updateprofil/${idUser}`,
        {
          ...values,
          zipcode: parseInt(values.zipcode),
          birthday: values.birthday.startDate,
          phoneNumber: values.phoneNumber
            ? values.phoneNumber
            : data.phoneNumber,
        },
        {
          withCredentials: true,
        }
      );

      const successMessage = response.data.msg;

      toast.success(successMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      mutate("users", response.data, false);
      setOpen(false);
    } catch (error) {
      setOpen(false);
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const { values, setValues, handleChange, handleBlur } = useFormik({
    initialValues: {
      fullname: data?.fullname || "",
      nik: data?.nik || "",
      gender: data?.gender || "",
      address: data?.address || "",
      zipcode: data?.zipcode || "",
      village: data?.village || "",
      rt: data?.rt || "",
      rw: data?.rw || "",
      birthday: {
        startDate: data?.birthday || "",
      },
      religion: data?.religion || "",
      job: data?.job || "",
      education: data?.education || "",
      place: data?.place || "",
      phoneNumber: data?.phoneNumber || "",
    },
    onSubmit,
  });

  console.log(values);

  useEffect(() => {
    // Set formulir hanya jika data tersedia
    if (data) {
      setValues({
        fullname: data.fullname || "",
        nik: data.nik || "",
        gender: data.gender || "",
        address: data.address || "",
        zipcode: data.zipcode || "",
        village: data.village || "",
        rt: data.rt || "",
        rw: data.rw || "",
        birthday: {
          startDate: data.birthday || "",
        },
        religion: data.religion || "",
        job: data.job || "",
        education: data.education || "",
        place: data.place || "",
        phoneNumber: data.phoneNumber || "",
      });
    }
  }, [data, setValues]);

  console.log(values);

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      dismiss={{
        outsidePress: false,
      }}
    >
      <DialogHeader>Edit Profil</DialogHeader>
      <DialogBody>
        <div className="flex flex-col space-y-5">
          <div className="grid grid-cols-3 gap-5">
            <Input
              label="Nama Lengkap"
              size="lg"
              defaultValue={values.fullname}
              readOnly
              containerProps={{ className: "min-w-[40px]" }}
            />
            <Input
              label="NIK"
              size="lg"
              defaultValue={values.nik}
              readOnly
              containerProps={{ className: "min-w-[40px]" }}
            />
            <Select
              size="lg"
              label="Jenis Kelamin"
              value={values.gender}
              onChange={(selectedValue) => {
                handleChange("gender")(selectedValue);
              }}
              onBlur={handleBlur}
              containerProps={{ className: "min-w-[40px]" }}
            >
              <Option value="perempuan">Perempuan</Option>
              <Option value="laki-laki">Laki-Laki</Option>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="grid gap-5">
              <Textarea
                label="Alamat Lengkap"
                size="lg"
                defaultValue={values.address}
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Kode Pos"
                size="lg"
                name="zipcode"
                defaultValue={values.zipcode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="grid grid-rows-3 gap-5">
              <Select
                label="Dusun"
                size="lg"
                name="village"
                value={values.village}
                onChange={(selectedValue) => {
                  handleChange("village")(selectedValue);
                }}
                onBlur={handleBlur}
              >
                <Option value="dusun 1">Dusun 1</Option>
                <Option value="dusun 2">Dusun 2</Option>
                <Option value="dusun 3">Dusun 3</Option>
              </Select>
              <div className="grid grid-cols-2 gap-5">
                <Select
                  label="Rt"
                  size="lg"
                  name="rt"
                  value={values.rt}
                  onChange={(selectedValue) => {
                    handleChange("rt")(selectedValue);
                  }}
                  onBlur={handleBlur}
                  containerProps={{ className: "min-w-[40px]" }}
                >
                  <Option value="rt 01">Rt 01</Option>
                  <Option value="rt 02">Rt 02</Option>
                  <Option value="rt 03">Rt 03</Option>
                  <Option value="rt 04">Rt 04</Option>
                  <Option value="rt 05">Rt 05</Option>
                </Select>
                <Select
                  label="Rw"
                  size="lg"
                  name="rw"
                  value={values.rw}
                  onChange={(selectedValue) => {
                    handleChange("rw")(selectedValue);
                  }}
                  onBlur={handleBlur}
                  containerProps={{ className: "min-w-[40px]" }}
                >
                  <Option value="rw 01">Rw 01</Option>
                  <Option value="rw 02">Rw 02</Option>
                  <Option value="rw 03">Rw 03</Option>
                  <Option value="rw 04">Rw 04</Option>
                  <Option value="rw 05">Rw 05</Option>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Input
                  label="Tempat"
                  size="lg"
                  defaultValue={values.place || ""}
                  containerProps={{ className: "min-w-[40px]" }}
                  readOnly
                />
                <Input
                  label="Tanggal Lahir"
                  size="lg"
                  defaultValue={
                    values.birthday.startDate
                      ? format(
                          new Date(values.birthday.startDate),
                          "dd MMMM yyyy",
                          {
                            locale: id,
                          }
                        )
                      : ""
                  }
                  containerProps={{ className: "min-w-[40px]" }}
                  readOnly
                />
              </div>
            </div>

            <Select
              label="Agama"
              size="lg"
              name="religion"
              value={values.religion}
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
            <Select
              label="Pekerjaan"
              size="lg"
              name="job"
              value={values.job}
              onChange={(selectedValue) => {
                handleChange("job")(selectedValue);
              }}
              onBlur={handleBlur}
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
            <Select
              label="Pendidikan Terakhir"
              size="lg"
              name="education"
              value={values.education}
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
                defaultValue={data?.phoneNumber || ""}
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="mr-1"
        >
          <span>Kembali</span>
        </Button>
        <Button variant="gradient" color="green" onClick={onSubmit}>
          <span>Perbarui</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

MyProfilEdit.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleOpen: PropTypes.func,
  data: PropTypes.object,
  mutate: PropTypes.func,
};

export default MyProfilEdit;
