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
                            <div className="singleItem"key={vinyl.id}>
                                <p className="itemTitle">{vinyl.title}</p>
                                <p className="itemPrice">{vinyl.artist}</p>
                                <p>${vinyl.price}</p>
                                <p>{vinyl.yearReleased}</p>
                                <Link to={`/vinyl/${vinyl.id}`}>
                                    <img src={`${vinyl.imgURL}`} className="vinylImg" />
                                </Link>
                            </div>
                        )
                    }) : "No data loaded"
                }
        </div>
        </div>
    )
}
export default AllProducts