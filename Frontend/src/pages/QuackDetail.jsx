import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import { TokenContext, UserContext } from "../components/context";
import { FaRegComment } from "react-icons/fa";
import "./css/QuackDetail.css";
import Comments from "../components/Comments";

const QuackDetail = () => {
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const [quackDetail, setQuackDetail] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comment, setComment] = useState();

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
  }, []);

  console.log(comment);

  const createComment = async (quackId) => {

    const commentInfo = {
      userId: user._id,
      commentText: commentText
    };
    const res = await fetch(`${backendUrl}/api/v1/comments/${quackId}`, {
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      method: "POST",
      body: JSON.stringify(commentInfo),
      credentials: "include"

    });
    const data = await res.json();
    if (!data.result) return setErrorMessage(data.message);
  };

  return <section className="quackDetail">
    <h2>Quack</h2>
    <div className="border"></div>
    {quackDetail ? (
      <>
        <div className="userInfo" >
          <img src="/img/goose_white.png" alt="" />
          <div >
            <h4>{quackDetail.userId.firstname} {quackDetail.userId.lastname}</h4>
            <h4>{quackDetail.userId.username}</h4>
          </div>

        </div>
        <p> {quackDetail.quackText}</p>
      </>)
      : <p>Loading...</p>}
    <div onClick={() => setShowInput(!showInput)}>
      <Comments />
    </div>

    <div className={showInput ? ` ` : `dontShow`}>
      <form onSubmit={() => createComment(quackId)}>
        <input type="text" name="" id="" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
        <button >Submit</button>
      </form>
    </div>
    <article className="commentsection">
      {comment?.map((item) => (
        <div>
          {/* <h4>{item.userId.username} says:</h4> */}
          <p>{item.commentText}</p>
        </div>
      ))}
    </article>
  </section >;
};

export default QuackDetail;
