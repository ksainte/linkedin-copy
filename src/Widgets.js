import React from 'react'
import InfoIcon from '@mui/icons-material/Info';
import "./Widgets.css"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Widgets() {

  const newsArticle =(heading, subtitle) => (
    <div className='widgets_article'>
        <div className='widgets_article_left'>
            <FiberManualRecordIcon />
        </div>
        <div className='widgets_article_right'>
            <h4>{heading}</h4>
            <p>{subtitle}</p>
        </div>
    </div>
  )
  return (
    <div className='widgets'>
        <div className='widgets_header'>
        <h2> Linkedin News</h2>
        <InfoIcon/>
        </div>
        {newsArticle("Kev React is back", "Top news -9000 readers")}
        {newsArticle("Kev React is back", "Top news -9000 readers")}
        {newsArticle("Kev React is back", "Top news -9000 readers")}
        {newsArticle("Kev React is back", "Top news -9000 readers")}
        {newsArticle("Kev React is back", "Top news -9000 readers")}
        {newsArticle("Kev React is back", "Top news -9000 readers")}
    </div>
  )
}

export default Widgets
