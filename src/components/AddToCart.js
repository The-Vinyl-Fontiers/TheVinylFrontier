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
            // let newCart = cart;
            // // console.log(newCart.products)
            // newCart.products.push(vinyl)
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
            <button onClick={addProduct} >Add to cart</button> : ""
        }
        </div>
    )
}

export default AddToCart;