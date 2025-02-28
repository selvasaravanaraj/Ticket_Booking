// Home.jsx
import React from 'react';
import './style.css';
import Chatbox from './Chatbox';


const Home = () => {
    return (
      <>
        <section id="home" className="container section section__height">
        <div><img src="path_to_your_image.jpg"  class="responsive-image"/> <Chatbox/></div>
        </section>
        </>
    );
}

export default Home;
