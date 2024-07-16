import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import React, { useRef } from "react";

const opening = [
  {
    id: 1,
    days: "Senin :",
    hours: "08.00 - 16.00",
    status: true,
  },
  {
    id: 2,
    days: "Selasa :",
    hours: "08.00 - 16.00",
    status: true,
  },
  {
    id: 3,
    days: "Rabu :",
    hours: "08.00 - 16.00",
    status: true,
  },
  {
    id: 4,
    days: "Kamis :",
    hours: "08.00 - 16.00",
    status: true,
  },
  {
    id: 5,
    days: "Jumat :",
    hours: "08.00 - 16.00",
    status: true,
  },
  {
    id: 6,
    days: "Sabtu :",
    hours: "Tutup",
    status: false,
  },
  {
    id: 7,
    days: "Minggu :",
    hours: "Tutup",
    status: false,
  },
];

const MapSection = () => {
  const citeureupLatLng = [-6.9776, 107.6276];
  const kantorCiteureupLatLng = [-6.9844303088349085, 107.62299499193702];
  const mapRef = useRef();

  // ** Start Jam dan Hari Buka dan Tutup

  const currentTime = new Date();

  const openingTime = new Date();
  openingTime.setHours(8, 0, 0);

  const closeTime = new Date();
  closeTime.setHours(16, 0, 0);

  const day = new Date().getDay();
  const openingDay = [1, 2, 3, 4, 5];

  const isNotOpeningDay = !openingDay.includes(day);

  // ** End Jam dan Hari Buka dan Tutup

  const customIconMarker = new Icon({
    iconUrl: "/map/marker.png",
    iconSize: [48, 48],
  });

  const handleToCiteureup = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${citeureupLatLng[0]},${citeureupLatLng[1]}`
    );
  };

  const handleToKantorCiteureup = () => {
    window.open(
      `https://www.google.com/maps/place/Kantor+Desa+Citeureup/@-6.9845227,107.622996,21z/data=!4m14!1m7!3m6!1s0x2e68e9a0ca7ac705:0xed690c6d7d9ad9c6!2sKantor+Desa+Citeureup!8m2!3d-6.9844646!4d107.6229931!16s%2Fg%2F11bv3mn3wj!3m5!1s0x2e68e9a0ca7ac705:0xed690c6d7d9ad9c6!8m2!3d-6.9844646!4d107.6229931!16s%2Fg%2F11bv3mn3wj?entry=ttu`
    );
  };

  const handleResetView = () => {
    const map = mapRef.current;
    if (map) {
      map.setView(citeureupLatLng, map.getZoom());
    }
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <Typography
          variant="h2"
          className="text-2xl font-bold md:text-4xl md:leading-tight"
          color="gray"
        >
          Lokasi Desa Citeureup
        </Typography>
        <Typography variant="paragraph" color="gray" className="mt-1">
          Menyajikan peta wilayah Desa Citeureup
        </Typography>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 relative">
        <MapContainer
          center={citeureupLatLng}
          minZoom={15}
          zoom={15}
          maxZoom={17}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={citeureupLatLng} icon={customIconMarker}>
            <Popup>
              <button onClick={() => handleToCiteureup()}>
                Desa Citeureup
              </button>
            </Popup>
          </Marker>
          <Marker position={kantorCiteureupLatLng} icon={customIconMarker}>
            <Popup>
              <button onClick={() => handleToKantorCiteureup()}>
                Kantor Desa Citeureup
              </button>
            </Popup>
          </Marker>
          <button
            className="absolute top-5 right-5 z-[500] p-2 border-2 border-gray-500 font-semibold bg-white"
            onClick={handleResetView}
          >
            Citeureup
          </button>
        </MapContainer>
        <div>
          <Card className="w-full h-full flex-row">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
              <img
                src="src/assets/demografi/desa-citeureup.png"
                alt="card"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-2 uppercase">
                kantor desa citeureup
              </Typography>
              <Typography variant="small" color="gray" className="mb-2">
                Alamat : Jl. Raya Dayeuhkolot No.385, Citeureup, Kec.
                Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257.
              </Typography>
              <Typography variant="small" color="gray" className="mb-2">
                Telepon : (022) 5223443
              </Typography>
              <Typography
                as="div"
                variant="small"
                color="gray"
                className="flex gap-2"
              >
                Jam :{" "}
                <Typography as="div" variant="small">
                  {isNotOpeningDay ? (
                    <Typography variant="small" color="red">
                      Tutup
                    </Typography>
                  ) : (
                    <>
                      {currentTime.toLocaleTimeString("id-ID") >=
                        openingTime.toLocaleTimeString("id-ID") &&
                        currentTime.toLocaleTimeString("id-ID") <=
                          closeTime.toLocaleTimeString("id-ID") && (
                          <Typography variant="small" color="green">
                            Buka - Tutup pukul 16.00
                          </Typography>
                        )}
                      {currentTime.toLocaleTimeString("id-ID") <
                        openingTime.toLocaleTimeString("id-ID") && (
                        <Typography variant="small" color="red">
                          Tutup - Buka pukul 08.00
                        </Typography>
                      )}
                      {currentTime.toLocaleTimeString("id-ID") >
                        closeTime.toLocaleTimeString("id-ID") && (
                        <Typography variant="small" color="red">
                          Tutup - Buka pukul 08.00
                        </Typography>
                      )}
                    </>
                  )}
                </Typography>
              </Typography>
              <ul className="mt-2 space-y-1.5">
                {opening.map((open) => (
                  <li key={open.id} className="flex space-x-3">
                    {open.status ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        className="text-green-500"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 0 1-.944.12l-2.75-2.5a.625.625 0 0 1 .841-.925l2.208 2.007l3.849-5.886a.625.625 0 0 1 .865-.181"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        className="text-red-500"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}

                    <Typography variant="small" color="gray">
                      {open.days} {open.hours}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
