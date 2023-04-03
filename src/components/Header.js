import {Link, useNavigate} from "react-router-dom"
import {Navbar} from "../components"
const Header =  (props) => {
    const {setSearchTerm} = props;
    const navigate = useNavigate();
    return (
<div className="header">
            <div>
                <Link to ="/">
                    <div className="title">Vinyls</div>
                </Link>
                <Link to = "/artists">
                    <div className="title">Artists</div>
                </Link>
                <input type="text" onChange={(event)=>
                setSearchTerm(event.target.value)}></input>
                <button onClick={() => navigate("/search")}>Search</button>
            </div>
        </div>
    )
}
export default Header