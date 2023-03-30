import { Navigate, useNavigate } from "react-router";

const Logout = () => {
    const navigate = useNavigate();

    function logout (){
        localStorage.removeItem("token")
        setLoggedIn(false);
        navigate("/")
    }

    return(
    <button onClick={logout}>
        Logout
    </button>)
}

export default Logout