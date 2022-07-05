import React, { useEffect, useState } from "react";
import "./App.css";
import {
   BrowserRouter as Router,
   Route,
   Switch,
   Redirect,
} from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";

import Login from "pages/login/login";
import signup from "pages/signup/signup";
import { auth, firestore, db } from "./firebaseInit";
import { history } from "./history";

const userPrefersDark =
   window.matchMedia &&
   window.matchMedia("(prefers-color-scheme: dark)").matches;

function App() {
   const [appLoaded, setAppLoaded] = useState(false);
   const [startLoadProgress, setStartLoadProgress] = useState(false);

   useEffect(() => {
      if (userPrefersDark) document.body.classList.add("dark-theme");
      stopLoad();
   }, []);

   const stopLoad = () => {
      setStartLoadProgress(true);
      setTimeout(() => setAppLoaded(true), 3000);
   };

   if (!appLoaded) return <Loader done={startLoadProgress} />;

   return (
      <div className="app">
         <p className="app__mobile-message"> Only available on desktop 😊. </p>
         <Router>
            <div className="app-content">
               <Switch>
                  <Route exact path="/home" component={Home} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/signup" exact component={signup} />
                  <Redirect to="/home" />
               </Switch>
            </div>
         </Router>
      </div>
   );
}

export default App;
