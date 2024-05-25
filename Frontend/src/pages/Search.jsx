import { CiSettings } from "react-icons/ci";
import "./css/Search.css";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import { TokenContext } from "../components/context";
import QuackButton from "../components/QuackButton";
import { Link } from "react-router-dom";

const Search = () => {
  const { token } = useContext(TokenContext);
  const [searchInput, setSearchInput] = useState("");
  const [allUser, setAllUser] = useState();

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

  return (
    <section className="search">
      <div className="search-form">
        <img src="/img/goose_white.png" alt="" />
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <CiSettings />
      </div>{" "}
      <div className="border"></div>
      <QuackButton />
      {allUser?.map((user) => (
        <Link to={`/profile/${user._id}`}>
          <article>
            <img src="/img/goose_white.png" alt="" />
            <div>
              <h4>{user.firstname}</h4>
              <p>{user.username}</p>
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
};

export default Search;
