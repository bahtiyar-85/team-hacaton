import React from 'react';

import './Home.css'

const Home = () => {
    return (
        <div className='container'>
            <video className="background-video" muted autoPlay preload="auto" loop >
                {/* <source type="video/webm" src="https://thumbs.gfycat.com/MixedTartCalf-mobile.mp4"/> */}
                <source type="video/mp4" src="https://giant.gfycat.com/ColorlessQuerulousDoe.mp4"/>
            </video>
        </div>
    );
};

export default Home;