import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import RegisterExam from "../pages/RegisterExam";
import AddDailyValues from "../pages/AddDailyValues";
import Settings from "../pages/Settings";
import Sidebar from "../components/Sidebar";

const AppRoutes = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-exam" element={<RegisterExam />} />
        <Route path="/add-daily-values" element={<AddDailyValues />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
