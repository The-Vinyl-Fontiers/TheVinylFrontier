import {Link} from "react-router-dom";
import Logout from "./Logout";
import {FaUserAlt, FaHistory, FaSignOutAlt, FaSignInAlt,FaPlusSquare, FaShoppingCart} from "react-icons/fa";
import { useEffect, useState } from "react";
const Navbar= (props) => {
    const {loggedIn,setLoggedIn, cart, currentUser}=props
    const [itemCount, setItemCount] = useState();

    function countProducts() {
        let num = 0;
        if(cart.products) {
          for(let i = 0; i < cart.products.length; i++) {
            num += cart.products[i].quantity
          }
          setItemCount(num)
        }
        
      }
      
      useEffect(()=> {
        countProducts()
      }, [cart])

    return(
        <div>
            <nav className="navbar">
                <ul className="navbar-navigate">
                    {
                        props.loggedIn ?(
                            <div>
                                <li className="navbar-item">
                                    <Link className="link" to="/profile">
                                    <FaUserAlt className="icon"/>
                                        <span className="link-text">Profile</span>
                                    </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="link"to="/orders">
                                <FaHistory className="icon"/>
                                <span className="link-text">Orders</span>
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/cart" className= "link">
                                    <FaShoppingCart className="icon" />
                                    <span className="link-text">Cart [{itemCount}]</span>
                                </Link> 
                            </li>
                            <li className="navbar-item">
                                <Link className= "link" to="/logout">
                                <FaSignOutAlt className="icon"/>
                                <span className="link-text">Logout</span>
                                </Link>
                            </li>

                                
                            </div>
                        ):<div>
                            <li className="navbar-item">
                                <Link className="link" to="login">
                                    <FaSignInAlt className="icon"/>
                                    <span className="link-text">Login</span>
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="link" to="/register">
                                <FaPlusSquare className="icon"/>
                                <span className="link-text">Register</span>
                                </Link>
                            </li>
                                        
                        </div>
                    }

                </ul>
            </nav>
        </div>
    )

}

export default Navbar