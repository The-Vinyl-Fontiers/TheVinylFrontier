import EditVinyl from "./EditVinyl";

const Admin = (props) => {
    const {currentUser, vinyls, setVinyls} = props;
    const {isAdmin} = currentUser
    //TODO: Function and input form to add a new vinyl to the db

    //TODO: Function to fetch user data and display
    //TODO: Function and input form to make a user an admin
        //Add api function to fetch all users

    //TODO: Function and input form to edit a vinyl


    return(
        <div>
            {
                !isAdmin ? "You do not have permission to access. OwO" :
                <div>
                    Welcome to the admin page!
                    {/* TODO display all vinyls with edit button */}
                    <div>
                        <h3>Vinyls</h3>
                        {
                            vinyls ? vinyls.map((vinyl) => {
                                return(
                                    <div key={vinyl.id}>
                                        <p>{vinyl.title}</p>
                                        <p>{vinyl.artist}</p>
                                        <p>{vinyl.price}</p>
                                        <EditVinyl vinyl={vinyl} vinyls={vinyls} setVinyls={setVinyls}/>
                                    </div>
                                )
                            }) : "Loading..."
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Admin