import React, { useState } from 'react'
import "./CSS/LoginSignup.css";

function LoginSignup() {
  const[state,setState] = useState("login");
  const[data,setData] =useState({
    username:"",
    password:"",
    email:""
  });
  const changehandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const login = async()=>{
    console.log("This is login button ",data);
    let responsedata;
    await fetch('http://localhost:8001/login',{
      method : 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data),
    }).then((response)=>response.json()).then((data)=>responsedata=data)
    if(responsedata.success){
        localStorage.setItem('auth-token',responsedata.token);
        window.location.replace('/');
    }
    else{
      alert(responsedata.errors)
    }
  }
  const signup = async()=>{
    console.log("This is signup button",data);
    let responsedata;
    await fetch('http://localhost:8001/signup',{
      method : 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data),
    }).then((response)=>response.json()).then((data)=>responsedata=data)
    if(responsedata.success){
        localStorage.setItem('auth-token',responsedata.token);
        window.location.replace('/');
    }
    else{
      alert(responsedata.errors)
    }
  }
  return (

    <div className="loginsignup ">
    <div className="loginsignup-container">
      {state=='login'?<h1 className='text-black'>LOGIN</h1>:<h1>SIGNUP</h1>}
      <div className="loginsignup-fields">
       {state=='login'?<></>:<input type="text" value={data.name} placeholder="Your name" onChange={changehandler} name="username" />}
        <input type="email" placeholder="Email address" value={data.email} onChange={changehandler} name="email" />
        <input type="password" value={data.password} placeholder="Password" onChange={changehandler} name="password"/>
      </div>

      <button onClick={()=>{state=='login'?login():signup()}}>continue</button>
      {state=='login'?<p className="loginsignup-login">Create an account? <span onClick={()=>{setState("signup")}}>Click here</span></p>: <p className="loginsignup-login">Already have an account? <span onClick={() => setState("login")}>Login here</span></p>
      }
      <div className="loginsignup-agree">
        <input type="checkbox" name="" id="" />
        <p>By continuing, i agree to the terms of use & privacy policy.</p>
      </div>
    </div>
  </div>
  )
}

export default LoginSignup
