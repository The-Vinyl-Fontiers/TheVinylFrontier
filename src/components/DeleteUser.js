const DeleteUser = (props) => {
    const {user, setAllUsers, allUsers} = props
    const token = localStorage.getItem("token");

    async function deleteUserFromDB() {
        try {
            const response = await fetch(`https://thevinylfrontier-server.onrender.com/api/users/${user.id}`,
            {
                method: "DELETE",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            });
            const data = await response.json()
            console.log(data)
            let newUsers = allUsers.map((singleUser) => {
                if(singleUser.id == user.id){
                    return data
                } else {
                    return singleUser
                }
            })
            setAllUsers(newUsers)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <input type="checkbox" checked={user.active} onChange={deleteUserFromDB}></input>
    )
}

export default DeleteUser;