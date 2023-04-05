import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

const Logout = (props) => {
    const {setLoggedIn, setCurrentUser} = props
    const navigate = useNavigate();

    function logout (){
        localStorage.removeItem("token")
        setLoggedIn(false);
        setCurrentUser("")
        navigate("/")
    }

    useEffect(() =>{
        logout()
    },[])
}

export default Logout