import { useState } from "react";


const DeleteVinyl = (props) => {
    const {vinyl, vinyls, setVinyls} = props;
    const token = localStorage.getItem("token");

    const [confirmButtonShown, setConfirmButtonShown] = useState(false)
    
    async function deleteVinyl() { 
        try {
            const response = await fetch(`https://thevinylfrontier-server.onrender.com/api/vinyls/${vinyl.id}`,{
                method: "DELETE",
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                } 
            })
            const data = await response.json();
            console.log(data)
            if(data.id) {
                alert(`${vinyl.title} has been successfully deleted.`)
                const filteredVinyls = vinyls.filter(
                    singleVinyl => singleVinyl.id != vinyl.id
                )
                setVinyls(filteredVinyls)
            }else{
                alert(data.message)
            }          
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
        
        {
            confirmButtonShown ? 
            <button onClick={(event) => {
                event.preventDefault()
                deleteVinyl()
            }}>
                Confirm Delete
            </button>: 
            <button onClick={(event) => {
            event.preventDefault()
            setConfirmButtonShown(true)
            }}>
                Delete
            </button>
        }
    </div>)
}

export default DeleteVinyl;