import {Link} from "react-router-dom"
import {Navbar} from "../components"
const Header =  ({loggedIn}) => {
    return (
        <div className="header">
            <Link to ="/" className="headerLink">
                <div className="title">Vinyls</div>
            </Link>
        </div>
    )
}
export default Header