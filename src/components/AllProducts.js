import { useState } from "react";

const AllProducts = (props) =>{
    const {vinyls} = props

    console.log(vinyls)
    return(
        <div>
            {
                vinyls ? vinyls.map((vinyl) =>{
                    return(
                        <div key={vinyl.id}>
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
    )
}
export default AllProducts