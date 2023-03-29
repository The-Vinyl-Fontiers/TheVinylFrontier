import { useEffect,useState } from "react";
import {useNavigate} from 'react-router-dom';
const Postform = (props) =>{
    const [setLoggedIn, vinyls, setvinyls]=props;
    const [createVinylButton, setCreateVinylButton]= useState(false);
    const [createVinylTitle,setCreateVinylTitle]=useState(false);
    const [createVinylArtist,setCreateVinylArtist]=useState(false);
    const [createVinylRelease,setCreateVinylRelease]=useState(false);
    const [createVinylPrice,setCreateVinylPrice]=useState(false);
    const [createVinylImage,setCreateVinylImage]=useState(false);
    const [createVinylTags,setCreateVinylTags]=useState(false);
    function toggleVinylPostForm(){
        setCreateVinylButton(!createVinylButton)
    };
    const nav=useNavigate();
    useEffect(()=>{
        if (localStorage.getItem("token")){
            setLoggedIn(true);
        }else {
            setLoggedIn(false)
            alert ("Please Login to Post")
        };
        
    }, []);


    event.preventDefault();
const tokenKey=localStorage.getItem("token")
const createPost= async (event) =>{
    try{
        const response = await fetch ('http://localhost:3000/api/vinyls', {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${tokenKey}`
            },
            body:JSON.stringify({
                title: createVinylTitle,
                artist: createVinylArtist,
                price: createVinylPrice,
                yearReleased: createVinylPrice,
                imgURL: createVinylImage,
                tags: createVinylTags
            })
        });
        const translation = await response.json();
        if (!translation){
            alert ("Error creating a post")
        }else {
            setvinyls
            console.log(success)
        }

    }catch (error){
    alert ("Error While Posting")}


}
    return(
        <div>
            <div>
                <button onClick={toggleVinylPostForm}>+</button>
                    {
                        createVinylButton ?(
                            <form onSubmit = {createPost}>
                                <input
                                type="text"
                                value={createVinylTitle}
                                onChange={(event)=>{setCreateVinylTitle}} placeholder="Title"/>
                                <input
                                type="text"
                                value={createVinylArtist}
                                onChange={(event)=>{setCreateVinylArtist}}placeholder="Artist"/>
                                <input
                                type="text"
                                value={createVinylRelease}
                                onChange={(event)=>{setCreateVinylRelease}}placeholder="Release Date"/>
                                <input
                                type="text"
                                value={createVinylTags}
                                onChange={(event)=>{setCreateVinylTags}}placeholder="Tags"/>
                                <input
                                type="text"
                                value={createVinylImage}
                                onChange={(event)=>{setCreateVinylImage}}placeholder="ImageURL"/>
                                <input
                                type="text"
                                value={createVinylPrice}
                                onChange={(event)=>{setCreateVinylPrice}}placeholder="Price"/>
                                <button type="Submit">Post</button>
                            </form>
                        ) : ""
                    }
            </div>
        </div>
    )

}