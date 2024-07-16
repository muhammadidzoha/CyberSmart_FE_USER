import {
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Dialog,
  List,
  ListItem,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import PDFFile from "../components/PDF/PDFFile";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { PDFDownloadLink } from "@react-pdf/renderer";

const LayananPengajuanLayout = () => {
  const [open, setOpen] = useState(1);
  const [openDialogKTP, setOpenDialogKTP] = useState(false);
  const [openDialogKelahiran, setOpenDialogKelahiran] = useState(false);
  const [openDialogKematian, setOpenDialogKematian] = useState(false);
  const [expire, setExpire] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [currentRoute, setCurrentRoute] = useState("Layanan Pengajuan");
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const mainPath = pathnames[0];

  const handleOpenDialogKTP = () => {
    reToken();
    setOpenDialogKTP(!openDialogKTP);
    setValues({
      letter_type: "Surat Pengantar Pembuatan KTP",
    });
  };

  const handleOpenDialogKelahiran = () => {
    reToken();
    setOpenDialogKelahiran(!openDialogKelahiran);
    setValues({
      letter_type: "Surat Pengantar Pembuatan Akta Kelahiran",
    });
  };

  const handleOpenDialogKematian = () => {
    reToken();
    setOpenDialogKematian(!openDialogKematian);
    setValues({
      letter_type: "Surat Pengantar Pembuatan Akta Kematian",
    });
  };

  const handleClose = () => {
    setOpenDialogKTP(false);
    setOpenDialogKelahiran(false);
    setOpenDialogKematian(false);
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
      console.error(error);
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

  const getUser = async () => {
    const response = await axios.get("http://localhost:5000/api/user", {
      withCredentials: true,
    });
    return response.data;
  };

  const onSubmit = async (values) => {
    const formDataToSend = new FormData();
    formDataToSend.append("letter_type", values.letter_type);
    formDataToSend.append("pdf_file", values.pdf_file);
    formDataToSend.append("file_pengantar", values.file_pengantar);
    formDataToSend.append("file_kk", values.file_kk);
    formDataToSend.append("file_akte", values.file_akte);
    formDataToSend.append("file_suratNikah", values.file_suratNikah);
    formDataToSend.append("file_KTPAyah", values.file_KTPAyah);
    formDataToSend.append("file_KTPIbu", values.file_KTPIbu);
    formDataToSend.append("file_KTPMeninggal", values.file_KTPMeninggal);
    formDataToSend.append("file_KTPPemohon", values.file_KTPPemohon);
    formDataToSend.append("file_suratKelahiran", values.file_suratKelahiran);
    formDataToSend.append("file_suratKematian", values.file_suratKematian);

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/letter/create",
        formDataToSend,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const successMessage = response.data.msg;

      const waitForToast = new Promise((resolve) => {
        toast.success(successMessage, {
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
      handleClose();
      await waitForToast;

      setValues({
        letter_type: "",
        pdf_file: null,
        file_pengantar: null,
        file_kk: null,
        file_akte: null,
        file_suratNikah: null,
        file_KTPAyah: null,
        file_KTPIbu: null,
        file_KTPMeninggal: null,
        file_KTPPemohon: null,
        file_suratKelahiran: null,
        file_suratKematian: null,
      });
    } catch (error) {
      handleClose();
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  const { values, handleBlur, handleSubmit, setFieldValue, setValues } =
    useFormik({
      initialValues: {
        letter_type: "",
        pdf_file: null,
        file_pengantar: null,
        file_kk: null,
        file_akte: null,
        file_suratNikah: null,
        file_KTPAyah: null,
        file_KTPIbu: null,
        file_KTPMeninggal: null,
        file_KTPPemohon: null,
        file_suratKelahiran: null,
        file_suratKematian: null,
      },
      onSubmit,
    });

  console.log(values);

  const { data: user } = useSWR("users", getUser);

  if (!user) return <div>Loading ...</div>;

  const handleFile = (e) => {
    const image = e.target.files[0];
    setFieldValue("pdf_file", image);
  };

  const handleFilePengantar = (e) => {
    const image = e.target.files[0];
    setFieldValue("file_pengantar", image);
  };

  const handleFileKK = (e) => {
    const image = e.target.files[0];
    setFieldValue("file_kk", image);
  };

  const handleFileAkte = (e) => {
    const image = e.target.files[0];
    setFieldValue("file_akte", image);
  };

  const handleFileAktaNikah = (e) => {
    const image = e.target.files[0];
    setFieldValue("file_suratNikah", image);
  };

  const handleFileKTPAyah = (e) => {
    const image = e.target.files[0];
    setFieldValue("file_KTPAyah", image);
  };

  const handleFileKTPIbu = (e) => {
    const image = e.target.files[0];
    setFieldValue("file_KTPIbu", image);
  };

  const handleFileSuratKelahiran = (e) => {
    const image = e.target.files[0];
    setFieldValue("file_suratKelahiran", image);
  };

  const handleFileSuratKematian = (e) => {
    const image = e.target.files[0];
    setFieldValue("file_suratKematian", image);
  };

  const handleFileKTPMeninggal = (e) => {
    const image = e.target.files[0];
    setFieldValue("file_KTPMeninggal", image);
  };

  const handleFileKTPPemohon = (e) => {
    const image = e.target.files[0];
    setFieldValue("file_KTPPemohon", image);
  };

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
            {mainPath}
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto relative">
        <div className="hidden 2xl:block absolute top-36 end-2 translate-x-10 -translate-y-10 z-50">
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
        <div className="hidden 2xl:block absolute bottom-16 start-0 translate-y-10 -translate-x-32">
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
        <div>
          <Typography>
            Silahkan Download Template Surat Sesuai Kebutuhan Anda:
            <div className="flex flex-col space-y-2 w-max my-5">
              <PDFDownloadLink
                document={
                  <PDFFile
                    nama={user.fullname}
                    nik={user.nik}
                    tanggalLahir={format(user.birthday, "dd MMMM yyyy", {
                      locale: id,
                    })}
                    jenisKelamin={user.gender}
                    pekerjaan={user.job}
                    agama={user.religion}
                    alamatSekarang={user.address}
                    tempat={user.place}
                    tujuan="Pembuatan KTP"
                  />
                }
                fileName={`Surat_Pengantar_Pembuatan_KTP_${user.fullname}`}
              >
                <Button variant="gradient" color="deep-purple">
                  Surat Pengantar Pembuatan KTP
                </Button>
              </PDFDownloadLink>

              <a
                href="/template/Template Surat Akta Kelahiran.pdf"
                download="Template Surat Akta Kelahiran.pdf"
              >
                <Button variant="gradient" color="deep-purple">
                  Surat Pengantar Pembuatan Akte Kelahiran
                </Button>
              </a>

              <a
                href="../../public/template/Template Surat Akta Kematian.pdf"
                download="Template Surat Akta Kematian.pdf"
              >
                <Button variant="gradient" color="deep-purple">
                  Surat Pengantar Pembuatan Akte Kematian
                </Button>
              </a>
            </div>
          </Typography>
        </div>
        <div className="max-w-[85rem] mx-auto text-center mb-10 lg:mb-14">
          <Typography
            variant="h2"
            className="text-2xl font-bold md:text-4xl md:leading-tight"
            color="gray"
          >
            <Tabs value="Surat Pengantar Pembuatan KTP">
              <TabsHeader>
                <Tab value="Surat Pengantar Pembuatan KTP">
                  Surat Pengantar Pembuatan KTP
                </Tab>
                <Tab value="Surat Pengantar Pembuatan Akte Kelahiran">
                  Surat Pengantar Pembuatan Akte Kelahiran
                </Tab>
                <Tab value="Surat Pengantar Pembuatan Akte Kematian">
                  Surat Pengantar Pembuatan Akte Kematian
                </Tab>
              </TabsHeader>
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                <TabPanel value="Surat Pengantar Pembuatan KTP">
                  <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                    <Typography
                      variant="h2"
                      className="text-2xl font-bold md:text-4xl md:leading-tight"
                      color="gray"
                    >
                      Persyaratan
                    </Typography>
                    <Typography
                      variant="paragraph"
                      color="gray"
                      className="mt-1"
                    >
                      Informasi persyaratan untuk surat pengantar pembuatan KTP
                    </Typography>
                  </div>
                  <List>
                    <ListItem ripple={false} className="cursor-default">
                      1. Berusia 17 Tahun.
                    </ListItem>
                    <ListItem ripple={false} className="cursor-default">
                      2. Scan Surat Pengantar Dari Pihak Rukun Tetangga (RT) Dan
                      Rukun Warga (RW).
                    </ListItem>
                    <ListItem ripple={false} className="cursor-default">
                      3. Scan Kartu Keluarga (KK) Yang Masih Berlaku.
                    </ListItem>
                    <ListItem ripple={false} className="cursor-default">
                      4. Scan Akte Kelahiran.
                    </ListItem>
                  </List>

                  <div>
                    <Typography variant="small" color="gray">
                      Catatan: Pada Pengajuan Surat Pengantar Pembuatan KTP
                      pengguna akun di anggap sebagai pemohon
                    </Typography>
                  </div>
                  <div className="flex justify-center mt-10">
                    <Button
                      variant="gradient"
                      color="deep-purple"
                      onClick={handleOpenDialogKTP}
                    >
                      Ajukan Sekarang
                    </Button>
                  </div>
                </TabPanel>
                <TabPanel value="Surat Pengantar Pembuatan Akte Kelahiran">
                  <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                    <Typography
                      variant="h2"
                      className="text-2xl font-bold md:text-4xl md:leading-tight"
                      color="gray"
                    >
                      Persyaratan
                    </Typography>
                    <Typography
                      variant="paragraph"
                      color="gray"
                      className="mt-1"
                    >
                      Informasi persyaratan untuk surat pengantar pembuatan Akte
                      Kelahiran
                    </Typography>
                  </div>
                  <List>
                    <ListItem ripple={false} className="cursor-default">
                      1. Scan Surat Pengantar Dari Pihak Rukun Tetangga (RT) Dan
                      Rukun Warga (RW).
                    </ListItem>
                    <ListItem ripple={false} className="cursor-default">
                      2. Scan Surat Kelahiran dari Bidan/Rumah Sakit.
                    </ListItem>
                    <ListItem ripple={false} className="cursor-default">
                      3. Scan Akta Nikah.
                    </ListItem>
                    <ListItem ripple={false} className="cursor-default">
                      4. Scan KTP Orangtua.
                    </ListItem>
                    <ListItem ripple={false} className="cursor-default">
                      5. Scan Kartu Keluarga.
                    </ListItem>
                  </List>
                  <div className="flex justify-center mt-10">
                    <Button
                      variant="gradient"
                      color="deep-purple"
                      onClick={handleOpenDialogKelahiran}
                    >
                      Ajukan Sekarang
                    </Button>
                  </div>
                </TabPanel>
                <TabPanel value="Surat Pengantar Pembuatan Akte Kematian">
                  <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                    <Typography
                      variant="h2"
                      className="text-2xl font-bold md:text-4xl md:leading-tight"
                      color="gray"
                    >
                      Persyaratan
                    </Typography>
                    <Typography
                      variant="paragraph"
                      color="gray"
                      className="mt-1"
                    >
                      Informasi persyaratan untuk pembuatan Akte Kematian
                    </Typography>
                  </div>
                  <List>
                    <ListItem ripple={false} className="cursor-default">
                      1. Scan Surat Pengantar Dari Pihak Rukun Tetangga (RT) Dan
                      Rukun Warga (RW).
                    </ListItem>
                    <ListItem ripple={false} className="cursor-default">
                      2. Scan KTP Asli Yang Meninggal
                    </ListItem>
                    <ListItem ripple={false} className="cursor-default">
                      3. Scan KK Dimana Yang Meninggal Terdaftar
                    </ListItem>
                    <ListItem ripple={false} className="cursor-default">
                      4. Scan Surat Keterangan Kematian dari Dokter/Rumah
                      Sakit/Kepolisian
                    </ListItem>
                    <ListItem ripple={false} className="cursor-default">
                      4. Scan KTP Pelapor/Pemohon
                    </ListItem>
                  </List>
                  <div className="flex justify-center mt-10">
                    <Button
                      variant="gradient"
                      color="deep-purple"
                      onClick={handleOpenDialogKematian}
                    >
                      Ajukan Sekarang
                    </Button>
                  </div>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </Typography>
        </div>
        <Dialog
          open={openDialogKTP}
          handler={handleOpenDialogKTP}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[30rem]">
            <CardBody>
              <Typography variant="h4" color="blue-gray">
                Buat Pengajuan
              </Typography>
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-4"
              >
                <div>
                  <label htmlFor="pdf_file">
                    <Typography variant="small" color="gray">
                      Berkas Template Surat Pengantar Pembuatan KTP (PDF):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="pdf_file"
                    id="pdf_file"
                    onChange={handleFile}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="file_pengantar">
                    <Typography variant="small" color="gray">
                      Scan Surat Pengantar (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_pengantar"
                    id="file_pengantar"
                    onChange={handleFilePengantar}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="file_kk">
                    <Typography variant="small" color="gray">
                      Scan KK (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_kk"
                    id="file_kk"
                    onChange={handleFileKK}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="file_akte">
                    <Typography variant="small" color="gray">
                      Scan Akte Kelahiran (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_akte"
                    id="file_akte"
                    onChange={handleFileAkte}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <Button
                  loading={isLoading}
                  className="flex justify-center"
                  type="submit"
                  variant="gradient"
                  color="deep-purple"
                  fullWidth
                >
                  Ajukan
                </Button>
              </form>
            </CardBody>
          </Card>
        </Dialog>
        <Dialog
          open={openDialogKelahiran}
          handler={handleOpenDialogKelahiran}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[30rem]">
            <CardBody>
              <Typography variant="h4" color="blue-gray">
                Buat Pengajuan
              </Typography>
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-4"
              >
                <div>
                  <label htmlFor="pdf_file">
                    <Typography variant="small" color="gray">
                      Berkas Template Surat Pengantar Pembuatan Akte Kelahiran
                      (PDF):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="pdf_file"
                    id="pdf_file"
                    onChange={handleFile}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="file_pengantar">
                    <Typography variant="small" color="gray">
                      Scan Surat Pengantar (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_pengantar"
                    id="file_pengantar"
                    onChange={handleFilePengantar}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="file_suratKelahiran">
                    <Typography variant="small" color="gray">
                      Scan Surat Kelahiran (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_suratKelahiran"
                    id="file_suratKelahiran"
                    onChange={handleFileSuratKelahiran}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="file_suratNikah">
                    <Typography variant="small" color="gray">
                      Scan Akta Nikah:
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_suratNikah"
                    id="file_suratNikah"
                    onChange={handleFileAktaNikah}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="file_KTPIbu">
                    <Typography variant="small" color="gray">
                      Scan KTP Ibu (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_KTPIbu"
                    id="file_KTPIbu"
                    onChange={handleFileKTPIbu}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="file_KTPAyah">
                    <Typography variant="small" color="gray">
                      Scan KTP Ayah (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_KTPAyah"
                    id="file_KTPAyah"
                    onChange={handleFileKTPAyah}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="file_kk">
                    <Typography variant="small" color="gray">
                      Scan KK (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_kk"
                    id="file_kk"
                    onChange={handleFileKK}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <Button
                  loading={isLoading}
                  className="flex justify-center"
                  type="submit"
                  variant="gradient"
                  color="deep-purple"
                  fullWidth
                >
                  Ajukan
                </Button>
              </form>
            </CardBody>
          </Card>
        </Dialog>
        <Dialog
          open={openDialogKematian}
          handler={handleOpenDialogKematian}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[30rem]">
            <CardBody>
              <Typography variant="h4" color="blue-gray">
                Buat Pengajuan
              </Typography>
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-4"
              >
                <div>
                  <label htmlFor="pdf_file">
                    <Typography variant="small" color="gray">
                      Berkas Template Surat Pengantar Pembuatan Akte Kematian
                      (PDF):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="pdf_file"
                    id="pdf_file"
                    onChange={handleFile}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="pengantar">
                    <Typography variant="small" color="gray">
                      Scan Surat Pengantar (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_pengantar"
                    id="file_pengantar"
                    onChange={handleFilePengantar}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="file_KTPMeninggal">
                    <Typography variant="small" color="gray">
                      Scan KTP Yang Meninggal (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_KTPMeninggal"
                    id="file_KTPMeninggal"
                    onChange={handleFileKTPMeninggal}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="kk">
                    <Typography variant="small" color="gray">
                      Scan KK (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_kk"
                    id="file_kk"
                    onChange={handleFileKK}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="file_suratKematian">
                    <Typography variant="small" color="gray">
                      Scan Surat Kematian (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_suratKematian"
                    id="file_suratKematian"
                    onChange={handleFileSuratKematian}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <div>
                  <label htmlFor="file_KTPPemohon">
                    <Typography variant="small" color="gray">
                      Scan KTP Pemohon (JPG/PNG/JPEG):
                    </Typography>
                  </label>
                  <input
                    type="file"
                    name="file_KTPPemohon"
                    id="file_KTPPemohon"
                    onChange={handleFileKTPPemohon}
                    onBlur={handleBlur}
                    className="border border-gray-400 rounded-md p-1"
                  />
                </div>
                <Button
                  loading={isLoading}
                  className="flex justify-center"
                  type="submit"
                  variant="gradient"
                  color="deep-purple"
                  fullWidth
                >
                  Ajukan
                </Button>
              </form>
            </CardBody>
          </Card>
        </Dialog>
      </div>
    </div>
  );
};

export default LayananPengajuanLayout;
