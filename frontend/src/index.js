
import {useState,useEffect} from "react"
import {AllProducts, Car, Checkout, Filterbar, Header, Homepage, Login, Logout, OrderHistory,PaymentScreen,Postform, Profile,Register,SingleProduct} from './components'
import {BrowserRouter, Routes, Link, Route} from "react-router-dom"
import { createRoot } from "react-dom/client";
const App=()=>{
    const [loggedin,setLoggedIn]=useState(false);
    const [vinyls,setVinyls]=useState();
    async function fetchVinyls(){
        try{
            const response=await fetch("http://localhost:3000/api/vinyls");
            const vinylData=await response.json();
            setVinyls(vinylData)
            
        }catch (error){
            alert ("Error has occured")
        }
    }
    useEffect(()=>{
        fetchVinyls();
    },[])
    return (
        <BrowserRouter>
            <Header loggedin={loggedin}/>
            <Routes>
                <Route path ="" element={
                    <Homepage
                        vinyls={vinyls}
                        loggedin ={loggedin}
                        fetchvinyls={fetchVinyls}/>
                //INCOMPLETE
                }/>
            </Routes>
        </BrowserRouter>
    )
}