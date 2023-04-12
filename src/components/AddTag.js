import { useState } from "react";

const AddTag = (props) => {
    const {vinyl, vinyls, setVinyls, allTags} = props;
    const token = localStorage.getItem("token");

    const [selectedTagID, setSelectedTagID] = useState()

    async function addTagToVinyl() {
        if(!selectedTagID) {
            alert("Please select a tag")
            return
        }
        try {
            const response = await fetch(`https://thevinylfrontier-server.onrender.com/api/vinyls/${vinyl.id}`,
            {
                method: "POST",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({
                    tagID: selectedTagID
                })
            });
            const data = await response.json()
            console.log(data)
            let newVinyls = vinyls.map((singleVinyl) => {
                if(singleVinyl.id == vinyl.id){
                    return data
                } else {
                    return singleVinyl
                }
            })
            setVinyls(newVinyls)
        } catch (error) {
            console.log(error)
        }
    }



    return(
        <form onSubmit={(event) => {
            event.preventDefault()
            addTagToVinyl()
        }}>
            <select onChange={(event) => setSelectedTagID(event.target.value)}>
                <option value="">Select a tag</option>
                {
                    allTags ? allTags.map((tag) => {
                        return(
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        )
                    }) : <option >Loading tags..</option>
                }
            </select>
            <button type="submit">Add tag</button>
        </form>
    )
}

export default AddTag;