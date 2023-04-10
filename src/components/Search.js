import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Search = (props) => {
    const {searchTerm, vinyls} = props;
    const [searchedProducts, setSearchedProducts] = useState();

    async function searchProducts() {
        let filtered = ""
        if(searchTerm) {
            filtered = vinyls.filter((vinyl) => {
                //check if search term matches title or artist
                return vinyl.title.toLowerCase().includes(searchTerm.toLowerCase()) || vinyl.artist.toLowerCase().includes(searchTerm.toLowerCase())
            })
            setSearchedProducts(filtered)
        }
        else{
            setSearchedProducts(vinyls)
        }
        
    }


    //for useEffect have the search function run everytime the searchTerm is updated
    useEffect(()=>{
        searchProducts()
    },[searchTerm])

    return(
        <div>
        <div >
            {
                searchedProducts ? searchedProducts.map((vinyl) =>{
                    return(
                        <Link to={`/vinyl/${vinyl.id}`} className="singleItem"key={vinyl.id}>
                            <p>{vinyl.title}</p>
                            <p>{vinyl.artist}</p>
                            <p>${vinyl.price}</p>
                            <p>{vinyl.yearReleased}</p>
                            <img src={`${vinyl.imgURL}`} className="vinylImg"/>
                        </Link>
                    )
                }) : "No data loaded"
            }
    </div>
    </div>
    )
}


export default Search;