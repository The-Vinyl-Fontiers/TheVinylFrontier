import { useEffect, useState } from "react";

const Profile = (props) => {
    const [myData, setMyData] = useState({})

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

                const response = await fetch("http://localhost:3000/users/:username", {
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
    }, [])

    return (
        <div>
            {
                props.isLoggedIn ?
                    <div>
                        <h3>Welcome, {myData.username}</h3>
                        <h3>Here are your orders: {myData.orders}</h3>
                    </div>
                    :
                    <h3>Please login or register for a new account.</h3>

            }
        </div>
    )
}

export default Profile; 