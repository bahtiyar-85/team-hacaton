import React from "react";
import Navbar from "../Navbar/Navbar";

import "./Header.css";

const Header = () => {
  return (
    <div>
      <Navbar />
      <video className="background-video" muted autoPlay preload="auto" loop >
                {/* <source type="video/webm" src="https://thumbs.gfycat.com/MixedTartCalf-mobile.mp4"/> */}
                <source type="video/mp4" src="https://giant.gfycat.com/ColorlessQuerulousDoe.mp4"/>
            </video>
    </div>
  );
};

export default Header;
