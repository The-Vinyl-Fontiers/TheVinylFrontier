import { useEffect, useState } from "react";

const Profile = (props) => {
    const [myData, setMyData] = useState({})
    const [updateUsername, setUpdateUsername] = useState("");
    const [updatePassword, setUpdatePassword] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");

    useEffect(() => {
        console.log(localStorage.getItem("token"))
        if (localStorage.getItem("token")) {

            props.setIsLoggedIn(true)
            fetchMyData();
        } else {
            props.setIsLoggedIn(false)
            console.log("No token exists!")
        }

        async function fetchMyData() {
            try {

                const response = await fetch("http://localhost:3000/users/me", {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })


                const translatedData = await response.json();

                console.log("Below is our personal account data:")
                console.log(translatedData)
                setMyData(translatedData.data)
            } catch (error) {
                console.log(error);
            }
        }

        const updateUser = async (userID) => {
            console.log("userID", userID)
            try {
                const response = await fetch(`http://localhost:3000/users/${username}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${myJWT}`
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
                    setMyData(translatedData)
                }
            } catch (error) {
                console.log(error);
            }
        }
        function updateButton(event) {
            console.log("Button is clicked");
            updateUser(event.target.value)
        };
    }, [])

    return (
        <div>
            {/* Render the profile data here */}
            <div>
                <input type="text" value={updateUsername} onChange={(event) => setUpdateUsername(event.target.value)} />
                <input type="text" value={updateEmail} onChange={(event) => setUpdateEmail(event.target.value)} />
                <input type="password" value={updatePassword} onChange={(event) => setUpdatePassword(event.target.value)} />
                <button value={myData.id} onClick={updateButton}>Update</button>
            </div>
        </div>
    )
}

export default Profile; 