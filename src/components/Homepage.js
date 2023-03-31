import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {AllProducts} from './index';

const HomePage = (props) =>{
<<<<<<< HEAD
    const {vinyls,fetchVinyls,setLoggedIn}=props
    useEffect(()=>{
        if (localStorage.getItem('token')){
            setLoggedIn(true);
        }
    })
=======
    // const [vinyls,fetchVinyls,setLoggedIn]=props
    // useEffect(()=>{
    //     fetchVinyls();
    //     if (localStorage.getItem('token')){
    //         setLoggedIn(true);
    //     }
    // })
>>>>>>> 90bca1769901a0d07be0af09d28d7800d38626b8
    return (
        <div>
            <AllProducts vinyls={props.vinyls}/>
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