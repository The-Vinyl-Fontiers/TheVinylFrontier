import {Link} from "react-router-dom";
import Logout from "./Logout";
import {FaUserAlt, FaHistory} from "react-icons/fa";
const Navbar= (props) => {
    return(
        <div>
            <nav className="navbar">
                <ul className="navbar-navigate">
                    <li className="navbar-item">
                        <Link className="link" to="/profile">
                        <FaUserAlt className="icon"/>
                            <span class="link-text">Profile</span>
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className= "link"to="/orders">
                        <FaHistory className="icon"/>
                        <span class="link-text">Orders</span>
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Logout className= "link"/>
                        <FaHistory className="icon"/>
                        <span class="link-text">Logout</span>
                    </li>
                </ul>
            </nav>
        </div>
    )

}

export default Navbar