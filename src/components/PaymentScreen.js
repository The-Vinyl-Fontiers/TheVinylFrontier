import { useEffect, useState } from "react"
//TODO Add inputs and state for address

const PaymentScreen = () => {
    const token = localStorage.getItem("token");

    const [cardNumber, setCardNumber] = useState();
    const [cardName, setCardName] = useState();
    const [expMonth, setExpMonth] = useState(1);
    const [expYear, setExpYear] = useState(2023);
    const [payment, setPayment] = useState({})
    const [CVVNum, setCVVNum] = useState()
    const [addressOne, setAdressOne] = useState();
    const [addressTwo, setAdressTwo] = useState();
    const [city, setCity] = useState()
    const [state, setState] = useState();
    const [zip, setZip] = useState();
    //toggle for showing form to input a new payment option
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    let address = "" 

    async function submitPayment () {
        const expDate = new Date(expYear, expMonth)
        

        //concat address together
        address = addressOne
        if(addressTwo) address += " " + addressTwo
        address += " " + city + ", " + state + " " + zip 

        try {
            //TODO Add payment to db
            const response = await fetch("http://localhost:3001/api/payments", {
                method: "POST",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({
                    Address: address, 
                    CCNum: cardNumber, 
                    cardholderName: cardName, 
                    CVVNum: CVVNum 
                })
            }) 
            const data = await response.json();
            console.log(data)

            setPayment({Address: address, CCNum: cardNumber, cardholderName: cardName, CVVNum: CVVNum })
        } catch (error) {
            console.log(error)
        }
        
    }

    function hideCard(cardNumber) {
        let hiddenCard= ""
        for(let i = 0; i < cardNumber.length; i++) {
            if(i < cardNumber.length - 4) {
                hiddenCard += "*"
            } else{
                hiddenCard += cardNumber[i]
            }
        }
        return hiddenCard
    }

    //TODO Check for payment in payments table
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
                payment.cardholderName ?
                    <div>
                        <p>Cardholder Name: {payment.cardholderName}</p>
                        <p>Card Number: {hideCard(cardNumber)}</p>
                        <p>Expiration Date: {expMonth}/{expYear}</p>
                        <p>Billing Address: {address}</p>
                    </div> : "No payment on file" 
                    
            }

            {
                showPaymentForm ? 
                <div>
                    <h3>Enter a new payment</h3>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        setShowPaymentForm(false)
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
                        <input type="text" placeholder="CVV Number" onChange={(event) => setCVVNum(event.target.value)}></input>
                        <input type="text" placeholder="Address 1" onChange={(event) => setAdressOne(event.target.value)}></input>
                        <input type="text" placeholder="Address 2 (Optional)" onChange={(event) => setAdressTwo(event.target.value)}></input>
                        <input type="text" placeholder="City" onChange={(event)=> setCity(event.target.value)}></input>
                        <select name="state" onChange={(event) => setState(event.target.value)}>
                            <option value="">Select a State</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                        <input type="text" placeholder="Zip" onChange={(event) => setZip(event.target.value)}></input>
                        <button type="submit">Submit</button>
                    </form>
                    </div> :
                    <button onClick={(event) => {
                        setShowPaymentForm(true)
                        event.preventDefault()
                    }}>Add new payment method</button>
            }
            
            
        </div>
    )
}

export default PaymentScreen