import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function SearchBar() {
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch() {
    ;
  }

  return (
    <div className="searchContainer">
      <FaSearch onClick={() => setIsActive(!isActive)} className="searchIcon" />
      <input
        type="text"
        className={`searchBar ${isActive ? "active" : ""}`}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

const Header=(props)=> {
  const { setSearchTerm } = props;

  return (
    <div className="header">
      <div>
        <Link to="/" className="headerLink">
          <div className="title">Vinyls</div>
        </Link>
        <Link to="/artists" className="headerLink">
          <div className="title">Artists</div>
        </Link>
        <Link to="/cart" className="headerLink">
          <div className="title">Cart</div>
        </Link>
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
    </div>
  );
}

export default Header;