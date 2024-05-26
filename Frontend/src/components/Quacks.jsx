import Comments from "../components/Comments";
import { Link } from "react-router-dom";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { backendUrl } from "../api/api";
import { useContext } from "react";
import { UserContext } from "./context";
const Quacks = ({ quack }) => {
    const { user } = useContext(UserContext);
    return <Link to={`/quackdetail/${quack._id}`}>
        <div key={quack._id} className="quack">
            <article>
                <div className="img-container">
                    <img className="prof-pic" src={`${backendUrl}/${quack.userId.imgUrl}`} alt="" />
                </div>
                <div>
                    <div className="nameInfo">
                        <h4>
                            {quack.userId.firstname} {quack.userId.lastname}
                        </h4>
                        <h5>@{quack.userId.username}</h5>
                    </div>
                    {/* <p>{quack.Date}</p> */}
                    <p>{quack.quackText}</p>


                    <div className="icons">

                        <Comments />

                        <AiOutlineRetweet />
                        <FaRegHeart />
                    </div>
                </div>
            </article>
        </div>
    </Link>;
};

export default Quacks;