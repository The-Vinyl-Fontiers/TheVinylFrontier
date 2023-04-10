import { useState } from "react";

const Checkout = (props) => {
    const { cart, setCart, fetchCurrentCart} = props
    const [formData, setFormData] = useState({
        cardNumber: "",
        cardName: "",
        expiration: "",
        cvv: "",
        address: "",
        city: "",
        state: "",
        zip: ""
    });

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/api/orders/${cart.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    status: "inProgress"
                })
            });
            const translatedData = await response.json();
            console.log(translatedData);
            fetchCurrentCart()
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Card Number:
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Cardholder Name:
                    <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Expiration Date:
                    <input
                        type="text"
                        name="expiration"
                        value={formData.expiration}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    CVV:
                    <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    State:
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Zip Code:
                    <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleFormChange}
                    />
                </label>
                <button type="submit">
                    Checkout
                </button>
            </form>
        </div>
    );
};

export default Checkout;
