import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReportPage from "./components/Report/ReportMissing.jsx";
import Guidelines from "./Components/Guidelines/Guidelines.jsx";
import Register from "./Components/Register/Register.jsx";
import Cases from "./components/Cases/Cases.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import FindMissing from "./Components/Find/FindMissing.jsx";
import Error404 from "./components/Error404.jsx";
import About from "./Components/LandingPage/About.jsx";
import Profile from "./Components/Register/Profile.jsx";
import Login from "./components/Register/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import Showdetails from "./components/Cases/Showdetails.jsx";
import FindingCases from "./components/Cases/FindingCases/FindingCases.jsx";
import ReportedCases from "./components/Cases/ReportedCases/ReportedCases.jsx";
import UserReportedCases from "./components/Cases/ReportedCases/UserReportedCases.jsx";
import UserFindingCases from "./components/Cases/FindingCases/UserFindingCases.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/report-the-missing" element={<ReportPage />} />
          <Route path="/find-the-missing" element={<FindMissing />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/showDetails" element={<Showdetails />} />
          <Route path="/cases/reportedCases" element={<ReportedCases />} />
          <Route path="/cases/findingCases" element={<FindingCases />} />
          <Route path="/cases/userReportedCases" element={<UserReportedCases />} />
          <Route path="/cases/userFindingCases" element={<UserFindingCases />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
