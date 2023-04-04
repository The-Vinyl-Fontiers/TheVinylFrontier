import { useState } from "react";

const EditVinyl = (props) => {
    const {vinyl, vinyls, setVinyls} = props;
    const [editTitle, setEditTitle] = useState(vinyl.title);
    const [editArtist, setEditArtist] = useState(vinyl.artist);
    const [editPrice, setEditPrice] = useState(vinyl.price);
    const [editYear, setEditYear] = useState(vinyl.yearReleased);
    const [editImgURL, setEditImgURL] = useState(vinyl.imgURL);

    const token = localStorage.getItem("token");

    const [editFormShown, setEditFormShown] = useState(false)

    async function patchVinyl() {
        try {
            const response = await fetch("http://localhost:3001/api/vinyls", {
                method: "PATCH",
                headers: {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    } ,
                body: JSON.stringify({
                    title: editTitle,
                    artist: editArtist,
                    yearReleased: editYear,
                    price: parseFloat(editPrice),
                    imgURL: editImgURL,
                    id: vinyl.id
                })
            })
            const data = await response.json();
            console.log(data)
            //filter through vinyls and replace the updated one
            let newVinyls = vinyls.map((singleVinyl) => {
                if(singleVinyl.id == vinyl.id){
                    return data
                } else {
                    return singleVinyl
                }
            })
            setVinyls(newVinyls)
            // console.log(newVinyls)
            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
        {
            editFormShown ? 
            <div> 
                <form onSubmit={(event) => {
                    event.preventDefault()
                    patchVinyl()
                    setEditFormShown(false)
                }}>
                    <input type="text" value={editTitle} onChange={(event) => setEditTitle(event.target.value)}></input>
                    <input type="text" value={editArtist} onChange={(event) => setEditArtist(event.target.value)}></input>
                    <input type="text" value={editPrice} onChange={(event) => setEditPrice(event.target.value)}></input>
                    <input type="text" value={editYear} onChange={(event) => setEditYear(event.target.value)}></input>
                    <input type="text" value={editImgURL} onChange={(event) => setEditImgURL(event.target.value)}></input>
                    <button type="submit">Save</button>
                </form>
            </div> : <button onClick={(event)=>{
                event.preventDefault()
                setEditFormShown(true);
            }}>Edit</button>
        }
        </div>
    )
}

export default EditVinyl;