import { useState } from "react";
import {FaTrashAlt} from "react-icons/fa"

const RemoveTag =(props) => {
    const {tag, allTags, vinyl, setVinyls, vinyls} = props;
    const token = localStorage.getItem("token");
    const [selectedTag, setSelectedTag] = useState()

    async function findTagID () {
        console.log("searching for tag: " + tag)
        let filteredTag = allTags.filter((singleTag) => {
            return singleTag.name == tag
        })[0]
        console.log(filteredTag)
        setSelectedTag(filteredTag)
    }

    async function removeTagFromVinyl() {
        try {
            // await findTagID()
            console.log(vinyl)
            let filteredTag = allTags.filter((singleTag) => {
                return singleTag.name == tag
            })[0]
            const response = await fetch(`https://thevinylfrontier-server.onrender.com/api/vinyls/${vinyl.id}/${filteredTag.id}`,
            {
                method: "DELETE",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            });
            const data = await response.json();
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
        <a onClick={removeTagFromVinyl}><FaTrashAlt className="icon"/></a>
    )
}

export default RemoveTag;