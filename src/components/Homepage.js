import { useState, useEffect } from 'react';
import { AllProducts, Navbar } from './index';

const HomePage = (props) => {
  const { vinyls } = props;
  const [filters, setFilters] = useState([]);
  const [filteredVinyls, setFilteredVinyls] = useState(vinyls);

  const handleFilterChange = (event) => {
    const filterHasBeenChosen = event.target.value;

    if (filters.includes(filterHasBeenChosen)) {
      setFilters(filters.filter(filter => filter !== filterHasBeenChosen));
    } else {
      setFilters([filters, filterHasBeenChosen]);
    }
  };

  useEffect(() => {
    const filtered = vinyls.filter(vinyl => filters.every(filter => vinyl.tags.includes(filter)));
    setFilteredVinyls(filtered);
  }, [filters, vinyls]);

  return (
    <div  className="animation">
      <AllProducts vinyls={filteredVinyls} cart={props.cart} setCart={props.setCart} currentUser={props.currentUser}/>
    </div>
  );
};

export default HomePage;