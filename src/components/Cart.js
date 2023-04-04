import { useEffect, useState } from "react";
import RemoveFromCart from "./RemoveFromCart";
import PaymentScreen from "./PaymentScreen";

const Cart = (props) => {
    const {cart, setCart, vinyls} = props
    const [products, setProducts] = useState(cart.products)
    const [subtotal, setSubtotal] = useState(0)

    async function sumPrice() {
        let sum = 0
        for(let i = 0; i < products.length; i ++) {
            sum += parseFloat(products[i].price)
        }
        //check that it includes two deciaml places
        setSubtotal(sum.toFixed(2))
    }
    //TODO Add submit order funciton that changes an orders status, retrieves the newly created cart and adds the order to order history, clears the cart in js, etc

    useEffect(()=>{
        sumPrice()
    },[products])

    useEffect(()=>{
        setProducts(cart.products)
    },[vinyls])

    return(
        <div>
            {
                products ? products.map((vinyl) => {
                    return(
                        <div key={vinyl.id}>
                            <p>{vinyl.title}</p>
                            <p>{vinyl.price}</p>
                            <RemoveFromCart vinyl={vinyl} cart={cart} setCart={setCart} products={products} setProducts={setProducts}/>
                        </div>
                    )
                }) : "No items in cart"
            }
            <div>
                <p>Subtotal: ${subtotal}</p>
            </div>
            <PaymentScreen /> 
        </div>
    )
}

export default Cart;