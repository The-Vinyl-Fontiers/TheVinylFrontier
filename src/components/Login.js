import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css"
import {FaEyeSlash, FaEye} from "react-icons/fa"

const Login = (props) => {
    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");

    const [passwordShown, setPasswordShown] = useState(false)

    const nav = useNavigate();

    const {setLoggedIn, fetchCurrentUser} = props;

    async function logIn(event){
        event.preventDefault();

        try {
            if(loginUser.length < 6){
                alert("Username is too short. 6 Character Minimum")
                return;
            } else if (loginPass.length < 8){
                alert("Password is too short. 8 Character Minimum")
                return;
            };
            const response = await fetch(`https://thevinylfrontier-server.onrender.com/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        username: loginUser,
                        password: loginPass
                })
            });
            const transData = await response.json();

            if (!transData.token){
                alert(transData.message);
            } else {
                const tokenKey = transData.token;
                localStorage.setItem("token", tokenKey);
                alert("Login was successful.");
                setLoginUser("")
                setLoginPass("")
                setLoggedIn(true)
                nav("/")
            }
        } catch(error){
            console.log(error)
        }
    }

    function togglePassword () {
        setPasswordShown(!passwordShown)
    }

    return(
        <div className="animation" id='loginContainer'>
            <h2 id='loginHeader'>Log into Your Account</h2>
            <form onSubmit={ logIn } id='loginForm'>
                <input 
                    type="text"
                    placeholder="Username"
                    onChange={(event)=> setLoginUser(event.target.value)}
                />
                <div id='loginPass'>
                <input 
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    onChange={(event)=> setLoginPass(event.target.value)}
                />
                
                {
                    passwordShown ? <FaEye className='icon eyeIcon' onClick={(event) => {
                        event.preventDefault()
                        togglePassword()}} ></FaEye> : <FaEyeSlash className='icon eyeIcon' onClick={(event) => {
                        event.preventDefault()
                        togglePassword()}}> Show password</FaEyeSlash>
                    
                }
                </div>
                
                <button id='loginSubmit' type="submit" >Login</button>
            </form>
            <div onClick={() => alert("Lol too bad.")} id='forgotPass'>Forgot password?</div>
        </div>
    )
}

export default Login;