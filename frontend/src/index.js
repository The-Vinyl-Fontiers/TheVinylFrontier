
import {useState,useEffect} from "react"
import {AllProducts, Car, Checkout, Filterbar, Header, Homepage, Login, Logout, OrderHistory,PaymentScreen,Postform, Profile,Register,SingleProduct} from './components'
import {BrowserRouter, Routes, Link, Route} from "react-router-dom"
import { createRoot } from "react-dom/client";
const App=()=>{
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