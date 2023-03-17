import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
          <span className="title">Memories</span>
        </Link>
      </div>

      <div className="topbarRight">
        <div className="topbarProfilePictureContainer">
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + "person/" + user.profilePicture
                  : PF + "person/0.jpeg"
              }
              alt=""
              className="topbarProfilePicture"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
