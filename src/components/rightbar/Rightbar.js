import "./rightbar.css";
import { Users } from "../../dummyData";
import OnlineFriend from "../onlineFriend/OnlineFriend";
import { memo, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
function Rightbar({ user }) {
  const Friend = ({ friend }) => {
    return (
      <div className="userFriend">
        <img
          className="userFriendImg"
          src={
            friend.profilePicture
              ? PF + "person/" + friend.profilePicture
              : PF + "/person/0.jpeg"
          }
          alt=""
        />
        <span className="userFriendName">{friend.username}</span>
      </div>
    );
  };

  let { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [fetchFriends, setFetchFriends] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (currentUser) setFollowed(currentUser.followings.includes(user?._id));
    const getFriends = async () => {
      const friendsList = await axios.get(
        "https://memoriesserver-production.up.railway.app/api/users/friends/" +
          user._id
      );
      setFriends(friendsList.data);
      setFetchFriends(true);
    };
    getFriends();
  }, [user, currentUser]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={PF + "/gift.png"} alt="" className="birthdayImg" />
          <div className="birthdayText">
            <b>Shubham</b> and <b>2 other friends</b> have a birthday today.
          </div>
        </div>
        <img src={PF + "/ad.jpg"} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendsList">
          {Users.map((user) => (
            <OnlineFriend key={user.id} user={user}></OnlineFriend>
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const followUnfollowHandler = async () => {
      try {
        if (!followed) {
          await axios.put(
            "https://memoriesserver-production.up.railway.app/api/users/" +
              user._id +
              "/follow",
            {
              userId: currentUser._id,
            }
          );
          dispatch({ type: "FOLLOW", payload: user._id });
        } else {
          await axios.put(
            "https://memoriesserver-production.up.railway.app/api/users/" +
              user._id +
              "/unfollow",
            {
              userId: currentUser._id,
            }
          );
          dispatch({ type: "UNFOLLOW", payload: user._id });
        }
        setFollowed(!followed);
      } catch (error) {}
    };

    return (
      <>
        {user._id !== currentUser._id && (
          <Button
            style={{
              textTransform: "capitalize",
              backgroundColor: "#93d7c1",
              color: "whitesmoke",
              padding: "5px 10px",
              marginBottom: "10px",
              marginTop: "30px",
            }}
            variant="contained"
            onClick={followUnfollowHandler}
          >
            {followed ? "Unfollow" : "Follow"}
          </Button>
        )}

        <div className="rightbarTop">
          <h4 className="rightbarTitle">About {user.username}</h4>
        </div>

        <div className="rightbarInfoFormContainer">
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city || "-"}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{user.from || "-"}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">
                {user.relationship || "-"}
              </span>
            </div>
          </div>
        </div>
        <h4 className="rightbarTitle">{user.username}'s Friends</h4>
        <div className="userFriends">
          {!fetchFriends && <CircularProgress size="15px" />}
          {fetchFriends &&
            friends.length > 0 &&
            friends.map((friend) => {
              return (
                <Link
                  key={friend._id}
                  style={{ textDecoration: "none" }}
                  to={`/profile/${friend.username}`}
                >
                  <Friend key={friend._id} friend={friend} />
                </Link>
              );
            })}
          {fetchFriends && !friends.length && <p>No friends to show 😕</p>}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? (
          <ProfileRightbar></ProfileRightbar>
        ) : (
          <HomeRightbar></HomeRightbar>
        )}
      </div>
    </div>
  );
}

export default memo(Rightbar);
