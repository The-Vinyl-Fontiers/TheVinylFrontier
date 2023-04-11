import { useEffect, useState } from "react";
import './Profile.css';

const Profile = (props) => {
    const { currentUser, setCurrentUser, loggedIn, setLoggedIn } = props;
    const [updateUsername, setUpdateUsername] = useState(currentUser.username);
    const [updatePassword, setUpdatePassword] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");
        const updateUser = async (userID) => {
            console.log("userID", userID)
            try {
                const response = await fetch(`http://localhost:3001/api/users/${currentUser.username}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        username: updateUsername,
                        password: updatePassword,
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
        <div className="animation container">
            {loggedIn ? (
                <div className="form-box">
                    <h3>Welcome, {currentUser.username}! Here you can update your personal login information.</h3>

                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            updateUser(currentUser.id);
                        }}
                    >
                        <input
                            type="text"
                            value={updateUsername}
                            placeholder={`${currentUser.username}`}
                            onChange={(event) => setUpdateUsername(event.target.value)}
                        />
                        <input
                            type="text"
                            value={updateEmail}
                            placeholder="new email"
                            onChange={(event) => setUpdateEmail(event.target.value)}
                        />
                        <input
                            type="password"
                            value={updatePassword}
                            placeholder="new password"
                            onChange={(event) => setUpdatePassword(event.target.value)}
                        />
                        <button type="submit">Update</button>
                    </form>
                </div>
            ) : (
                <h3>Please login or register for a new account!</h3>
            )}
        </div>
    );

}



export default Profile; 