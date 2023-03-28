import {Link} from "react-router-dom"
import {Navbar} from "../components"
const Header =  ({loggedIn}) => {
    return (
        <div>
            <Link to ="/">
                <div>Vinyls</div>
            </Link>
            <Navbar loggedIn={loggedIn}/>
        </div>
    )
}
export default Header