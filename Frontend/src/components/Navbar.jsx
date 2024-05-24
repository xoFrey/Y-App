import { Link } from "react-router-dom";
import { BiSolidHomeCircle } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { FaRegEnvelope } from "react-icons/fa";

import "./css/Navbar.css";




const Navbar = () => {
    return <nav>
        <Link to="/home"><BiSolidHomeCircle /></Link>
        <Link to="/search"><CiSearch /></Link>
        <Link to="/createquack"><GoBell /></Link>
        <Link to="/messages"><FaRegEnvelope /></Link>
    </nav>;
};

export default Navbar;