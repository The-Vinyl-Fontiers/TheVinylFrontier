import { useState } from "react";
import {Link} from "react-router-dom"
const AllProducts = (props) =>{
    const {vinyls} = props

    console.log(vinyls)
    return(
        <div>
            <div className="itemContainer">
                {
                    vinyls ? vinyls.map((vinyl) =>{
                        return(
                            <Link to={`/vinyl/${vinyl.id}`} className="singleItem"key={vinyl.id}>
                                <p className="vinylTitle">{vinyl.title}</p>
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
export default AllProducts