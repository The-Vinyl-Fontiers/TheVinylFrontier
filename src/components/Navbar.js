import {Link} from "react-router-dom";
import Logout from "./Logout";
import {FaUserAlt, FaHistory, FaSignOutAlt, FaSignInAlt,FaPlusSquare} from "react-icons/fa";
const Navbar= (props) => {
    return(
        <div>
            <nav className="navbar">
                <ul className="navbar-navigate">
                    <li className="navbar-item">
                        <Link className="link" to="login">
                            <FaSignInAlt className="icon"/>
                            <span class="link-text">Login</span>
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="link" to="/profile">
                        <FaUserAlt className="icon"/>
                            <span class="link-text">Profile</span>
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="link"to="/orders">
                        <FaHistory className="icon"/>
                        <span class="link-text">Orders</span>
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="link" to="/register">
                        <FaPlusSquare className="icon"/>
                        <span class="link-text">Register</span>
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className= "link" to="/logout">
                        <FaSignOutAlt className="icon"/>
                        <span class="link-text">Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )

}

export default Navbar