import React from "react";
import "../styles/login.scss"
import "../../shared/styles/button.scss"
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const {loding , handleLogin} = useAuth()
 const [email,setEmail] = useState("");
 const [password, setPassword] = useState("")


  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({email,password})
    navigate("/")
  }
  return (
    <main className="Auth-page">
      <h1>Moodify</h1>
      <div className="form-container">
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}>
         <FormGroup value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" label="Email  :"  placeholder="Enter your email... "/>
         <FormGroup  value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password"  label="Password  :" placeholder="Enter your password..." />
          <button type="submit">Login</button>
   <p>Don't Have an Account? <Link className="Navs" to="/register">Register Here</Link> </p>
         
        </form>
      </div>
    </main>
  );
};

export default Login;
