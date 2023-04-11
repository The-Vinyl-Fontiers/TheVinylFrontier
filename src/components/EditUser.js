import { useState } from "react";

const EditUser = (props) => {
    const {user, allUsers, setAllUsers} = props
    const [updateUsername, setUpdateUsername] = useState(user.username);
    const [updatePassword, setUpdatePassword] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");

    const[editUserShown, setEditUserShown] = useState(false)

    async function  updateUser () {
        try {
            const response = await fetch(`https://thevinylfrontier-server.onrender.com/api/users/${user.username}/admin`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    userID: user.id,
                    username: updateUsername,
                    password: updatePassword,
                    email: updateEmail
                })
            });

            const translatedData = await response.json();
            console.log(translatedData)
            let newUsers = allUsers.map((singleUser) => {
                if(singleUser.id == user.id){
                    return translatedData
                } else {
                    return singleUser
                }
            })
            setAllUsers(newUsers)
        } catch (error) {
            console.log(error);
        }
    }



    return(
        <div>
        {
            editUserShown ? 
            <form onSubmit={(event) => {
                event.preventDefault();
                updateUser()
                setEditUserShown(false)
            }}> 
                <input type="text" value={updateUsername} placeholder= {`${user.username}`} onChange={(event) => setUpdateUsername(event.target.value)} />
                <input type="text" value={updateEmail} placeholder= "new email" onChange={(event) => setUpdateEmail(event.target.value)} />
                <input type="password" value={updatePassword}  placeholder= "new password" onChange={(event) => setUpdatePassword(event.target.value)} />
                <button onClick={(event => {
                                event.preventDefault()
                                setEditUserShown(false)
                             })}>Cancel</button>
                <button type="submit">Update</button>
            </form> : <button onClick={(event => {
                                event.preventDefault()
                                setEditUserShown(true)
                             })}>Edit</button>
        }
        
        </div>
    )
}

export default EditUser;