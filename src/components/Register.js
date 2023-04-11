import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaEyeSlash, FaEye} from "react-icons/fa"

import "./Login.css"
const Register = (props) => {
    const [newUser, setNewUser] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newEmail, setNewEmail] =useState ("");
    const nav = useNavigate();

    const [passwordShown, setPasswordShown] = useState(false)

    const {setLoggedIn} = props

    async function registerUser(){
        console.log()
        // event.preventDefault ();
        try{
            if (newPass.length<8){
                alert ("Your password needs to be at least 8 characters");
                return;
            } else if (newUser.length <6){
                alert ("Your username needs to be at least 6 characters");
                return;
            }
            const response = await fetch('http://localhost:3001/api/users/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: newUser,
                    password: newPass,
                    email: newEmail
                })

            })
            const transData = await response.json();
            console.log (transData);
            if (!transData.token){
                alert(transData.message);
            }else{
                const tokenKey = transData.token;
                localStorage.setItem("token", tokenKey);
                alert ("New Account Was Successfully Created");
                setLoggedIn(true)
                nav("/")
            }
        }catch(error){
            console.log(error)
    }
    }

    function togglePassword () {
        setPasswordShown(!passwordShown)
    }

    return (
        <div id='loginContainer'>
            <h2 id='loginHeader'>Create an Account</h2>
                <form id='loginForm' onSubmit= {(event) => {
                    console.log("button clicked")
                    event.preventDefault()
                    registerUser()
                }}>
                <input
                type="text"
                value={newUser}
                placeholder="Username"
                onChange={(event)=> setNewUser(event.target.value)}/>
                 <input 
                type="text"
                value={newEmail}
                placeholder="Email"
                onChange={(event)=> setNewEmail(event.target.value)}/>
                <div id='loginPass'>
                <input 
                type={passwordShown ? "text" : "password"}
                value={newPass}
                placeholder="Password"
                onChange={(event)=> setNewPass(event.target.value)}/>
                {
                    passwordShown ? <FaEye className='icon eyeIcon' onClick={(event) => {
                        event.preventDefault()
                        togglePassword()}} ></FaEye> : <FaEyeSlash className='icon eyeIcon' onClick={(event) => {
                        event.preventDefault()
                        togglePassword()}}> Show password</FaEyeSlash>
                    
                }
                </div>
               
                <button type="submit" id='loginSubmit' >Register</button>
                </form>
        </div>
    )
}

export default Register