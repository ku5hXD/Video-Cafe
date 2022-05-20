import React from "react";

import styles from "../css/Login.module.css";

import { useState } from "react";
import bgVideo2 from "../images/bgVideo2.mp4";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faNewspaper,
  faGamepad,
  faTheaterMasks,
  faPodcast,
  faFilm,
  faMusic,
  faBasketballBall,
  
} from "@fortawesome/free-solid-svg-icons";

import google from "../images/google-icon.png"


const Login = () => {

  const [signInState,setSignInState] = useState(false);
  const [signUpState,setSignUpState] = useState(false);


  const signInMethod = () => {
    // styles.container.classList.add("right-panel-active");
    setSignUpState(false);
    console.log("SING IN DABAYU ");
  }

  const signUpMethod = () => {
    setSignUpState(current => !current);
    console.log("SIGN UP DABAYU");
  }



  return (
    <div className={styles.login}>
      <video autoPlay loop muted className={styles.bgVideo}>
        <source src={bgVideo2} type="video/mp4" />
      </video>
      <div className={`${styles.container} ${signUpState ? styles.rightPanelActive : ""}`} id="container">
        <div
          className={`${styles.formContainer} ${styles.signUpContainer}`}
        >
          <form action="#">
            <h1>Create Account</h1>
            <div className={styles.socialContainer}>
             
              <a href="#" className={styles.social}>
                <img src={google} className={styles.ghost}></img>
              </a>
              
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form action="#">
            <h1>Sign in</h1>
            <div className={styles.socialContainer}>
              
              
              <a href="#" className={styles.social}>
                <img src={google} className={styles.ghost}></img>
              </a>
             
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button onClick={signInMethod} className={signInState ? styles.rightPanelActive : ""}>Sign In</button>
          </form>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className={styles.ghost} id="signIn" onClick={() => {
                setSignUpState(current => !current);
                console.log("SIGN IN DABAYU");
              }}>
                Sign In
              </button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button id="signUp"  onClick={() => {
              setSignUpState(current => !current);
              console.log("SIGN UP DABAYU");
            }} className={styles.ghost}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
