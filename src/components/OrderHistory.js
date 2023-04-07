import { useState, useEffect } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/orders?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
    
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div>
      <h1>Order History</h1>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
        </div>
      ))}
    </div>
  );
};
export default OrderHistory;