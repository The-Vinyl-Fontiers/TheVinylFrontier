import {FiPlus, FiMinus} from "react-icons/fi"

const ChangeQuantity = (props) => {
    const {quantity, vinyl, products, setProducts, cart, setCart} = props;
    const token = localStorage.getItem("token");
    
    
    async function addProduct() {
        try {
            const response = await fetch(`https://thevinylfrontier-server.onrender.com/api/orders/${cart.id}/${vinyl.id}`,{
                method: 'POST',
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
            console.log(error)
        }
    }

    async function deductProduct () {
        try {
            const response = await fetch(`https://thevinylfrontier-server.onrender.com/api/orders/${cart.id}/${vinyl.id}`,{
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
        <div className="changeQuantity">
            <FiPlus  className="icon" onClick={(event) => {
                event.preventDefault();
                addProduct()
            }}></FiPlus>
            <p>{quantity}</p>
            <FiMinus className="icon" onClick={(event) => {
                event.preventDefault();
                deductProduct()
            }}></FiMinus>
        </div>
    )
}

export default ChangeQuantity;