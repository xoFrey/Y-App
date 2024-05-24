import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import "./css/Comments.css";

const Comments = ({ quack }) => {
  return (
    <div className="createComment">
      <Link to={`/quackDetail/${quack._id}`}>
        <FaRegComment />
      </Link>
    </div>
  );
};

export default Comments;
