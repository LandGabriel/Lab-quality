import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaListAlt,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={toggleSidebar}>
                <FaHome />
              </Link>
            </li>
            <li>
              <Link to="/register-exam" onClick={toggleSidebar}>
                <FaPlus />
              </Link>
            </li>
            <li>
              <Link to="/add-daily-values" onClick={toggleSidebar}>
                <FaListAlt />
              </Link>
            </li>
            <li>
              <Link to="/settings" onClick={toggleSidebar}>
                <FaCog />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="hamburger" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </>
  );
};

export default Sidebar;
