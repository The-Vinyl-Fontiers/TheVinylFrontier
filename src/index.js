import {useState,useEffect} from "react"
import {AllProducts, SingleArtist, Car, Checkout, Filterbar, Header, Homepage, Login, Logout, OrderHistory,PaymentScreen,Postform, Profile,Register,SingleProduct, Artists, Search} from './components'
import {BrowserRouter, Routes, Link, Route} from "react-router-dom"
import { createRoot } from "react-dom/client";
const App=()=>{
    const [vinyls, setVinyls] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")
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
            <Header loggedIn={loggedIn} setSearchTerm={setSearchTerm}/>
            <Routes>
                <Route path ="" element={
                    <Homepage vinyls = {vinyls}/>
                //INCOMPLETE
                }/>
                <Route path="/logout" element={<Logout/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<OrderHistory />}/>
                <Route path="/login" element = {<Login setLoggedIn = {setLoggedIn}/>} />
                <Route path="/register" element = {<Register setLoggedIn = {setLoggedIn}/>} />
                <Route path ="/vinyl/:vinylID" element = {<SingleProduct vinyls = {vinyls}/>} />
                <Route path="/artists/:artistName" element = {<SingleArtist vinyls = {vinyls}/>} />
                <Route path="/artists" element = {<Artists vinyls = {vinyls}/>} />
                <Route path="/search" element= {<Search searchTerm={searchTerm} vinyls={vinyls}/>} />
             </Routes>
        </BrowserRouter>
    )
}
createRoot (document.getElementById("app")).render (<App />)
//test