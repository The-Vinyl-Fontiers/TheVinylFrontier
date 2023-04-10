import { useState, useEffect } from 'react';

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

  useEffect(() => {
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

    fetchOrders();
  }, [currentUser]);

  return (
    <div>
      <h1>Order History</h1>
      {orders.map((order) => {
        if(order.status != "pending") {
          return (<div key={order.id} style={{border:"solid"}}>
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
        })}
    </div>
  );
};
export default OrderHistory;