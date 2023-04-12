import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddToCart from "./AddToCart";

const SingleArtist = (props) => {
    const {vinyls} = props;
    const {artistName} = useParams();

    const [artistVinyls, setArtistVinyls] = useState();

    //filter thorugh vinyls and find vinyls with matching artist name
    async function filterByArtist() {
        let filteredVinyls = vinyls.filter(
            vinyl => {
                console.log(vinyl.artist)
                return vinyl.artist == artistName
            }
        )

        setArtistVinyls(filteredVinyls)
    }

    useEffect(()=>{
        filterByArtist();
    },[])


    return (
        <div className="animation">
            <p className="singleArtistTitle">{artistName}</p>
            <div className="itemContainer2">
            {
                artistVinyls ? artistVinyls.map((vinyl) => {
                    return (
                        <div key={vinyl.id} className="singleItem2">
                        <Link className="itemLink" to={`/vinyl/${vinyl.id}`} >
                        <p className="vinylTitle">{vinyl.title}</p>
                        <p className="vinylDetails vinylArtist">{vinyl.artist}</p>
                        <p className="vinylDetails">${vinyl.price}</p>
                        <p className="vinylDetails">{vinyl.yearReleased}</p>
                            <img src={`${vinyl.imgURL}`} className="vinylImg2"/>
                        </Link>
                        <AddToCart vinyl={vinyl} cart={props.cart} setCart={props.setCart} currentUser={props.currentUser}/>
                        </div>
                    )
                }) :"Data loading..."
            }
            </div>
        </div>
    )
}

export default SingleArtist;