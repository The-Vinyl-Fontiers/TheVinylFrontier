import { useEffect } from "react";
import { useState } from "react";

const Filterbar = ({ filters, onFilterChange }) => {
    const availableFilters = ['Rock', 'Pop', 'Jazz', 'Rap','Electronic','Indie','Featured'];
    const [allTags, setAllTags] = useState()

    async function fetchAllTags () {
      try {
          const response = await fetch("http://localhost:3001/api/tags/",
          {
              headers : {
                  'Content-Type' : 'application/json'
              }
          });
          const data = await response.json()
          console.log(data)
         setAllTags(data)
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(()=> {
    fetchAllTags()
  },[])
  
    return (
      <div className="filtersContainer">
        <h2>Filters</h2>
        <hr></hr>
        { allTags ? allTags.map(filter => (
          <label className="filterName"key={filter.name}>
            <input className ="checkBox"type="checkbox" value={filter.name} checked={filters.includes(filter.name)} onChange={onFilterChange} />
            {filter.name}
          </label>
        )) : ""}
      </div>
    );
  };
  
  export default Filterbar;