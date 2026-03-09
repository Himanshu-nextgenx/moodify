import { Link } from 'react-router'
import FormGroup from '../components/FormGroup'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const {loding,handleRegister} = useAuth();
const [username,setUsername]=useState("")
const [email,setEmail] = useState("");
 const [password, setPassword] = useState("")

 async function handelSubmit(e) {
  e.preventDefault();
  await handleRegister({username,email,password})
   navigate("/")
 }

  
   



  return (
<main className="Auth-page">
      <h1>Moodify</h1>
      <div className="form-container">
        <h2>Register</h2>
        <form action="" onSubmit={handelSubmit}>
            <FormGroup  value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" label="UserName  :"  placeholder="Enter your username... "/>
         <FormGroup value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" label="Email  :"  placeholder="Enter your email... "/>
         <FormGroup value={password}  onChange={(e)=>{setPassword(e.target.value)}} type="password"  label="Password  :" placeholder="Enter your password..." />
          <button type="submit">Register</button>
           <p>Already Registered <Link className='Navs' to="/login">login Here</Link> </p>
        </form>
      </div>
    </main>
  )
}

export default Register
