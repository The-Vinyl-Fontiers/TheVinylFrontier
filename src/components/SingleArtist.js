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
        <div>
            <p>{artistName}</p>
            {
                artistVinyls ? artistVinyls.map((vinyl) => {
                    return (
                        <div key={vinyl.id}>
                            <Link to={`/vinyl/${vinyl.id}`} >
                                <img src={vinyl.imgURL} className="vinylImg"/>
                            </Link>
                            <p>{vinyl.title}</p>
                            <p>${vinyl.price}</p>
                            <AddToCart vinyl = {vinyl} setCart={props.setCart} cart= {props.cart} currentUser={props.currentUser}/>
                        </div>
                    )
                }) :"Data loading..."
            }
        </div>
    )
}

export default SingleArtist;