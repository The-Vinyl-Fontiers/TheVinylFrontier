import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {AllProducts} from './AllProducts';

const HomePage = (props) =>{

    const{setLoggedIn,} = props;
    useEffect(()=> {
        if (localStorage.getItem("token")){
            setLoggedIn(true);
            fetch();
        } else {
            props.setLoggedIn(false);
            console.log("No Token Exists");
        };
    }, [])
    return (
        <div>
            <AllProducts/>
            {
                props.LoggedIn ? (
                <div>
                    {
                        //Cart , logout, profile shows up, register leaves
                    }
                </div>

                ) : <div>

                </div>  
            }
        </div> 
    )
}
export default HomePage