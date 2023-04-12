import { useState, useEffect } from 'react';
import "./OrderHistory.css"

const OrderHistory = (props) => {
  const {currentUser} = props;
  const [orders, setOrders] = useState([]);
  const id = currentUser.id


  function sumTotal (products) {
    let sum = 0 
    for(let i = 0; i < products.length; i ++){
      sum += products[i].price * products[i].quantity
    }
    return (sum * 1.07).toFixed(2)
  }
  const fetchOrders = async () => {
    try {
      if(currentUser.id){
          const response = await fetch(`https://thevinylfrontier-server.onrender.com/api/orders/user/${id}`, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
    
        const data = await response.json();
        console.log(data)
        setOrders(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  },[currentUser]);

  return (
    <div >
      <h1 id='orderHistoryTitle'>Order History</h1>
      <div id="orderHistoryContainer"> 
      { orders ? orders.map((order) => {
        if(order.status != "pending") {
          return (<div key={order.id} className='singleOrder'>
            <p className='orderInfo'>Order ID: {order.id} {order.status == "inProgress" ? "In progress" : order.status} </p>
            <div>
            {
              order.products.map((product) => {
                return (
                  <div className='orderProduct' key={product.id}>
                  <img  className="orderImg" src={`${product.imgURL}`} /><span>     {product.title}</span>
                  <p>{product.quantity}</p>
                  </div>
                )
              })
            }
            </div>
            
            <p className='orderTotal'>Total: ${sumTotal(order.products)}</p>
          </div>)
        }
        }) : "Loading orders..." }
        </div>
    </div>
  );
};
export default OrderHistory;