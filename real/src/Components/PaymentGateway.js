import React, { useState } from 'react';
import { CardElement, useElements,useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';


const PaymentGateway = () => {
 
  const [amount, setAmount] = useState('');
  const elements = useElements();
  const stripe= useStripe();
  
  const [formObj, setFormObj] = useState({id:28,address: "", locality: "", description: "",bhk:"", price: "",photo: ""});  
  
    //Image
    const [image, setImage] = useState(null);
    const changeHandler = (e) => {
    //console.log(formObj);
    setFormObj({ ...formObj, [e.target.name]: e.target.value });
   };

    //Image upload
    const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    };

  const handleSubmit = async (event) => {
    event.preventDefault();    

    // Call your backend to create a PaymentIntent
    // const response = await axios.post('http://localhost:3001/create-payment-intent', {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'create-payment-intent', {   
      mamount: amount });

    console.log(response);
    const { clientSecret } = await response.data;
 

    //Adding card
    const payment_result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      
    });
 
    // Call stripe.confirmCardPayment to confirm the PaymentIntent
    const card_result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          // Include relevant billing details here
        },
      },
    });

    if (payment_result.error) {
      console.error(payment_result.error.message);
    } else {
      // Payment succeeded
      console.log('Payment of '+amount+'successful');
    }
  };
  return (
    <div>
      <h2>List A House</h2>
      <form className="w-50" onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            id="address"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="locality" className="form-label">Locality</label>
                        <input
                            type="text"
                            className="form-control"
                            name="locality"
                            id="locality"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="bhk" className="form-label">BHK count</label>
                        <input
                            type="text"
                            className="form-control"
                            name="bhk"
                            id="bhk"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            id="description"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        required
                        />
                    </div>
                    <div className="mb-1">
                    <label htmlFor="imageInput">Upload Image:</label>
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            required/>
                    {image && <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: '100px', height: '100px' }} />}

                    </div>
                    <CardElement />
                    <button type="submit" className="btn btn-dark" disabled={!stripe}>List and Pay</button>
                </form>
    </div>
  );
};

export default PaymentGateway;