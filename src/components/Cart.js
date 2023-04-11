import { useEffect, useState } from "react";
import RemoveFromCart from "./RemoveFromCart";
import PaymentScreen from "./PaymentScreen";
import ChangeQuantity from "./ChangeQuantity";
import { Link } from "react-router-dom";
import "./Cart.css"

const Cart = (props) => {
    const {cart, setCart, vinyls, fetchCurrentCart} = props
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
        setTax(taxAmnt.toFixed(2))
        setSubtotal(sum.toFixed(2))
    }

    async function fetchProducts () {
        setProducts(cart.products)
    }
   
    //TODO Add submit order funciton that changes an orders status, retrieves the newly created cart and adds the order to order history, clears the cart in js, etc
   

    useEffect(()=>{
        sumPrice()
    },[products, vinyls])

    useEffect( ()=>{
        fetchCurrentCart()
        setProducts(cart.products)
    },[])

    return(
        <div id="cartContainer">
            <div id="cartProducts">
            {
                products.length ? products.map((vinyl) => {
                    return(
                        <div key={vinyl.id} className="singleCartProduct">
                            <p className="cartTitle">{vinyl.title}</p>
                            <Link to={`/vinyl/${vinyl.id}`}>
                                <img src={`${vinyl.imgURL}`} className="vinylImg"/>
                            </Link>
                            <p>${vinyl.price}</p>
                            <ChangeQuantity quantity = {vinyl.quantity} vinyl={vinyl} cart={cart} setCart={setCart} products={products} setProducts={setProducts}/>
                            <RemoveFromCart vinyl={vinyl} cart={cart} setCart={setCart} products={products} setProducts={setProducts}/>
                        </div>
                    )
                })
                
                
                
                : "No items in cart"
            }
            </div>

            {
                 products.length ? <div id="cartTotal">
                 <p>Subtotal: ${subtotal}</p>
                 <p>Tax: ${tax}</p>
                 <p id="cartFinal">Final: ${(parseFloat(tax) + parseFloat(subtotal)).toFixed(2)}</p>
                 <Link to="/checkout" ><button id="checkoutButton">Checkout</button></Link>
             </div> : ""
            }
            
           
            
        </div>
    )
}

export default Cart;