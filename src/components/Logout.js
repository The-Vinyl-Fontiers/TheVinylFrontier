import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

const Logout = (props) => {
    const {setLoggedIn} = props
    const navigate = useNavigate();

    function logout (){
        localStorage.removeItem("token")
        setLoggedIn(false);
        navigate("/")
    }

    useEffect(() =>{
        logout()
    },[])
}

export default Logout