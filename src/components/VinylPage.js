import {Link} from "react-router-dom"
import AddToCart from "./AddToCart";
import {Filterbar} from '../components';
import {useState,useEffect} from "react"

const VinylPage = (props) =>{
    const {vinyls} = props
    const [filters, setFilters] = useState([]);
    const [filteredVinyls, setFilteredVinyls] = useState(vinyls);
  
    const handleFilterChange = (event) => {
      const filterSelected = event.target.value;
  
      if (filters.includes(filterSelected)) {
        setFilters(filters.filter(filter => filter !== filterSelected));
      } else {
        setFilters([...filters, filterSelected]);
      }
    };
  
    useEffect(() => {
      const filtered = vinyls.filter(vinyl => filters.every(filter => vinyl.tags.includes(filter)));
      setFilteredVinyls(filtered);
    }, [filters, vinyls]);

    return(
        <div className="animation">
             <Filterbar filters={filters} onFilterChange={handleFilterChange} />
            <div className="itemContainer2">
                {
                    filteredVinyls ? filteredVinyls.map((vinyl) =>{
                        return(
                            <div key={vinyl.id} className="singleItem2">
                                <Link className="itemLink" to={`/vinyl/${vinyl.id}`} >
                                <p className="vinylTitle">{vinyl.title}</p>
                                <p className="vinylDetails">{vinyl.artist}</p>
                                <p className="vinylDetails">${vinyl.price}</p>
                                <p className="vinylDetails">{vinyl.yearReleased}</p>
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
