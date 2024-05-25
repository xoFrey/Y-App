import { CiSettings } from "react-icons/ci";
import "./css/Search.css";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { TokenContext, UserContext } from "../components/context";
import QuackButton from "../components/QuackButton";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Search = () => {
  const { token, setToken } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState("");
  const [allUser, setAllUser] = useState();
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const showAllUser = async () => {
      const res = await fetch(`${backendUrl}/api/v1/user`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAllUser(data.result);

      if (searchInput.length > 0) {
        const filteredUser = allUser.filter((user) =>
          user.username.toLowerCase().includes(searchInput.toLowerCase())
        );
        setAllUser(filteredUser);
      }
    };
    showAllUser();
  }, [searchInput]);

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


  return (
    <section className="search">
      <div className="search-form">
        <Link to={`/profile/${user._id}`}>
          <div className="img-container container">
            <img src="/img/goose_white.png" alt="" />
          </div>
        </Link>
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div onClick={() => setShowSidebar(true)}>
          <CiSettings />
        </div>
      </div>
      <Sidebar logoutUser={logoutUser} setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <QuackButton />
      {allUser?.map((user) => (
        <div key={user._id}>
          <Link to={`/profile/${user._id}`}>
            <article className="search-profile">
              <div className="img-container ">
                <img src="/img/goose_white.png" alt="" />
              </div>
              <div className="search-name">
                <h4>{user.firstname}</h4>
                <p>@{user.username}</p>
              </div>
            </article>
          </Link></div>
      ))}
    </section>
  );
};

export default Search;
