import { useState } from "react";

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
                                <p>{vinyl.title}</p>
                                <p>{vinyl.artist}</p>
                                <p>${vinyl.price}</p>
                                <p>{vinyl.yearReleased}</p>
                                <img src={`${vinyl.imgURL}`} className="vinylImg"/>
                            </div>
                        )
                    }) : "No data loaded"
                }
        </div>
        </div>
    )
}
export default AllProducts