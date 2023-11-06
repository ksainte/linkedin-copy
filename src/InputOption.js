import React from 'react'
import "./InputOption.css"

function InputOption({Icon, title, color}) {
  return (
    <div className="InputOption">
        <Icon style={{ color: color}}/>
        <h4 style={{ marginLeft: '5px' }}>{title}</h4>
    </div>
  )
}

export default InputOption
