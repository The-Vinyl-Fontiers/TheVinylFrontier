import { useEffect } from "react";

const HomePage=(props)=>{
    const{setLoggedIn,vinyls,fetchVinyls}=props;
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setLoggedIn(true);
            fetchVinyls();
        }
    })
//INCOMPLETE
}