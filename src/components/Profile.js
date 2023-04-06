import { useEffect, useState } from "react";

const Profile = (props) => {
    const {currentUser, setCurrentUser, loggedIn, setLoggedIn} = props;
    const [updateUsername, setUpdateUsername] = useState("");
    const [updatePassword, setUpdatePassword] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");


        // async function fetchMyData() {
        //     try {

        //         const response = await fetch("http://localhost:3000/users/me", {
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 'Authorization': `Bearer ${localStorage.getItem("token")}`
        //             }
        //         })


        //         const translatedData = await response.json();

        //         console.log("Below is our personal account data:")
        //         console.log(translatedData)
        //         setCurrentUser(translatedData.data)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        const updateUser = async (userID) => {
            console.log("userID", userID)
            try {
                const response = await fetch(`http://localhost:3000/users/${username}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        username: updateUsername,
                        password: updateDescription,
                        email: updateEmail
                    })
                });

                const translatedData = await response.json();
                console.log(translatedData);
                if (translatedData) {
                    setCurrentUser(translatedData)
                }
            } catch (error) {
                console.log(error);
            }
        }


        return (
            <div>
                {/* Render the profile data here */}
                
                    // loggedIn ?
                        <div>
                            <h3>Welcome, {currentUser.username}</h3>
    
                            <form onSubmit={(event) => {event.preventDefault() 
                                updateUser(currentUser.id)}}>
                                <input type="text" value={updateUsername} onChange={(event) => setUpdateUsername(event.target.value)} />
                                <input type="text" value={updateEmail} onChange={(event) => setUpdateEmail(event.target.value)} />
                                <input type="password" value={updatePassword} onChange={(event) => setUpdatePassword(event.target.value)} />
                                <button type="submit">Update</button>
                            </form>
                        </div>
    
                        
                        <h3>Please login or register for a new account!</h3>
    
                
            </div>
        )
    }



export default Profile; 