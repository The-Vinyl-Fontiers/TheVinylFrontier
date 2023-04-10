
const Filterbar = ({ filters, onFilterChange }) => {
    const availableFilters = ['Rock', 'Pop', 'Jazz', 'Rap','Electronic','Indie','Featured'];
  
    return (
      <div className="filtersContainer">
        <h2>Filters</h2>
        <hr></hr>
        {availableFilters.map(filter => (
          <label className="filterName"key={filter}>
            <input className ="checkBox"type="checkbox" value={filter} checked={filters.includes(filter)} onChange={onFilterChange} />
            {filter}
          </label>
        ))}
      </div>
    );
  };
  
  export default Filterbar;