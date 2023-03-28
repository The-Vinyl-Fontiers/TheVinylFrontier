import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";

const HomePage = (props) =>{

    const{setLoggedIn} = props;

// Auth Check
    useEffect(()=> {
        if (localStorage.getItem("token")){
            setLoggedIn(true);
            fetchRoutines();
            fetchActivities();
        } else {
            props.setLoggedIn(false);
            console.log("No Token Exists");
        };
    }, [])
    return (
        <div>
            {
                props.loggedIn ? (
                <div>
                </div>

                ) : <div>

                </div>  
            }
        </div>
    )
}