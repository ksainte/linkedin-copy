import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import linkedin from '@mui/icons-material/LinkedIn';
import LinkedInImage from './Assets/linkedin.png'; 
import HeaderOption from './HeaderOption'
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./Header.css"
import dog from './Assets/dog.jpg';
import { useDispatch } from 'react-redux'
import { signOut } from "firebase/auth";
import {logout} from "./features/userSlice";
import { auth } from "./firebase";
import {selectUser} from "./features/userSlice"
import { useSelector } from 'react-redux';


function Header() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const logoutofApp = () => {
    dispatch(logout());
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className = 'header'>

      <div className="header__left">
      <img 
      src={LinkedInImage} 
      alt="LinkedIn" />
        <div className= "header__search">
            <SearchIcon/>
            <input type = "text"/>
        </div>
      </div>
      
      <div className="header__right">
        <HeaderOption Icon ={HomeIcon} title="Home" />
        <HeaderOption Icon ={SupervisorAccountIcon} title="My Network" />
        <HeaderOption Icon ={BusinessCenterIcon} title="Jobs" />
        <HeaderOption Icon ={ChatIcon} title="Chat" />
        <HeaderOption Icon ={NotificationsIcon} title="Notifications" />
        <HeaderOption 
        avatar={dog}  
        title={user.displayName}
        onClick= {logoutofApp}/>
      </div>
    </div>
  )
}
 
export default Header

// {user.photoURL} 
