import "./share.css";
import { Photo, Label, LocationOn, Mood, Delete } from "@material-ui/icons";
import { useContext, useRef, useState, memo } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = user._id + "_" + Date.now() + "_" + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/posts/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfilePic"
            src={
              user.profilePicture
                ? PF + "person/" + user.profilePicture
                : PF + "/person/0.jpeg"
            }
            alt=""
          />
          <input
            className="shareInput"
            placeholder={`What's on your mind ${user.username}`}
            type="text"
            ref={desc}
          />
        </div>
        <hr />
        {file && (
          <div className="previewImgContainer">
            <img
              className="previewImg"
              src={URL.createObjectURL(file)}
              alt=""
            />
            <Delete
              style={{ color: "red" }}
              className="previewImgRemove"
              onClick={() => {
                setFile(null);
                fileRef.current.value = "";
              }}
            />
          </div>
        )}
        <form
          onSubmit={submitHandler}
          encType="multipart/form-data"
          className="shareBottom"
        >
          <div className="shareOptions">
            <label
              style={{ cursor: "pointer" }}
              htmlFor="file"
              className="shareOption"
            >
              <Photo className="shareOptionIcon" htmlColor="tomato"></Photo>
              <span className="shareOptionText">Photo</span>
              <input
                ref={fileRef}
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={saveFile}
              />
            </label>
            <div className="shareOption">
              <Label className="shareOptionIcon" htmlColor="blue"></Label>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <LocationOn
                className="shareOptionIcon"
                htmlColor="green"
              ></LocationOn>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <Mood className="shareOptionIcon" htmlColor="goldenrod"></Mood>
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </form>
      </div>
    </div>
  );
}

export default memo(Share);