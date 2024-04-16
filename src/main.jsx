import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CardSection from "./Components/cardSection/CardSection";
import Footer from "./Components/footer/Footer";
import HeroSection from "./Components/heroBack/Background";
import HeroDetails from "./Components/heroSectionDetail/HeroDetails";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HeroSection>
      <HeroDetails />
    </HeroSection>
    <CardSection />
    <Footer />
  </React.StrictMode>
);
