import React, { useState } from 'react';
import './Css/LoginSignup.css';



export const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    usertype:""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login function", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      
      console.log("login fetched");
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  
  

  const signup = async () => {
    console.log("signup function", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
    
      console.log("login fetched");
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  

  
  return (
   
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state === "Sign Up" ? <>
          <div className='loginsignup-fields-radio'>
          <label><input type='radio' name='usertype' value= 'user'  checked={formData.usertype === 'user'} onChange={changeHandler}/>user</label>
          <label><input type='radio' name='usertype' value= 'agent'  checked={formData.usertype === 'agent'} onChange={changeHandler}/>Agent</label></div>
          <input name="username" value={formData.username} onChange={changeHandler} type='text' placeholder='Username' /> </>:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>
          Login here</span></p> : <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
        <div className='loginsignup-agree'>
        
          <input type='checkbox' name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div> 
      </div>
    </div>
    );
  
};
