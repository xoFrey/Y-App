import { GiFeather } from "react-icons/gi";
import "./css/Quackbutton.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";


const QuackButton = () => {

  return (
    <Link to="/createquack">
      <div className="createquack">
        <div className="plussign">
          <FaPlus />
        </div>
        <div className="feather">
          <GiFeather />
        </div>
      </div>
    </Link>
  );
};

export default QuackButton;
