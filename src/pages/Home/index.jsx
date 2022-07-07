import React, { useState } from "react";
import "./styles/main.css";
import Icon from "components/Icon";
import introImgLight from "assets/images/intro-connection-light.jpg";
import introImgDark from "assets/images/intro-connection-dark.jpg";
import Sidebar from "components/Sidebar";

const Home = () => {
   const [newMsg, setMsg] = useState(null);
   const darkTheme = document.body.classList.contains("dark-theme");

   const newMessage = (info) => {
      setMsg(info);
   };

   return (
      <>
         <Sidebar newMessageFn={newMessage} />
         {newMsg == 0 ? (
            <div className="home-new"></div>
         ) : (
            <div className="home">
               <div className="home__img-wrapper">
                  <img
                     src={darkTheme ? introImgDark : introImgLight}
                     alt=""
                     className="home__img"
                  />
               </div>

               <h1 className="home__title">A Place to talk</h1>
               <p className="home__text">Welcome to Chatbox!</p>
            </div>
         )}
      </>
   );
};

export default Home;
