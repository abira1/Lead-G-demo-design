import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Industries from "./components/Industries";
import Pricing from "./components/Pricing";
import CaseStudies from "./components/CaseStudies";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import AppointmentBooking from "./components/AppointmentBooking";
import Admin from "./components/Admin";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";

// Home Page Component
const HomePage = () => (
  <>
    <Hero />
    <Services />
    <Industries />
    <Pricing />
    <CaseStudies />
    <FAQ />
  </>
);

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;