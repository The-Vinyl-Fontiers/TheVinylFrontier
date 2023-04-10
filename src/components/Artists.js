import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Artists = (props) => {
    const {vinyls} = props

    const [artists, setArtists] = useState()

    //find unique artist names and set the state
    async function findArtists() {
        let foundArtists = []
        vinyls.map((vinyl) => {
            if(!foundArtists.includes(vinyl.artist)) {
                if(vinyl.artist == "AC/DC") {
                    foundArtists.push("AC%2FDC")
                }else {
                    foundArtists.push(vinyl.artist)     
                }
               
            }
        })
        console.log(foundArtists)
        foundArtists.sort()
        setArtists(foundArtists)
    }


    useEffect(() =>{
        findArtists()
    }, [])


    return(
        <div className="artistList">
            {
                artists ? artists.map((artist) => {
                    return(

                        <Link className="artistLink"to={`/artists/${artist}`} key={artist}>{
                            artist == "AC%2FDC" ? "AC/DC" : artist
                            }</Link>
                    ) 

                }) : "Data loading..."
            }
        </div>
    )
}

export default Artists;

