import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {AllProducts} from './index';
import {Navbar} from '../components'

const HomePage = (props) =>{
    return (
        <div>

            <AllProducts vinyls={props.vinyls}/>
            <Navbar />
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