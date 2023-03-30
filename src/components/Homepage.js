import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {AllProducts} from './AllProducts';

const HomePage = (props) =>{
    const [vinyls,fetchVinyls,setLoggedIn]=props
    useEffect(()=>{
        fetchVinyls();
        if (localStorage.getItem('token')){
            setLoggedIn(true);
        }
    })
    return (
        <div>
            <AllProducts/>
            <div>
                <p>blah blah blah blah</p>
            </div>
            {
                props.LoggedIn ? (
                <div>
                    {
                        //Cart , logout, profile shows up, register leaves
                    }
                </div>

                ) : <div>
                    Please Login to access more features blah blah blah
                </div>  
            }
        </div> 
    )
}
export default HomePage