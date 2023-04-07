import { useState } from "react";
import {Link} from "react-router-dom"
import AddToCart from "./AddToCart";
const AllProducts = (props) =>{
    const {vinyls} = props

    return(
        <div>
            <div className="itemContainer">
                {
                    vinyls ? vinyls.map((vinyl) =>{
                        return(
                            <div>
                            <Link to={`/vinyl/${vinyl.id}`} className="singleItem"key={vinyl.id}>
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