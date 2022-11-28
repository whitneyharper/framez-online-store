import React from 'react'
import Container from 'react-bootstrap/Container';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {

    const stripePromise = loadStripe('pk_test_51LzPFoAv5HGzCXnqfST0SSQp5Nim5wXuZjJO27dMDwhL4ul5ZSA2QphdBkiZAaGFD12I92jwWQTbpfQqVrMOnfuv00tyXkVGdM');

    return (    
        <Elements stripe={stripePromise}>
            <Container fluid>
                <h1 className="py-5 text-center">Checkout</h1>
                <CheckoutForm />
            </Container>        
        </Elements>          
    )
}

export default Checkout;