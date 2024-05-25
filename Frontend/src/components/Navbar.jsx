import { NavLink } from "react-router-dom";
import { BiSolidHomeCircle } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { FaRegEnvelope } from "react-icons/fa";

import "./css/Navbar.css";




const Navbar = () => {
    return <nav>
        <NavLink to="/home"><BiSolidHomeCircle /></NavLink>
        <NavLink to="/search"><CiSearch /></NavLink>
        <NavLink to="/createquack"><GoBell /></NavLink>
        <NavLink to="/messages"><FaRegEnvelope /></NavLink>
    </nav>;
};

export default Navbar;