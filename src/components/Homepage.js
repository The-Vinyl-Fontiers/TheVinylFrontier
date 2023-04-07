import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AllProducts, Navbar } from './index';
import { AddToCart } from '../components';
import {Filterbar} from '../components';

const HomePage = (props) => {
  const { vinyls } = props;
  const [filters, setFilters] = useState([]);
  const [filteredVinyls, setFilteredVinyls] = useState(vinyls);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;

    if (filters.includes(selectedFilter)) {
      setFilters(filters.filter(filter => filter !== selectedFilter));
    } else {
      setFilters([...filters, selectedFilter]);
    }
  };

  useEffect(() => {
    const filtered = vinyls.filter(vinyl => filters.every(filter => vinyl.tags.includes(filter)));
    setFilteredVinyls(filtered);
  }, [filters, vinyls]);

  return (
    <div>
      <Filterbar filters={filters} onFilterChange={handleFilterChange} />
      <AllProducts vinyls={filteredVinyls} cart={props.cart} setCart={props.setCart} currentUser={props.currentUser}/>
      {/* <Navbar /> */}
      <div>
        <p>blah blah blah blah</p>
      </div>
      {
        props.loggedIn ? (
          <div>
            {/* Cart, logout, profile shows up, register leaves */}
          </div>
        ) : (
          <div>
            Please log in to access more features blah blah blah
          </div>
        )
      }
    </div>
  );
};

export default HomePage;