import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Register = () => {
    const [newUser, setNewUser] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newEmail, setNewEmail] =useState ("");
    const nav = useNavigate("");
    async function registerUser(event){
        event.preventDefault ();
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
                    user:{
                        username: newUser,
                        password: newPass,
                        email: newEmail
                    }
                })

            })
            const transData = await response.json();
            console.log (transData);
            if (transData.success){
                alert("Account Creation Unsucessful");
            }else{
                const tokenKey = transData.data.token;
                localStorage.setItem("token", tokenKey);
                alert ("New Account Was Successfully Created");
                nav("/")
            }
        }catch(error){
            console.log(error)
    }
    }
    return (
        <div>
            <h2>Create an Account</h2>
                <form onSubmit= {registerUser}></form>
                <input
                type="text"
                value={newUser}
                placeholder="Username"
                onChange={(event)=> setNewUser(event.target.value)}/>
                <input 
                type="text"
                value={newPass}
                placeholder="Password"
                onChange={(event)=> setNewPass(event.target.value)}/>
                <input 
                type="text"
                value={newEmail}
                placeholder="Email"
                onChange={(event)=> setNewEmail(event.target.value)}/>
                <button type="submit">Register Account</button>
        </div>
    )
}

export default Register