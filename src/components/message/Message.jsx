import React, { memo } from 'react';
import {format} from 'timeago.js';
import "./message.css";

 function Message({ currentUser, message, own }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className='messageImg' src="" alt="" />
                <p className='messageText'>{message.text}</p>
            </div>
            <div className="messageTop">
                {format(message.createdAt)}
            </div>
        </div>
    )
}

export default memo(Message);