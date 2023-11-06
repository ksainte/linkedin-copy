import React from 'react'
import "./Sidebar.css"
// import { Avatar } from '@mui/material'
import Avatar from "@mui/material/Avatar";
import bg from './Assets/bg.jpg';
  {/* <h1> I am a sidebar</h1> */}


function Sidebar() {

const recentItem = (topic)=> (
    <div className='sidebar_recentItem'>
        <span className='sidebar__hash'>#</span>
        <p>{topic}</p>
    </div>
);

  return (
    <div className='sidebar'>

        <div className="sidebar_top">
            <img 
            src= {bg}
            alt=""/>
            <Avatar className="sidebar__avatar" />
            <h2 style={{ fontSize: '18px' }}> Kevin</h2>
            <h4> Kevin@gmail.com</h4>
        </div>

        <div className='sidebar_stats'>
            <div className="sidebar_stat">
                <p>Who viewed you</p>
                <p className="sidebar_statNumber">2.500</p>
            </div>
            <div className="sidebar_stat">
                <p>Views on posts</p>
                <p className="sidebar_statNumber">2.400</p>
            </div>
        </div>

        <div className='sidebar_bottom'>
        <p style={{ fontSize: '13px', paddingBottom: '10px' }}>Recent</p>        {recentItem('reactjs')}
        {recentItem('programming')}
        {recentItem('software')}
        {recentItem('design')}
        </div>
    </div>
  )
}

export default Sidebar
