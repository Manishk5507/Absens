import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReportPage from "./Components/Report/ReportMissing.jsx";
import RulesPage from "./Components/Rules/RulesPage.jsx";
import Register from "./Components/Register/Register.jsx";
import Cases from "./Components/Cases/Cases.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import FindMissing from "./Components/Find/FindMissing.jsx";
import Error404 from "./components/Error404.jsx";
import About from "./components/LandingPage/About.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/report-the-missing" element={<ReportPage />} />
        <Route path="/find-the-missing" element={<FindMissing />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
