import {useState,useEffect} from "react"
import {AllProducts, Car, Checkout, Filterbar, Header, Homepage, Login, Logout, OrderHistory,PaymentScreen,Postform, Profile,Register,SingleProduct} from './components'
import {BrowserRouter, Routes, Link, Route} from "react-router-dom"
import { createRoot } from "react-dom/client";
const App=()=>{
    const [vinyls, setVinyls] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    async function fetchVinyls() {
        console.log("fethcing vinyls")
        try {
            const response=await fetch("http://localhost:3001/api/vinyls");
            console.log(response)
            const vinylData=await response.json();
            console.log(vinylData)
            setVinyls(vinylData)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchVinyls()
    },[])
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path ="" element={
                    <Homepage vinyls = {vinyls}/>
                //INCOMPLETE
                }/>
                <Route path="/login" element={<Login/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<OrderHistory />}/>
                <Route path ="/register" element={<Register />}/>

            </Routes>
        </BrowserRouter>
    )
}
createRoot (document.getElementById("app")).render (<App />)
//test