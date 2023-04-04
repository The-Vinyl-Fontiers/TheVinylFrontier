const AddToCart = (props) => {
    const {vinyl, cart, setCart} = props
    const token = localStorage.getItem("token");

    console.log(cart)

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
            // let newCart = cart;
            // // console.log(newCart.products)
            // newCart.products.push(vinyl)
            setCart(data)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <button onClick={addProduct}>
            Add to cart
        </button>
    )
}

export default AddToCart;