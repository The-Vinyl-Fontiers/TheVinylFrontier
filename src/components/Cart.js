import { useEffect, useState } from "react";
import RemoveFromCart from "./RemoveFromCart";
import PaymentScreen from "./PaymentScreen";

const Cart = (props) => {
    const {cart, setCart} = props
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

    useEffect(()=>{
        sumPrice()
    },[products])

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