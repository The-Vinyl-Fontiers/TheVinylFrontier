import { useEffect, useState } from "react";
import RemoveFromCart from "./RemoveFromCart";
import PaymentScreen from "./PaymentScreen";
import ChangeQuantity from "./ChangeQuantity";

const Cart = (props) => {
    const {cart, setCart, vinyls} = props
    const [products, setProducts] = useState(cart.products)
    const [subtotal, setSubtotal] = useState(0)
    const [tax, setTax] = useState(0)

    async function sumPrice() {
        let sum = 0
        for(let i = 0; i < products.length; i ++) {
            sum += parseFloat(products[i].price) * products[i].quantity
        }
        //check that it includes two deciaml places
        let taxAmnt = sum * 0.07
        console.log(taxAmnt)
        setTax(taxAmnt.toFixed(2))
        setSubtotal(sum.toFixed(2))
    }

   
    //TODO Add submit order funciton that changes an orders status, retrieves the newly created cart and adds the order to order history, clears the cart in js, etc
   

    useEffect(()=>{
        sumPrice()
    },[products, vinyls])

    // useEffect(()=>{
    //     setProducts(joinedCart)
    // },[vinyls])

    return(
        <div>
            {
                products ? products.map((vinyl) => {
                    return(
                        <div key={vinyl.id}>
                            <p>{vinyl.title}</p>
                            <p>{vinyl.price}</p>
                            <img src={`${vinyl.imgURL}`} className="vinylImg"/>
                            <ChangeQuantity quantity = {vinyl.quantity} vinyl={vinyl} cart={cart} setCart={setCart} products={products} setProducts={setProducts}/>
                            <RemoveFromCart vinyl={vinyl} cart={cart} setCart={setCart} products={products} setProducts={setProducts}/>
                        </div>
                    )
                }) : "No items in cart"
            }
            <div>
                <p>Subtotal: ${subtotal}</p>
                <p>Tax: ${tax}</p>
                <p>Final: ${(parseFloat(tax) + parseFloat(subtotal)).toFixed(2)}</p>
            </div>
            <PaymentScreen /> 
        </div>
    )
}

export default Cart;