import {useState,useEffect} from "react"
import {AllProducts, SingleArtist, Car, Checkout, Filterbar, Header, Homepage, Login, Logout, OrderHistory,PaymentScreen,Postform, Profile,Register,SingleProduct, Artists, Search, Navbar, Cart, Admin} from './components'
import {BrowserRouter, Routes, Link, Route} from "react-router-dom"
import { createRoot } from "react-dom/client";
const App=()=>{
    const [vinyls, setVinyls] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")
    const [cart, setCart] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const token = localStorage.getItem("token");
    async function fetchVinyls() {
        console.log("fetching vinyls")
        try {
            const response=await fetch("http://localhost:3001/api/vinyls");
            const vinylData=await response.json();
            console.log(vinylData)
            setVinyls(vinylData)
        } catch (error) {
            console.log(error)
        }
    }
    async function fetchCurrentUser() {
        console.log("fetching user data")
        if(token) {
            try {
                const response = await fetch("http://localhost:3001/api/users/me",
                {
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    }
                });
                const data = await response.json()
                console.log(data)
                setCurrentUser(data)
                setLoggedIn(true)
            } catch (error) {
                console.log(error)
            }
        }
        
    }
    async function fetchCurrentCart() {
        if(token) {
            try {
                const response = await fetch("http://localhost:3001/api/orders/me/cart" ,{
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    }
                });
                const data = await response.json();
                console.log(data)
                setCart(data)
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(()=>{
        fetchVinyls()
        fetchCurrentUser()
        fetchCurrentCart()
    },[])

    //fetch the current user data anytime the token is changed, i.e. deleted or added
    useEffect(()=>{
        fetchCurrentUser()
    },[token])

    return (
        <BrowserRouter>
            <Header loggedIn={loggedIn} setSearchTerm={setSearchTerm} searchTerm={searchTerm} vinyls={vinyls} currentUser={currentUser}/>
            <Navbar loggedIn={loggedIn}/>
            <Routes>
                <Route path ="" element={
                    <Homepage vinyls = {vinyls} cart={cart} setCart = {setCart}/>
                //INCOMPLETE
                }/>
                <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser}/>} />
                <Route path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                {/* <Route path="/orders" element={<OrderHistory />}/> */}
                <Route path="/login" element = {<Login setLoggedIn = {setLoggedIn} setCurrentUser={setCurrentUser}/>} />
                <Route path="/register" element = {<Register LoggedIn = {setLoggedIn}/>} />
                <Route path ="/vinyl/:vinylID" element = {<SingleProduct vinyls = {vinyls} cart={cart} setCart={setCart}/>} />
                <Route path="/artists/:artistName" element = {<SingleArtist vinyls = {vinyls}/>} />
                <Route path="/artists" element = {<Artists vinyls = {vinyls}/>} />
                <Route path="/search" element= {<Search searchTerm={searchTerm} vinyls={vinyls}/>} />
                <Route path="/cart" element ={<Cart cart={cart} setCart={setCart} vinyls = {vinyls}/>} />
                <Route path="/admin" element= {<Admin currentUser={currentUser} vinyls={vinyls} setVinyls={setVinyls}/>} />
             </Routes>
        </BrowserRouter>
    )
}
createRoot (document.getElementById("app")).render (<App />)
//test