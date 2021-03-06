import React, { useState } from "react";
import axios from "axios";
import styles from "../css/Login.module.css";
import { useAuth } from "../contexts/authContext";
import bgVideo2 from "../images/bgVideo2.mp4";
import Cookies from 'js-cookie'
import google from "../images/google-icon.png"

import { Moralis } from 'moralis';
import { useHistory } from "react-router-dom"
import { Buffer } from 'buffer';
import { create } from "ipfs-http-client";
const client = create('https://ipfs.infura.io:5001/api/v0');

const Login = () => {

  const [signInState, setSignInState] = useState(false);
  const [signUpState, setSignUpState] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const history = useHistory();
  const { toggleAuth } = useAuth()

  // const signUpMethodDummy = () => {
  //   setSignUpState(current => !current);
  // }

  const changeNameHandler = (event) => {
    setName(event.target.value);
  }

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  }

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  }

  const changeAvatarHandler = (event) => {
    console.log(event.target.files[0])
    setAvatar(event.target.files[0]);
    console.log("hello");
    // setIsSelected(true);
  };

  const signUpHandler = async (e) => {
    e.preventDefault()
    var file;
    if (!avatar) {
      alert("please choose avatar");
    }
    else if (password.length < 7 || password.trim() === 'password') {
      alert('password khoto chhe')
    }
    else {
      //  basic IPFS CODE
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(avatar);
      reader.onloadend = async () => {
        try {
          const created = await client.add(Buffer(reader.result));
          const url = `https://ipfs.infura.io/ipfs/${created.path}`;
          const body = {
            name: name,
            email: email,
            password: password,
            avatar: url
          }
          axios.post(`http://localhost:8000/signup`, body)
            .then(function (response) {
              alert("signed up successfully")
              toggleAuth(true);
              Cookies.set('token', response.data.token)
              history.push("/home/all");
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        catch (e) {
          console.log(e)
        }
      }
    }
  }
  const signInHandler = (e) => {
    e.preventDefault()
    // styles.container.classList.add("right-panel-active");
    setSignUpState(false);

    const body = {
      email: email,
      password: password
    }
    axios.post(`http://localhost:8000/login`, body)
      .then(function (response) {
        alert("sign in successfull")
        toggleAuth(true);
        Cookies.set('token', response.data.token)
        Cookies.set('avatar', response.data.user.avatar)
        history.push("/home/all");
        console.log(response);
      })
      .catch(function (error) {
        alert("email or password wrong");
        console.log(error);
      });
  }

  return (
    <div className={styles.login} >
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
            <input onChange={changeNameHandler} type="text" placeholder="Name" />
            <input onChange={changeEmailHandler} type="email" placeholder="Email" />
            <input onChange={changePasswordHandler} type="password" placeholder="Password" />
            <input onChange={changeAvatarHandler} type="file" accept="image/png, image/gif, image/jpeg" name="file" />

            {/* This sign up button will result in API call to sign up*/}
            <button onClick={signUpHandler}>Sign Up</button>
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
            <input onChange={changeEmailHandler} type="email" placeholder="Email" />
            <input onChange={changePasswordHandler} type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            {/* This button will result in API call to sign in */}
            <button onClick={signInHandler} className={signInState ? styles.rightPanelActive : ""}>Sign In</button>
          </form>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              {/* This button will change the screen to sign in */}
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
              {/* This button will result in change of screen to dign up screen */}
              <button id="signUp" onClick={() => {
                setSignUpState(current => !current);
                console.log("SIGN UP DABAYU");
              }} className={styles.ghost}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;
