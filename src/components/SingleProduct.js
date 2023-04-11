import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddToCart from "./AddToCart";

const SingleProduct = (props) => {
    const {vinyls,cart, setCart} = props;
    const {vinylID} = useParams();

    const [thisVinyl, setThisVinyl] = useState("")
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
        <div  className="animation">
            {
                thisVinyl ? (
                <div className="singleItem">
                    <img src={imgURL} className="vinylImg"/>
                    <p className="vinylTitle">{title}</p>
                    <Link className="vinylDetails" to={artist != "AC/DC" ? `/artists/${artist}` : '/artists/AC%2fDC'}> {artist}</Link>
                    <p className="vinylDetails">${price}</p>
                    <p className="vinylDetails">{yearReleased}</p>
                    <div className="vinylDetails">
                        Tags: 
                     {
                        tags ? tags.map((tag) => 
                        <span  className="vinylDetails" key={tag}>{tag} </span>
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