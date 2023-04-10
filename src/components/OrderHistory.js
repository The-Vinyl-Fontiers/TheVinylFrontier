import { useState, useEffect } from 'react';

const OrderHistory = (props) => {
  const {currentUser} = props;
  const [orders, setOrders] = useState([]);

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
          return (<div key={order.id}>
            <p>Order ID: {order.id}</p>
          </div>)
        }
        })}
    </div>
  );
};
export default OrderHistory;