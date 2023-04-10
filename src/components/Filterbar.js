import { useEffect } from "react";
import { useState } from "react";

const Filterbar = ({ filters, onFilterChange }) => {
    const usedFilters = ['Rock', 'Pop', 'Jazz', 'Rap','Electronic','Indie','Featured'];
  
    return (
      <div className="filtersContainer">
        <h2>Filters</h2>
        <hr></hr>
        {usedFilters.map(filter => (
          <label className="filterName"key={filter}>
            <input className ="checkBox"type="checkbox" value={filter} checked={filters.includes(filter)} onChange={onFilterChange} />
            {filter}
          </label>
        ))
        }
      </div>
    );
  };
  
  export default Filterbar;