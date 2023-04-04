import { useState } from "react";
import RemoveFromCart from "./RemoveFromCart";

const Cart = (props) => {
    const {cart, setCart} = props
    const [products, setProducts] = useState(cart.products)


    return(
        <div>
            {
                products ? products.map((vinyl) => {
                    return(
                        <div key={vinyl.id}>
                            <p>{vinyl.title}</p>
                            <RemoveFromCart vinyl={vinyl} cart={cart} setCart={setCart} products={products} setProducts={setProducts}/>
                        </div>
                    )
                }) : "No items in cart"
            }
        </div>
    )
}

export default Cart;