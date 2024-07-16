import { Routes, Route, useLocation } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProfilLayout from "./layouts/ProfilLayout";
import AuthLayout from "./layouts/AuthLayout";
import DataWilayahLayout from "./layouts/DataWilayahLayout";
import DataStatistikLayout from "./layouts/DataStatistikLayout";
import InformasiLayout from "./layouts/InformasiLayout";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect, useState } from "react";
import MyProfilLayout from "./layouts/MyProfilLayout";
import DrawerProfil from "./components/Drawer/DrawerProfil";
import axios from "axios";
import useSWR from "swr";
import MyProfilEdit from "./views/MyProfil/MyProfilEdit";
import KeuanganLayout from "./layouts/KeuanganLayout";
import LayananPengajuanLayout from "./layouts/LayananPengajuanLayout";
import NotFound from "./components/NotFound";
import TrackPengajuan from "./views/TrackPengajuan/TrackPengajuan";
import BeritaDetail from "./views/Informasi/BeritaDetail";
import DestinationDetail from "./views/Informasi/DestinationDetail";
import PrivateRouteLayanan from "./routes/PrivateRouteLayanan";
import { toast } from "react-toastify";

function App() {
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const isLoggedIn = window.sessionStorage.getItem("isLoggedIn") === "true";

  const isAuthPage = location.pathname.startsWith("/auth/");

  const isMyProfilePage =
    location.pathname.includes("/profil-saya") ||
    location.pathname.includes("/profil-saya/edit/");

  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/api/user", {
      withCredentials: true,
    });
    return response.data;
  };

  const { data } = useSWR("users", fetcher);

  useEffect(() => {
    // Pengecekan apakah user sudah login dan data belum lengkap
    if (isLoggedIn && data && data.isProfileComplete === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    if (data) {
      const bd = new Date(data.birthday);
      const today = new Date();
      const ageDiff = today.getFullYear() - bd.getFullYear();

      if (ageDiff == 17) {
        const hasKTPRequest = data.letterrequests.some(
          (request) => request.letter_type === "Surat Pengantar Pembuatan KTP"
        );

        if (!hasKTPRequest) {
          toast.info("Umur anda sudah memenuhi untuk membuat KTP", {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
        }
      }
    }
  }, [isLoggedIn, data]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <DrawerProfil open={open} setOpen={setOpen} userProfil={data} />
      <div>
        {!isAuthPage && !isMyProfilePage && <Header />}
        <Routes>
          <Route path="/" element={<RootLayout />} />
          <Route path="profil" element={<ProfilLayout />} />
          <Route path="transparansi" element={<KeuanganLayout />} />
          <Route path="data-wilayah" element={<DataWilayahLayout />} />
          <Route path="data-statistik/*" element={<DataStatistikLayout />} />
          <Route path="informasi/*" element={<InformasiLayout />} />
          <Route path="informasi/berita/:id" element={<BeritaDetail />} />
          <Route
            path="informasi/potensi-desa/:id"
            element={<DestinationDetail />}
          />
          <Route
            path="layanan-pengajuan"
            element={
              <PrivateRouteLayanan>
                <LayananPengajuanLayout />
              </PrivateRouteLayanan>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="auth/*"
            element={
              <PrivateRoute>
                <AuthLayout />
              </PrivateRoute>
            }
          />
          <Route path="profil-saya" element={<MyProfilLayout />}>
            <Route index path="edit/:idUser" element={<MyProfilEdit />} />
          </Route>
          <Route path="track-pengajuan" element={<TrackPengajuan />} />
        </Routes>
      </div>
      {!isAuthPage && !isMyProfilePage && <Footer />}
    </div>
  );
}

export default App;
