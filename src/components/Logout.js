import { Navigate, useNavigate } from "react-router";

const Logout = () => {
    const navigate = useNavigate();

    function logout (){
        localStorage.removeItem("token")
        setLoggedIn(false);
        navigate("/")
    }

    return(
    <div onClick={logout}>
    </div>)
}

export default Logout