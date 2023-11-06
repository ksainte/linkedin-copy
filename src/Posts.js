import React from 'react'
import Avatar from "@mui/material/Avatar";
import "./post.css"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import InputOption from './InputOption'
import ChatIcon from '@mui/icons-material/Chat';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';

function Posts({name, description, message, photoUrl}) {
  return (
    <div className='post'>

        <div className='post_header'>
            <Avatar/>
            <div className='post_info'>
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
        </div>

        <div className='post_body'>
            <p>{message}</p>
        </div>

        <div className='post_buttons'>
            <InputOption Icon= {ThumbUpAltIcon} 
            title="Like"
            color="gray"/>
            <InputOption Icon= {ChatIcon} 
            title="Comment"
            color="gray"/>
            <InputOption Icon= {ShareIcon} 
            title="Share"
            color="gray"/>
            <InputOption Icon= {SendIcon} 
            title="Send"
            color="gray"/>
        </div>
    </div>
  )
}

export default Posts
