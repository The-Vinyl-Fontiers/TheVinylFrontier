const DeleteUser = (props) => {
    const {user, setAllUsers, allUsers} = props
    const token = localStorage.getItem("token");

    async function deleteUserFromDB() {
        try {
            const response = await fetch(`http://localhost:3001/api/users/${user.id}`,
            {
                method: "DELETE",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            });
            const data = await response.json()
            console.log(data)
            let newUsers = allUsers.filter((singleUser) => {
                return singleUser.id != user.id
            })
            setAllUsers(newUsers)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <button onClick={deleteUserFromDB}>Delete User</button>
    )
}

export default DeleteUser;