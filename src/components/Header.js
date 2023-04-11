import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

function SearchBar(props) {
  const [isActive, setIsActive] = useState(false);
 const {setSearchTerm, searchTerm} = props;
    const navigate = useNavigate()

  function handleSearch() {
    // let filtered = ""
    //     if(searchTerm) {
    //         filtered = vinyls.filter((vinyl) => {
    //             //check if search term matches title or artist
    //             return vinyl.title.toLowerCase().includes(searchTerm.toLowerCase()) || vinyl.artist.toLowerCase().includes(searchTerm.toLowerCase())
    //         })
    //         setSearchedProducts(filtered)
    //     }
    //     else{
    //         setSearchedProducts(vinyls)
    //     }
    navigate("/search")
  }

  return (
    <form className="searchContainer" onSubmit={(event) => {
      event.preventDefault()
      handleSearch()
      }}>
      <FaSearch onClick={() => setIsActive(!isActive)} className="searchIcon" />
      <input
        type="text"
        className={`searchBar ${isActive ? "active" : ""}`}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button className="button" type="submit">Search</button>
    </form>
  );
}

const Header=(props)=> {
  const { setSearchTerm ,searchTerm, currentUser, cart } = props;

  return (
    <div className="header">
      <div>
        <Link to="/" className="headerLink">
          <div className="title">Home</div>
        </Link>
        <Link to="/artists" className="headerLink">
          <div className="title">Artists</div>
        </Link>
        <Link to ="/vinyls" className="headerLink">
          <div className="title">Vinyls</div>
        </Link>
        {
          currentUser.isAdmin ? 
          <Link to="/admin" className="headerLink">
            <div className="title">Admin</div>
          </Link> : ""
        }
        <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} vinyls={props.vinyls}/>
      </div>
    </div>
  );
}

export default Header;