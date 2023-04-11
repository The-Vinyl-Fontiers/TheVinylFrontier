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
                <p className="itemContainerTitle">Featured Items</p>
                {
                    featured ? featured.map((vinyl) =>{
                        return(
                            <div className="singleItem">
                            <Link className="itemLink" to={`/vinyl/${vinyl.id}`}key={vinyl.id}>
                                <img src={`${vinyl.imgURL}`} className="vinylImg"/>
                                <p className="vinylTitle">{vinyl.title}</p>
                                <p className="vinylDetails">{vinyl.artist}</p>
                                <p className="vinylDetails">${vinyl.price}</p>
                                <p className="vinylDetails">{vinyl.yearReleased}</p>

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