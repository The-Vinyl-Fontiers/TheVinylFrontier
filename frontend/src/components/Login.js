import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");

    const nav = useNavigate();

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
            const response = await fetch(`http://localhost:3000/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        username: loginUser,
                        password: loginPass
                    }
                })
            });
            const transData = await response.json();

            if (!transData.success){
                alert("Login was unsuccessful. Please try again. ");
            } else {
                const tokenKey = transData.token;
                console.log(tokenKey);
                localStorage.setItem("token", tokenKey);
                alert("Login was successfully.");
                setLoginUser("")
                setLoginPass("")
                nav("/")
            }
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <h2>Log into Your Account</h2>
            <form onSubmit={ logIn }>
                <input 
                    type="text"
                    placeholder="Username"
                    onChange={(event)=> setLoginUser(event.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Password"
                    onChange={(event)=> setLoginPass(event.target.value)}
                />
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}

export default Login;