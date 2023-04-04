import {Link, useNavigate} from "react-router-dom"
import {Navbar} from "../components"
const Header =  (props) => {
    const {setSearchTerm} = props;
    const navigate = useNavigate();
    return (
<div className="header">
            <div>
                <Link to ="/" className="headerLink">
                    <div className="title">Vinyls</div>
                </Link>
                <Link to = "/artists" className="headerLink">
                    <div className="title">Artists</div>
                </Link>
                <Link to="/cart" >
                    <div className="title">Cart</div>
                </Link>
                <input type="text" onChange={(event)=>
                setSearchTerm(event.target.value)}></input>
                <button onClick={() => navigate("/search")} className="searchBar">Search</button>
            </div>
        </div>
    )
}
export default Header