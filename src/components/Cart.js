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
            sum += parseFloat(products[i].price) * products[i].quantity
        }
        //check that it includes two deciaml places
        setSubtotal(sum.toFixed(2))
    }

    //tally up the total number of a given product and display only one with a quantity
    const [groupedProducts, setGroupedProducts] = useState();
    async function mergeDuplicates() {
        // let joinedCart = []
        // for(let i = 0; i < products.length; i++){
        //     if(joinedCart.includes(products[i])) {
        //         joinedCart[products[i]].quantity += 1;
        //     }else {
        //         joinedCart.push(products[i]) = products[i]
        //         joinedCart[products[i]].quantity = 0;
        //     }
        // }
        // let joinedCart = []
        // for(let i = 0; i < products.length; i++) {
        //     console.log(joinedCart)
        //     console.log(products[i])
        //     if(joinedCart.includes(products[i])) {
        //         joinedCart[joinedCart.indexOf(products[i])].quantity ++
        //     }else {
        //         joinedCart.push(products[i])
        //     }
        // }
        // let joinedCart = {}
        // for(let i = 0; i < products.length; i++) {
        //     if(joinedCart[products[i].title]) {
        //         joinedCart[products[i].title].quantity ++
        //     }else {
        //         joinedCart[products[i].title] = products[i]
        //         if(joinedCart[products[i].title].quantity){
        //             joinedCart[products[i].title].quantity ++
        //         }else {
        //             joinedCart[products[i].title].quantity = 1
        //         }
                
        //     }
        // }
        // let joinedCart = {}
        // for(let i = 0; i < products.length; i++) {
        //     let singleVinyl = products[i]
        //     let title = singleVinyl.title
        //     if(joinedCart[title]){
        //         joinedCart[title].quantity++
        //     }else {
        //         joinedCart[title] = singleVinyl
        //         joinedCart[title].quantity = 1
        //     }
        // }
        // console.log(joinedCart)
        // // setGroupedProducts(joinedCart)

        // // console.log(joinedCart)
        // let arrayCart = []
        // for(const thing in joinedCart) {
        //     arrayCart.push(joinedCart[thing])
        // }
        // console.log(arrayCart)
        // setGroupedProducts(arrayCart)
    }
    //TODO Add submit order funciton that changes an orders status, retrieves the newly created cart and adds the order to order history, clears the cart in js, etc
    // useEffect(()=> {
    //     mergeDuplicates()
    // }, [])

    useEffect(()=>{
        // mergeDuplicates()
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
                            <p>Quantity: {vinyl.quantity}</p>
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