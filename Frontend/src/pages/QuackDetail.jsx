import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import { TokenContext, UserContext } from "../components/context";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import "./css/QuackDetail.css";
import Comments from "../components/Comments";
import { CiSettings } from "react-icons/ci";
import Sidebar from "../components/Sidebar";

const QuackDetail = () => {
  const { token, setToken } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const [quackDetail, setQuackDetail] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comment, setComment] = useState();
  const [showSidebar, setShowSidebar] = useState(false);

  const { quackId } = useParams();



  useEffect(() => {
    const getDetailsQuack = async (quackId) => {
      const res = await fetch(`${backendUrl}/api/v1/quacks/${quackId}`, {
        headers: { authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (!data.result)
        return setErrorMessage(data.message || "Failed to fetch Quack");
      setQuackDetail(data.result);
    };
    getDetailsQuack(quackId);

  }, []);

  useEffect(() => {
    const getAllComments = async (quackId) => {
      const res = await fetch(`${backendUrl}/api/v1/comments/${quackId}`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!data.result)
        return setErrorMessage(data.message || "Failed to fetch Comments");
      setComment(data.result);
    };
    getAllComments(quackId);
  }, [showInput]);

  const logoutUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendUrl}/api/v1/user/logout`, {
      method: "POST",
      credentials: "include"
    });

    const data = await res.json();
    if (!data.result) return alert("Could not log out");
    console.log(data.result);
    setToken("");
    navigate("/login");
  };


  const createComment = async (e) => {
    e.preventDefault();
    const commentInfo = {
      userId: user._id,
      commentText: commentText
    };

    console.log(user._id);
    const res = await fetch(`${backendUrl}/api/v1/comments/${quackId}`, {
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      method: "POST",
      body: JSON.stringify(commentInfo),
      credentials: "include"

    });
    const data = await res.json();
    if (!data.result) return setErrorMessage(data.message);

    setCommentText("");
    setShowInput(false);

  };

  return <section className="quackDetail">
    <div className="detail-head">
      <Link to={`/profile/${user._id}`}>
        <div className="container img-container">
          <img className="prof-pic" src={`${backendUrl}/${user.imgUrl}`} alt="" />
        </div>
      </Link>
      <h2>Quack</h2>
      <div onClick={() => setShowSidebar(true)}>
        <CiSettings />
      </div>
    </div>
    <Sidebar logoutUser={logoutUser} setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
    {quackDetail ? (
      <>
        <div className="userInfo" >
          <div className="img-container">
            <img className="prof-pic" src={`${backendUrl}/${quackDetail.userId.imgUrl}`} alt="" />
          </div>
          <div >
            <h3>{quackDetail.userId.firstname} {quackDetail.userId.lastname}</h3>
            <h4>@{quackDetail.userId.username}</h4>
          </div>

        </div>
        <h6> {quackDetail.quackText}</h6>
        <p className="date"> {quackDetail.Date}</p>
        <div className="icons detailicon">
          <div onClick={() => setShowInput(!showInput)}>
            <Comments />
          </div>
          <AiOutlineRetweet />
          <FaRegHeart />
        </div>

      </>)
      : <p>Loading...</p>}

    <div className={showInput ? `showInput` : `dontShow`}>
      <form >
        <input type="text" name="" id="" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Quack your reply" />
        <button onClick={createComment}>Submit</button>
      </form>
    </div>
    <article className="commentsection">
      {comment?.map((item) => (
        <div key={item._id} >
          <div className="pic-name">
            <div className="container img-container">    <img className="prof-pic" src={`${backendUrl}/${item.userId.imgUrl}`} alt="" /></div>
            <h4>{item.userId?.firstname} <span>@{item.userId?.username}</span> </h4>
          </div>
          <h5 >{item.commentText}</h5>
        </div>
      ))}
    </article>
  </section >;
};

export default QuackDetail;
