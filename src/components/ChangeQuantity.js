const ChangeQuantity = (props) => {
    const {quantity, vinyl, products, setProducts, cart, setCart} = props;
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
            setProducts(data.products)
        } catch (error) {
            console.log(error)
        }
    }

    async function deductProduct () {
        try {
            const response = await fetch(`http://localhost:3001/api/orders/${cart.id}/${vinyl.id}`,{
                method: 'DELETE',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
            const data = await response.json();
            console.log(data)
            setCart(data)
            setProducts(data.products)
        } catch (error) {
            
        }
    }
    
    return(
        <div>
            <button onClick={(event) => {
                event.preventDefault();
                addProduct()
            }}>+</button>
            <p>Quantity {quantity}</p>
            <button onClick={(event) => {
                event.preventDefault();
                deductProduct()
            }}>-</button>
        </div>
    )
}

export default ChangeQuantity;