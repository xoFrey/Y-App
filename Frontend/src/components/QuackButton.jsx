import { GiFeather } from "react-icons/gi";
import "./css/Quackbutton.css";
import { Link } from "react-router-dom";

const QuackButton = () => {
  return (
    <div className="createquack">
      <Link to="/createquack">
        <GiFeather />
      </Link>
    </div>
  );
};

export default QuackButton;
