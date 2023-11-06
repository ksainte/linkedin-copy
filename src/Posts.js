import React, {forwardRef} from 'react'
import Avatar from "@mui/material/Avatar";
import "./post.css"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import InputOption from './InputOption'
import ChatIcon from '@mui/icons-material/Chat';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import {selectUser} from "./features/userSlice"
import { useSelector } from 'react-redux';

const Posts = forwardRef(({name, description, message, photoUrl}, ref) => {

const user = useSelector(selectUser);

  return (
    <div ref={ref} className='post'>

        <div className='post_header'>
        <Avatar className="avatar__icon" src= {photoUrl}> 
      {name[0]} 
      </Avatar>
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
})

export default Posts
