import { useEffect, useState } from "react";
import EditVinyl from "./EditVinyl";
import DeleteVinyl from "./DeleteVinyl";
import AddTag from "./AddTag";
import RemoveTag from "./RemoveTag";
import "./Admin.css"
import ChangeUserAdmin from "./ChangeUserAdmin";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

const Admin = (props) => {
    const {currentUser, vinyls, setVinyls, fetchCurrentCart ,fetchVinyls} = props;
    const {isAdmin} = currentUser
    const token = localStorage.getItem("token");
    const [addVinylShown, setAddVinylShown] = useState(false);
    const [addNewTagShown, setAddNewTagShow] = useState(false)
    const [allUsers, setAllUsers] = useState({})
    const [allTags, setAllTags] = useState()
    const [newTitle, setNewTitle] = useState();
    const [newArtist, setNewArtist] = useState();
    const [newPrice, setNewPrice] = useState();
    const [newYear, setNewYear] = useState();
    const [newImgURL, setNewImgURL] = useState();
    const [tagName, setTagName] = useState();

    const [deletedTagID, setDeletedTagID] = useState();
    async function addNewVinyl() {
        if(!newTitle || !newArtist || !newPrice || !newYear) {
            alert("You must include a title, artist, price, and year realeased!")
            return
        } else {
            try {
                const response = await fetch("https://thevinylfrontier-server.onrender.com/api/vinyls", {
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


    async function fetchAllUsers () {
        try {
            const response = await fetch("https://thevinylfrontier-server.onrender.com/api/users/",
            {
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            });
            const data = await response.json()
            console.log(data)
           setAllUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchAllTags () {
        try {
            const response = await fetch("https://thevinylfrontier-server.onrender.com/api/tags/",
            {
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            });
            const data = await response.json()
            console.log(data)
           setAllTags(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function createNewTag () {
        if(!tagName) {
            alert("Please enter a tag name")
            return
        }
        try {
            const response = await fetch("https://thevinylfrontier-server.onrender.com/api/tags/",
            {
                method: "POST",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body : JSON.stringify({
                    name: tagName
                })
            });
            const data = await response.json()
            console.log(data)
           setAllTags([...allTags, data])
           setAddNewTagShow(false)
        } catch (error) {
            console.log(error)
        }
    }

    async function removeTagFromDB() {
        if(!deletedTagID) {
            alert("Please select a tag to delete")
            return
        }
        try {
            const response = await fetch(`https://thevinylfrontier-server.onrender.com/api/tags/${deletedTagID}`,
            {
                method: "DELETE",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            });
            const data = await response.json()
            alert("Tag deleted successfully")
            fetchCurrentCart()
            fetchVinyls()
            setAllTags(data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=> {
        fetchAllUsers()
        fetchAllTags()
    },[])



    return(
        <div>
            {
                !isAdmin ? "You do not have permission to access. OwO" :
                <div id="adminContainer">
                    <div id="adminVinylContainer">
                        <h3>Vinyls</h3>
                        {
                            vinyls ? vinyls.map((vinyl) => {
                                return(
                                    <div key={vinyl.id} className="adminSingleVinyl">
                                        <div className="adminVinylData">
                                        <p>{vinyl.title}</p>
                                        <p>{vinyl.artist}</p>
                                        <p>${vinyl.price}</p>
                                        <p>Tags:  </p>
                                        <div className="adminVinylTags">
                                        {
                                             vinyl.tags ? vinyl.tags.map((tag)=> {
                                                return (
                                                    <div className= "indTag"style={{display: "flex", alignItems: "center"}}>
                                                        <p>{tag}</p>
                                                        <RemoveTag vinyl={vinyl} vinyls={vinyls} setVinyls={setVinyls} tag={tag} allTags={allTags}/>
                                                          </div>
                                                    
                                                )
                                            }) : "Tags loading..."
                                        }
                                        </div>
                                        </div>
                                        
                                        
                                        <img src={`${vinyl.imgURL}`} className="vinylImg"/>
                                        <div>
                                        <EditVinyl vinyl={vinyl} vinyls={vinyls} setVinyls={setVinyls} fetchCurrentCart={fetchCurrentCart}/>
                                        <DeleteVinyl vinyl={vinyl} vinyls={vinyls} setVinyls={setVinyls}/>
                                        <AddTag vinyl={vinyl} vinyls={vinyls} setVinyls={setVinyls} allTags={allTags}/>
                                        </div>
                                    </div>
                                )
                            }) : "Loading..."
                        }

                        
                    </div>
                    <div id="adminInputForms"> 
                        <h3>New Vinyl or Tag</h3>
                    {
                            addVinylShown ? 
                            <div>
                                <form style={{display: "flex", flexDirection: "column", marginBottom: "5%"}} onSubmit={(event) => {
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
                                    <button onClick={(event) => {
                                        event.preventDefault();
                                        setAddVinylShown(false)
                                    }}>Cancel</button>
                                </form>
                            </div> : 
                             <button onClick={(event => {
                                event.preventDefault()
                                setAddVinylShown(true)
                             })}>Add New Vinyl</button>

                        }

                        {
                            addNewTagShown ? <form  style={{display: "flex", flexDirection: "column"}} onSubmit={(event) => {
                                event.preventDefault()
                                createNewTag()
                            }}>
                                <input type="text" placeholder="Tag name" onChange={(event) => setTagName(event.target.value)}></input>
                                <button type="submit">Add tag</button>
                                <button onClick={(event) => {
                                    event.preventDefault();
                                    setAddNewTagShow(false)
                                }}>Cancel</button>
                                    </form>
                            : <button onClick={(event => {
                                event.preventDefault()
                                setAddNewTagShow(true)
                             })}>Add New Tag</button>
                        }
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            removeTagFromDB()
                        }}>
                        <select onChange={(event) => setDeletedTagID(event.target.value)}>
                           <option value="" >Tag to delete</option>
                           {
                            
                                allTags ? allTags.map((tag) => {
                                    return(
                                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                                    )
                                }) : <option >Loading tags..</option>
                           }
                        </select>
                        <button>Delete Tag</button>
                        </form>
                        <div id="adminUserContainer"> 
                        <h3>Users</h3>
                        <div className="adminSingleUser">
                                        <p>Username</p>
                                        <p>ID</p>
                                        <p>Admin</p>
                                        <p>Active</p>
                                        <p>Edit</p>
                        </div>
                        {
                            allUsers.length ? allUsers.map((user) => {
                                return (
                                    <div key={user.id} className="adminSingleUser">
                                        <p>{user.username}</p>
                                        <p>{user.id}</p>
                                        <ChangeUserAdmin user={user} allUsers={allUsers} setAllUsers={setAllUsers}/>
                                        <DeleteUser user={user} allUsers={allUsers} setAllUsers={setAllUsers}/>
                                        <EditUser user={user} allUsers={allUsers} setAllUsers={setAllUsers}/>
                                    </div>
                                )
                            }): "Loading users..."
                        }
                    </div>
                    </div>
                    
                </div>
            }
        </div>
    )
}

export default Admin