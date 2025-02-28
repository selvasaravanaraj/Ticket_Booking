import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import axios from 'axios';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const toggleForgotPassword = () => {
    setForgotPasswordClicked(!forgotPasswordClicked);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm({ ...signUpForm, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (loginForm.username === '' || loginForm.password === '') {
      setError('Please fill in all the details');
    } else {
      setError('');
      try {
        const res = await axios.post("http://localhost:5000/login", loginForm);

        if (res.data === "exist") {
          alert("Login successful");
        
          window.location.href = "/home";
        } else {
          alert("Invalid credentials");
        }
      } catch (e) {
        alert("Error occurred during login");
        console.log(e);
      }
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (signUpForm.username === '' || signUpForm.email === '' || signUpForm.password === '') {
      setError('Please fill in all the details');
    } else {
      setError('');
      try {
        const res = await axios.post("http://localhost:5000/signup", signUpForm);

        if (res.data === "exist") {
          alert("User already exists");
        } else if (res.data === "notexist") {
          alert("Signup successful");
        }
      } catch (e) {
        alert("Error occurred during signup");
        console.log(e);
      }
    }
  };

  return (
    <div className={`container ${isSignUp ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleLoginSubmit}>
            <h2 className="title">Login</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleLoginChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleLoginChange}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <input type="submit" value="Login" className="btn solid" />
            <a href='#' onClick={toggleForgotPassword}>Forgot Password</a>
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <FcGoogle />
              </a>
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
            </div>
          </form>

          <form className={`sign-up-form ${isSignUp ? 'active' : ''}`} onSubmit={handleSignUpSubmit}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleSignUpChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleSignUpChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleSignUpChange}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <input type="submit" className="btn solid" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <FcGoogle />
              </a>
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <button className="btn transparent" onClick={toggleSignUp}>
              Sign up
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <button className="btn transparent" onClick={toggleSignUp}>
              Login
            </button>
          </div>
        </div>
      </div>
      {forgotPasswordClicked && (
        <div className="forgot-password">
          <p>Forgot your password?</p>
          <p>No worries! Please contact support.</p>
          <button onClick={toggleForgotPassword}>Close</button>
        </div>
      )}

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body,
        input {
          font-family: "Poppins", sans-serif;
        }

        .container {
          position: fixed;
          width: 100%;
          background-color: #fff;
          min-height: 200vh;
          overflow: hidden;
        }

        .forms-container {
          position:  absolute;
          width: 100%;
          height: 50%;

        }

        .signin-signup {
          position:  relative;
          transform: translate(-50%, -50%);
          left: 75%;
          width: 50%;
          transition: 1s 0.7s ease-in-out;
          display: grid;
          grid-template-columns: 1fr;
          z-index: 5;
        }

        form {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0rem 5rem;
          transition: all 0.2s 0.7s;
          overflow: hidden;
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }

        form.sign-up-form {
          opacity: 0;
          z-index: 1;
        }

        form.sign-in-form {
          z-index: 2;
        }

        .title {
          font-size: 2.2rem;
          color: #444;
          margin-bottom: 10px;
        }

        .input-field {
          max-width: 380px;
          width: 100%;
          background-color: #f0f0f0;
          margin: 10px 0;
          height: 55px;
          border-radius: 55px;
          display: grid;
          grid-template-columns: 15% 85%;
          padding: 0 0.4rem;
          position: relative;
        }

        .input-field i {
          text-align: center;
          line-height: 55px;
          color: #acacac;
          transition: 0.5s;
          font-size: 1.1rem;
        }

        .input-field input {
          background: none;
          outline: none;
          border: none;
          line-height: 1;
          font-weight: 600;
          font-size: 1.1rem;
          color: #333;
        }

        .input-field input::placeholder {
          color: #aaa;
          font-weight: 500;
        }

        .social-text {
          padding: 0.7rem 0;
          font-size: 1rem;
        }

        .social-media {
          display: flex;
          justify-content: center;
        }

        .social-icon {
          height: 46px;
          width: 46px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 0.45rem;
          color: #333;
          border-radius: 50%;
          border: 1px solid #333;
          text-decoration: none;
          font-size: 1.1rem;
          transition: 0.3s;
        }

        .social-icon:hover {
          color: #4481eb;
          border-color: #4481eb;
        }

        .btn {
          width: 150px;
          background-color: #1b947a;
          border: none;
          outline: none;
          height: 49px;
          border-radius: 49px;
          color: #fff;
          text-transform: uppercase;
          font-weight: 600;
          margin: 10px 0;
          cursor: pointer;
          transition: 0.5s;
        }

        .btn:hover {
          background-color: #198a77;
        }
        .panels-container {
          position: absolute;
          height: 50%;
          width: 100%;
          top: 0;
          left: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .container:before {
          content: "";
          position: absolute;
          height: 2000px;
          width: 2000px;
          top: -8%;
          right: 48%;
          transform: translateY(-50%);
          background-image: linear-gradient(-45deg, #1b947a 0%, #1b947a 100%);
          transition: 1.8s ease-in-out;
          border-radius: 60%;
          z-index: 6;
        }

        .image {
          width: 100%;
          transition: transform 1.1s ease-in-out;
          transition-delay: 0.4s;
        }

        .panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          text-align: center;
          z-index: 6;
        }

        .left-panel {
          pointer-events: all;
          padding: 3rem 17% 2rem 12%;


        }

        .right-panel {
          pointer-events: none;
          padding: 3rem 12% 2rem 17%;

        }

        .panel .content {
          color: #fff;
          transition: transform 0.9s ease-in-out;
          transition-delay: 0.6s;

        }


        .panel p {
          font-size: 0.95rem;
          padding: 0.7rem 0;
        }

        .btn.transparent {
          margin: 0;
          background: none;
          border: 2px solid #fff;
          width: 130px;
          height: 41px;
          font-weight: 600;
          font-size: 0.8rem;

        }

        .right-panel .image,
        .right-panel .content {
          transform: translateX(800px);
          padding-top: 200px;
        }

        /* ANIMATION */

        .container.sign-up-mode:before {
          transform: translate(100%, -50%);
          right: 52%;
        }

        .container.sign-up-mode .left-panel .image,
        .container.sign-up-mode .left-panel .content {
          transform: translateX(-800px);
        }

        .container.sign-up-mode .signin-signup {
          left: 25%;
        }

        .container.sign-up-mode form.sign-up-form {
          opacity: 1;
          z-index: 2;
        }

        .container.sign-up-mode form.sign-in-form {
          opacity: 0;
          z-index: 1;
        }

        .container.sign-up-mode .right-panel .image,
        .container.sign-up-mode .right-panel .content {
          transform: translateX(0%);
        }

        .container.sign-up-mode .left-panel {
          pointer-events: none;
        }

        .container.sign-up-mode .right-panel {
          pointer-events: all;
        }

        @media (max-width: 870px) {
          .container {
            min-height: 800px;
            height: 100vh;
          }
          .signin-signup {
            width: 100%;
            top: 100%;
            transform: translate(-50%, -100%);
            transition: 1s 0.8s ease-in-out;
          }

          .signin-signup,
          .container.sign-up-mode .signin-signup {
           bottom:100px;
           left: 50%;

          }


          .panels-container {
            height: 100%;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 2fr 1fr;
          }

          .panel {
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 2.5rem 9%;
            grid-column: 1 / 2;
          }

          .right-panel {
            grid-row: 3 / 4;
          }

          .left-panel {
            grid-row: 1 / 2;
          }

          .panel .content {
            padding-right: 15%;
            transition: transform 0.9s ease-in-out;
            transition-delay: 0.8s;
          }

          .panel h3 {
            font-size: 1.2rem;
          }

          .panel p {
            font-size: 0.7rem;
            padding: 0.5rem 0;
          }

          .btn.transparent {
            width: 100px;
            height: 35px;
            font-size: 0.7rem;
          }

          .container:before {
            width: 1500px;
            height: 1500px;
            transform: translateX(-50%);
            left: 30%;
            bottom: 68%;
            right: initial;
            top: initial;
            transition: 2s ease-in-out;
          }

          .container.sign-up-mode:before {
            transform: translate(-50%, 100%);
            bottom: 32%;
            right: initial;
          }

          .container.sign-up-mode .left-panel .image,
          .container.sign-up-mode .left-panel .content {
            transform: translateY(-300px);
          }

          .container.sign-up-mode .right-panel .image,
          .container.sign-up-mode .right-panel .content {
            transform: translateY(0px);
          }

          .right-panel .image,
          .right-panel .content {
            transform: translateY(100px);
          }

          .container.sign-up-mode .signin-signup {
            top: -35%;
            transform: translate(-50%, 0);
          }
        }
          .error{
            color:red;
          }

        @media (max-width: 570px) {
          form {
            padding: 0 1.5rem;
          }

          .image {
            display: none;
          }
          .panel .content {
            padding: 0.5rem 1rem;
          }
          .container {
            padding: 1.5rem;
          }
          .container:before {
            bottom: 80%;
            left: 50%;
          }

          .container.sign-up-mode:before {
            bottom: 35%;
            left: 50%;
          }
        }

        @keyframes slideIn {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes slideOut {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        .forgot-password {
          position: sticky;
          background-color: #d66d0a;
          top: 0;
          left: 60%;
          transform: translateX(-50%);
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          animation: slideIn 0.5s ease forwards;
        }

        .forgot-password.hide {
          animation: slideOut 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default Login