import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./css/Header.css";

const Header = () => {
    return <header>
        <Link to="/home">
            <FaArrowLeft />
        </Link>
        <div>
            <img src="/img/goose_white.png" alt="" />
        </div>
    </header>;

};

export default Header;