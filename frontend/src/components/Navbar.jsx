import "../scss/Navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (to) => {
    if (to === "tasks") {
      navigate("tasks");
    } else if (to === "register") {
      navigate("tasks/new");
    }
  };

  return (
    <div className="navbar gradient__bg">
      <ul className="nav-links">
        <li className="nav-item" onClick={() => handleNavigation("tasks")}>
          Tasks List
        </li>
        <li className="nav-item" onClick={() => handleNavigation("register")}>
          Add Task
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
