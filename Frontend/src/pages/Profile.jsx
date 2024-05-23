import { useContext } from "react";
import { UserContext } from "../components/context";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  return <h1>Profile</h1>;
};

export default Profile;
