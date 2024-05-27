import { useContext } from "react";
import { UserContext } from "./context";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiFileList2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { backendUrl } from "../api/api";
import "./css/Sidebar.css";

const Sidebar = ({ logoutUser, showSidebar, setShowSidebar }) => {
    const { user } = useContext(UserContext);

    return <section className={`sidebar ${showSidebar ? "show-sidebar" : "hide-sidebar"}`}>
        <div className="sidebar-button">
            <div className="img-container container">
                <img className="prof-pic" src={`${backendUrl}/${user.imgUrl}`} alt="" />
            </div>
            <div onClick={() => setShowSidebar(false)}>
                <IoMdCloseCircleOutline />
            </div>
        </div>
        <h2>{user.firstname} {user.lastname}</h2>
        <h3>@{user.username}</h3>
        <div className="follow">
            <p>{user.following.length} Following</p>
            <p>{user.following.length} Followers</p>
        </div>
        <div className="list">
            <Link to={`/profile/${user._id}`}>
                <FaRegUser />  Profile
            </Link>
            <Link to={`/home`}>
                <RiFileList2Line />  Dashboard
            </Link>
            <Link to={`/messages`}>
                <IoChatbubbleEllipsesOutline />  Messages
            </Link>
        </div>
        <button onClick={logoutUser} className="button">Logout</button>
    </section>;
};

export default Sidebar;