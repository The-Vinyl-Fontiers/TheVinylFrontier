import {Link} from "react-router-dom"
import {Navbar} from "../components"
const Header =  ({loggedIn}) => {
    return (
        <div className="title">
            <Link to ="/">
                <div className="title">Vinyls</div>
            </Link>
        </div>
    )
}
export default Header