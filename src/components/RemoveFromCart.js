import {BsTrash3} from "react-icons/bs"

const RemoveFromCart = (props) => {
    const {vinyl, setCart, cart, products, setProducts} = props;
    const token = localStorage.getItem("token");

    async function removeProduct () {
        try {
            const response = await fetch(`https://thevinylfrontier-server.onrender.com/api/orders/${cart.id}/${vinyl.id}/remove`,{
                method: 'DELETE',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
            const data = await response.json();
            console.log(data)
            //  let newProducts = products.filter(
            //     product => product.id != vinyl.id
            // )
            // let newCart = cart
            // newCart.products = newProducts
            // console.log(newProducts)
            setProducts(data.products)
            setCart(data)
            console.log(cart)
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <BsTrash3 onClick={removeProduct} className="icon deleteIcon" >
            Remove From Cart
        </BsTrash3>
    )
}

export default RemoveFromCart