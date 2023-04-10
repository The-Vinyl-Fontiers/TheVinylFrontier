import {Link} from "react-router-dom"
import AddToCart from "./AddToCart";
import {Filterbar} from '../components';
import {useState,useEffect} from "react"

const VinylPage = (props) =>{
    const {vinyls} = props
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

    return(
        <div>
             <Filterbar filters={filters} onFilterChange={handleFilterChange} />
            <div className="itemContainer2">
                {
                    filteredVinyls ? filteredVinyls.map((vinyl) =>{
                        return(
                            <div key={vinyl.id} className="singleItem2">
                                <Link to={`/vinyl/${vinyl.id}`} >
                                    <p className="vinylTitle">{vinyl.title}</p>
                                    <p>{vinyl.artist}</p>
                                    <p>${vinyl.price}</p>
                                    <p>{vinyl.yearReleased}</p>
                                    <img src={`${vinyl.imgURL}`} className="vinylImg2"/>
                                </Link>
                                <AddToCart vinyl={vinyl} cart={props.cart} setCart={props.setCart} currentUser={props.currentUser}/>
                            </div>
                        )
                    }) : "No data loaded"
                }
        </div>
        </div>
    )
}

export default VinylPage;
