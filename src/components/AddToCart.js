const AddToCart = (props) => {
    const {vinyl, cart, setCart, currentUser} = props
    const token = localStorage.getItem("token");

    async function addProduct() {
        try {
            const response = await fetch(`http://localhost:3001/api/orders/${cart.id}/${vinyl.id}`,{
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
            const data = await response.json();
            console.log(data)
            setCart(data)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
        {
            currentUser.id ? 
            <button onClick={addProduct} >Add to cart</button> : "Login or Register to order"
        }
        </div>
    )
}

export default AddToCart;