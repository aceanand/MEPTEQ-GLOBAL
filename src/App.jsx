import React, { useState, useEffect } from "react";

import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
//import "./App.css";
import { HVAC } from "./components/HVAC";
import { Elv } from "./components/Elv";
import { Plumber } from "./components/Plumber";
import Contact from "./components/contact";
import Footer from "./components/Footer";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />

      <Gallery data={landingPageData.Gallery} />
      <HVAC data={landingPageData.HVAC} />
      <Plumber data={landingPageData.Plumber} />
      <Elv data={landingPageData.Elv} />
      <Testimonials data={landingPageData.Testimonials} />

      <Contact data={landingPageData.Contact} />
      
      <Footer data={landingPageData.Footer} />
    </div>
  );
};

export default App;
