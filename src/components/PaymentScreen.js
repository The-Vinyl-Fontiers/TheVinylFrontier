import { useEffect, useState } from "react"

const PaymentScreen = () => {
    const [cardNumber, setCardNumber] = useState();
    const [cardName, setCardName] = useState();
    const [expMonth, setExpMonth] = useState(1);
    const [expYear, setExpYear] = useState(2023);
    const [payment, setPayment] = useState({})

    async function submitPayment () {
        const expDate = new Date(expYear, expMonth)
        let hiddenCard= ""
        for(let i = 0; i < cardNumber.length; i++) {
            if(i < cardNumber.length -4) {
                hiddenCard += "*"
            } else{
                hiddenCard += cardNumber[i]
            }
        }
        setPayment({hiddenCard, cardName, expDate})
    }

    async function checkForPaymentOnFile () {
        try {
            // const response = await fetch("http://localhost:3001/api/payments/")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        checkForPaymentOnFile()
    },[])


    return(
        <div>
            {
                payment.cardName ?
                    <div>
                        <p>Cardholder Name: {payment.cardName}</p>
                        <p>Card Number: {payment.hiddenCard}</p>
                        <p>Expiration Date: {payment.expDate.getMonth()}/{payment.expDate.getFullYear()}</p>
                    </div> :
                    <div>
                    <h3>Evnter a new payment</h3>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        submitPayment()
                    }}>
                        <input type="text" placeholder="Card Number" onChange={(event) => setCardNumber(event.target.value)}></input>
                        <input type="text" placeholder="Name on Card"  onChange={(event) => setCardName(event.target.value)}></input>
                        <select onChange={(event) => setExpMonth(event.target.value)}>
                            <option value="1">Jan</option> 
                            <option value="2">Feb</option> 
                            <option value="3">Mar</option>
                            <option value="4">Apr</option> 
                            <option value="5">May</option> 
                            <option value="6">June</option> 
                            <option value="7">July</option> 
                            <option value="8">Aug</option> 
                            <option value="9">Sept</option> 
                            <option value="10">Oct</option> 
                            <option value="11">Nov</option> 
                            <option value="12">Dec</option> 
                        </select>
                        
                        <select onChange={(event) => setExpYear(event.target.value)}>
                            <option value="2023">2023</option> 
                            <option value="2024">2024</option> 
                            <option value="2025">2025</option> 
                            <option value="2026">2026</option>
                            <option value="2027">2027</option> 
                            <option value="2028">2028</option>
                        </select>
                        <button type="submit">Submit</button>
                    </form>
                    </div>
            }
            
        </div>
    )
}

export default PaymentScreen