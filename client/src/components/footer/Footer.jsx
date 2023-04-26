import React from 'react'
import { SocialIcon } from 'react-social-icons';


const Footer = () => {
  return (
    <div>
      <div style={{display: "flex", height: "50%"}}>
        <div style={{ "fontFamily": "Abel", width: "50%", float: "center"}}>
        <h5 style={{ "fontFamily": "Abel", width: "20%"}}>GrubGo Inc.</h5>
      </div>
      <div style={{width: "50%", float: "right"}}></div>
        <SocialIcon url="https://twitter.com" 
          style={{
            width: "1em", 
            margin: ".2em", 
            padding: ".2em"
          }} 
        />
        <SocialIcon url="https://facebook.com" 
          style={{
            width: "1em", 
            margin: ".2em", 
            padding: ".2em"
          }} 
        />
        <SocialIcon url="https://instagram.com" 
          style={{
            width: "1em", 
            margin: ".2em", 
            padding: ".2em"
          }} 
        />
        
      </div>
    </div>
  )
}

export default Footer