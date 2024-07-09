import React from 'react'
import "./CSS/LoginSignup.css";
function LoginSignup() {
  return (
    <div className="loginsignup ">
    <div className="loginsignup-container">
      <h1></h1>
      <div className="loginsignup-fields">
        <input type="text" placeholder="Your name" name="username" />
        <input type="email" placeholder="Email address" name="email" />
        <input type="password" placeholder="Password" name="password"/>
      </div>

      <button>Continue</button>

     
      <p className="loginsignup-login">Create an account? <span >Click here</span></p>
      <p className="loginsignup-login">Already have an account? <span >Login here</span></p>

      <div className="loginsignup-agree">
        <input type="checkbox" name="" id="" />
        <p>By continuing, i agree to the terms of use & privacy policy.</p>
      </div>
    </div>
  </div>
  )
}

export default LoginSignup
