import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import { TokenContext, UserContext } from "../components/context";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import "./css/QuackDetail.css";
import Comments from "../components/Comments";
import { CiSettings } from "react-icons/ci";

const QuackDetail = () => {
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const [quackDetail, setQuackDetail] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comment, setComment] = useState();

  const { quackId } = useParams();

  console.log(user);

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
          <img className="profilepic" src="/img/goose_white.png" alt="" />
        </div>
      </Link>
      <h2>Quack</h2>
      <CiSettings />
    </div>
    {quackDetail ? (
      <>
        <div className="userInfo" >
          <div className="img-container">
            <img className="profilepicbig" src="/img/goose_white.png" alt="" />
          </div>
          <div >
            <h4>{quackDetail.userId.firstname} {quackDetail.userId.lastname}</h4>
            <h4>{quackDetail.userId.username}</h4>
          </div>

        </div>
        <h3> {quackDetail.quackText}</h3>
        <p > {quackDetail.Date}</p>
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
            <div className="container img-container"><img className="profilepic" src="/img/goose_white.png" alt="" /></div>
            <h4>{item.userId?.firstname} <span>@{item.userId?.username}</span> </h4>
          </div>
          <h5 >{item.commentText}</h5>
        </div>
      ))}
    </article>
  </section >;
};

export default QuackDetail;
