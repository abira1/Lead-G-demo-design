import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Industries from "./components/Industries";
import Pricing from "./components/Pricing";
import CaseStudies from "./components/CaseStudies";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Hero />
          <Services />
          <Industries />
          <Pricing />
          <CaseStudies />
          <FAQ />
        </main>
        <Footer />
        <Routes>
          <Route path="/" element={<></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;