import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddToCart from "./AddToCart";

const SingleProduct = (props) => {
    const {vinyls,cart, setCart} = props;
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
                    <img src={imgURL} className="vinylImg"/>
                    <p>{title}</p>
                    <Link to={`/artists/${artist}`}> {artist}</Link>
                    <p>${price}</p>
                    <p>{yearReleased}</p>
                    <div>
                        Tags: 
                     {
                        tags ? tags.map((tag) => 
                        <span key={tag}>{tag} </span>
                        ) : "No tags"
                     }
                     <AddToCart vinyl = {thisVinyl} setCart={setCart} cart= {cart} currentUser={props.currentUser}/>
                     </div>
                </div>) : 
                "Data Loading..."
            }
            
        </div>
    )

}

export default SingleProduct;