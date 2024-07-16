import React from "react";
import HeroSection from "../views/Beranda/HeroSection";
import FeatureSection from "../views/Beranda/FeatureSection";
import NewsSection from "../views/Beranda/NewsSection";
import MapSection from "../views/Beranda/MapSection";
import DestinationSection from "../views/Beranda/DestinationSection";

const RootLayout = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <NewsSection />
      <MapSection />
      <DestinationSection />
    </div>
  );
};

export default RootLayout;
