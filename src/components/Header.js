import {Link, useNavigate} from "react-router-dom"
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
                <Link to="/cart" className="headerLink">
                    <div className="title">Cart</div>
                </Link>
                <div className="searchContainer">
                <input type="text" className="searchBar" onChange={(event)=>
                setSearchTerm(event.target.value)}></input>
                <button onClick={() => navigate("/search")}>Search</button>
                </div>
            </div>
        </div>
    )
}
export default Header