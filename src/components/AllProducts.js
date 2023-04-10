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
    },[vinyls])

    return(
        <div>
            <div className="itemContainer">
                {
                    featured ? featured.map((vinyl) =>{
                        return(
                            <div>
                            <Link to={`/vinyl/${vinyl.id}`} className="singleItem"key={vinyl.id}>
                                <img src={`${vinyl.imgURL}`} className="vinylImg"/>
                                <p className="vinylTitle">{vinyl.title}</p>
                                <p>{vinyl.artist}</p>
                                <p>${vinyl.price}</p>
                                <p>{vinyl.yearReleased}</p>

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