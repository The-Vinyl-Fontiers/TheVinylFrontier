import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleProduct = (props) => {
    const {vinyls} = props;
    const {vinylID} = useParams();

    const [thisVinyl, setThisVinyl] = useState("")

    //filter through vinyls and assign the selected vinyl to thisVinyl
    async function filterVinyls () {
        let filteredVinyl = vinyls.filter(
            vinyl => vinyl.id == vinylID
        )[0]
        setThisVinyl(filteredVinyl)
    }

    useEffect(()=>{
        filterVinyls()
        
    },[])

    const {imgURL, title, price, artist, yearReleased, tags} = thisVinyl

    return(
        <div>
            {
                thisVinyl ? (
                <div>
                    <img src={imgURL} />
                    <p>{title}</p>
                    <Link to={`/artists/${artist}`}> {artist}</Link>
                    <p>${price}</p>
                    <p>{yearReleased}</p>
                    <div>
                        Tags: 
                     {
                        tags ? tags.map((tag) => 
                        <span key={tag}>{tag}</span>
                        ) : "No tags"
                     }
                     </div>
                </div>) : 
                "Data Loading..."
            }
            
        </div>
    )

}

export default SingleProduct;