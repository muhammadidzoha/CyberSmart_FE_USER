import ForgotPassword from "../views/Auth/ForgotPassword";
import ResetPassword from "../views/Auth/ResetPassword";
import SignIn from "../views/Auth/SignIn";
import Signup from "../views/Auth/Signup";
import VerifyOTP from "../views/Auth/VerifyOTP";
import Umur from "../views/DataStatistik/Umur";
import Pendidikan from "../views/DataStatistik/Pendidikan";
import Pekerjaan from "../views/DataStatistik/Pekerjaan";
import Agama from "../views/DataStatistik/Agama";
import JenisKelamin from "../views/DataStatistik/JenisKelamin";
import Berita from "../views/Informasi/Berita";
import Pengumuman from "../views/Informasi/Pengumuman";
import Destination from "../views/Informasi/Destination";

const routes = [
  {
    name: "Masuk",
    layout: "/auth",
    path: "masuk",
    component: <SignIn />,
    isProtected: false,
  },
  {
    name: "Daftar",
    layout: "/auth",
    path: "daftar",
    component: <Signup />,
    isProtected: false,
  },
  {
    name: "Lupa Password",
    layout: "/auth",
    path: "lupa-password",
    component: <ForgotPassword />,
    isProtected: false,
  },
  {
    name: "OTP",
    layout: "/auth",
    path: "lupa-password/otp",
    component: <VerifyOTP />,
    isProtected: true,
  },
  {
    name: "Reset Password",
    layout: "/auth",
    path: "reset-password",
    component: <ResetPassword />,
    isProtected: true,
  },
  {
    name: "Umur",
    layout: "/data-statistik",
    path: "umur",
    component: <Umur />,
  },
  {
    name: "Pendidikan",
    layout: "/data-statistik",
    path: "pendidikan",
    component: <Pendidikan />,
  },
  {
    name: "Pekerjaan",
    layout: "/data-statistik",
    path: "pekerjaan",
    component: <Pekerjaan />,
  },
  {
    name: "Agama",
    layout: "/data-statistik",
    path: "agama",
    component: <Agama />,
  },

  {
    name: "Jenis Kelamin",
    layout: "/data-statistik",
    path: "jenis-kelamin",
    component: <JenisKelamin />,
  },
  {
    name: "Berita",
    layout: "/informasi",
    path: "berita",
    component: <Berita />,
  },
  {
    name: "Pengumuman",
    layout: "/informasi",
    path: "pengumuman",
    component: <Pengumuman />,
  },
  {
    name: "Potensi Desa",
    layout: "/informasi",
    path: "potensi-desa",
    component: <Destination />,
  },
];

export default routes;
