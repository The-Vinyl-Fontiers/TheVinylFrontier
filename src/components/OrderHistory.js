import { useState, useEffect } from 'react';
import "./OrderHistory.css"

const OrderHistory = (props) => {
  const {currentUser} = props;
  const [orders, setOrders] = useState([]);


  function sumTotal (products) {
    let sum = 0 
    for(let i = 0; i < products.length; i ++){
      sum += products[i].price * products[i].quantity
    }
    return (sum * 1.07).toFixed(2)
  }
  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/user/${currentUser.id}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
  
      const data = await response.json();
      console.log(data)
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  },[currentUser]);

  useEffect(()=> {
    fetchOrders()
  }, [])

  return (
    <div >
      <h1>Order History</h1>
      <div id="orderHistoryContainer"> 
      { orders.length > 0 ? orders.map((order) => {
        if(order.status != "pending") {
          return (<div key={order.id} className='singleOrder'>
            <p>Order ID: {order.id}</p>
            {
              order.products.map((product) => {
                return (
                  <div>
                  <p>{product.title} x {product.quantity}</p>
                  </div>
                )
              })
            }
            <p>{order.status == "inProgress" ? "In progress" : order.status}</p>
            <p>{sumTotal(order.products)}</p>
          </div>)
        }
        }) : "" }
        </div>
    </div>
  );
};
export default OrderHistory;