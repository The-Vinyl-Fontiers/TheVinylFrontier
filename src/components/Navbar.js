import {Link} from "react-router-dom";
import Logout from "./Logout";
const Navbar= (props) => {
    return(
        <div>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/orders">Orders</Link>
                    </li>
                    <li>
                        <Logout />
                    </li>
                </ul>
            </nav>
        </div>
    )

}

export default Navbar