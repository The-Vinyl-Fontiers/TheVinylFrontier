import { useState } from "react";
import EditVinyl from "./EditVinyl";
import DeleteVinyl from "./DeleteVinyl";

const Admin = (props) => {
    const {currentUser, vinyls, setVinyls} = props;
    const {isAdmin} = currentUser
    const token = localStorage.getItem("token");

    const [addVinylShown, setAddVinylShown] = useState(false);

    //State for added vinyl
    const [newTitle, setNewTitle] = useState();
    const [newArtist, setNewArtist] = useState();
    const [newPrice, setNewPrice] = useState();
    const [newYear, setNewYear] = useState();
    const [newImgURL, setNewImgURL] = useState();
    //TODO: Function and input form to add a new vinyl to the db
    async function addNewVinyl() {
        if(!newTitle || !newArtist || !newPrice || !newYear) {
            alert("You must include a title, artist, price, and year realeased!")
            return
        } else {
            try {
                const response = await fetch("http://localhost:3001/api/vinyls", {
                    method: "POST",
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    }, 
                    body: JSON.stringify({
                        title: newTitle,
                        artist: newArtist,
                        yearReleased: newYear,
                        price: parseFloat(newPrice),
                        imgURL: newImgURL
                    })
                })
                const data = await response.json();
                console.log(data)
                setVinyls([...vinyls, data])
                setAddVinylShown(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    //TODO: Function to fetch user data and display
    //TODO: Function and input form to make a user an admin
        //Add api function to fetch all users



    return(
        <div>
            {
                !isAdmin ? "You do not have permission to access. OwO" :
                <div>
                    Welcome to the admin page!
                    {/* TODO display all vinyls with edit button */}
                    <div>
                        <h3>Vinyls</h3>
                        {
                            vinyls ? vinyls.map((vinyl) => {
                                return(
                                    <div key={vinyl.id}>
                                        <p>{vinyl.title}</p>
                                        <p>{vinyl.artist}</p>
                                        <p>{vinyl.price}</p>
                                        <EditVinyl vinyl={vinyl} vinyls={vinyls} setVinyls={setVinyls}/>
                                        <DeleteVinyl vinyl={vinyl} vinyls={vinyls} setVinyls={setVinyls}/>
                                    </div>
                                )
                            }) : "Loading..."
                        }

                        {
                            addVinylShown ? 
                            <div>
                                <form onSubmit={(event) => {
                                    event.preventDefault()
                                    addNewVinyl()
                                }}>
                                    <input type="text" placeholder = "Title"  onChange={(event => {
                                        setNewTitle(event.target.value)
                                    })} value={newTitle}></input>
                                    <input type="text" placeholder = "Artist"onChange={(event => {
                                        setNewArtist(event.target.value)
                                    })}  value={newArtist} ></input>
                                    <input type="text" placeholder = "Price"  onChange={(event => {
                                        setNewPrice(event.target.value)
                                    })} value={newPrice}></input>
                                    <input type="text" placeholder = "Year Released"  onChange={(event => {
                                        setNewYear(event.target.value)
                                    })} value={newYear}></input>
                                    <input type="text" placeholder = "Image URL"  onChange={(event => {
                                        setNewImgURL(event.target.value)
                                    })} value={newImgURL}></input>
                                    <button type="submit">Add vinyl</button>
                                </form>
                            </div> : 
                             <button onClick={(event => {
                                event.preventDefault()
                                setAddVinylShown(true)
                             })}>Add New Vinyl</button>
                        }
                       
                    </div>
                </div>
            }
        </div>
    )
}

export default Admin