import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import AddToCart from "./AddToCart";
const AllProducts = (props) =>{
    const {vinyls} = props
    const [featured, setFeatured] = useState()

    function filterFeatured () {
        let featured = vinyls.filter(
            vinyl => vinyl.tags.includes("Featured")
        )
        setFeatured(featured)
    }

    useEffect(()=> {
        filterFeatured()
    },[])

    return(
        <div>
            <div className="itemContainer">
                {
                    featured ? featured.map((vinyl) =>{
                        return(
                            <div className="singleItem">
                            <Link to={`/vinyl/${vinyl.id}`} key={vinyl.id}>
                                <p className="vinylTitle">{vinyl.title}</p>
                                <p>{vinyl.artist}</p>
                                <p>${vinyl.price}</p>
                                <p>{vinyl.yearReleased}</p>
                                <img src={`${vinyl.imgURL}`} className="vinylImg"/>
                            </Link>
                            <AddToCart vinyl = {vinyl} cart={props.cart} setCart= {props.setCart} currentUser= {props.currentUser}/>
                            </div>
                        )
                    }) : "No data loaded"
                }
        </div>
        </div>
    )
}
export default AllProducts