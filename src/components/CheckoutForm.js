import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from '../context/products'
import { CartContext } from "../context/cart";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "20px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip: yup.string().required("Zip is required"),    
});

const CheckoutForm = () => {

    const { cart, total } = useContext(CartContext);
    const { checkout } = useContext(ProductContext);
    const [orderDetails, setOrderDetails] = useState({ cart, total, address: null, token: null });
    const [error, setError] = useState(null);
    const [process, setProcess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    useEffect(() => {
        const processOrder = async () => {
            if (orderDetails.token) {
                const response = await checkout(orderDetails);
                if (response === "success") {
                    setProcess(true);
                }
              }
        }
        processOrder();
      }, [orderDetails]);

  
    // Handle real-time validation errors from the card Element.
    const handleCardChange = (event) => {
        if (event.error) {
        setError(event.error.message);
        } else {
        setError(null);
        }
    };

    return(
        <Container>    
            <Row>
            {process ? <Alert variant="success" className="mt-3">                
                <p>Order has been processed</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => navigate("/confirmation")} variant="outline-success">
                        Close
                    </Button>
                </div>
            </Alert> : null}            
                <Col md={4} className="order-md-2 mb-4">
                    <h4 className="text-muted fw-bold">Your cart</h4>
                    <ListGroup className="border-3">
                    {cart.map(({id, name, amount, price}) => (
                        <ListGroup.Item key={id} as="li"
                            className="d-flex justify-content-between align-items-start">                      
                                <div className="me-auto">
                                <p className="fw-bold">{name}</p>
                                <p>Quantity: {amount}</p>
                                </div>
                                <Badge bg="dark" pill>
                                $ {amount * price}
                                </Badge>
                        </ListGroup.Item>
                    ))}
                        <ListGroup.Item as="li"
                        className="d-flex justify-content-between align-items-start">                      
                            <div className="ms-2 me-auto">
                            <h5 className="fw-bold">Total</h5>
                            </div>
                            <Badge bg="primary" pill>
                            $ {total}
                            </Badge>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={7} className="order-md-1 me-5 mt-3">
                <h4 className="mb-3 fw-bold">Billing address</h4>
                <Formik
                    validationSchema={schema}
                    onSubmit={async(values, actions) => {
                                            
                        try {
                            actions.setSubmitting(true);
                            const card = await elements.getElement(CardElement);
                            const result = await stripe.createToken(card);
                            if (result.error) {
                            // Inform the user if there was an error.
                            setError(result.error.message);
                            } else {
                            setError(null);
                            // Send the token to your server.
                            const token = result.token;
                            setOrderDetails({ ...orderDetails, address: values.address, token: token.id });
                            }
                        } catch (err) {
                            console.log(err)
                        } finally{
                            actions.setSubmitting(false);                          
                        }                      
                    }}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        address: '',
                        city: '',
                        state: '',
                        zip: '',
                    }}
                    >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={6} className="mb-3" controlId="validationFormik01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                               
                                onChange={handleChange}
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={6} className="mb-3" controlId="validationFormik02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                               
                                onChange={handleChange}
                                isInvalid={!!errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" className="mb-3" controlId="validationFormik04">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    value={values.address}                                    
                                    onChange={handleChange}
                                    isInvalid={!!errors.address}
                                />
                            <Form.Control.Feedback type="invalid">
                                {errors.address}
                            </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={4} className="mb-3" controlId="validationFormik03">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                name="city"
                            
                                onChange={handleChange}
                                isInvalid={!!errors.city}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.city}
                            </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={4} className="mb-3" controlId="validationFormik04">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="State"
                                name="state"
                             
                                onChange={handleChange}
                                isInvalid={!!errors.state}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.state}
                            </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={4} className="mb-3" controlId="validationFormik05">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Zip"
                                name="zip"
                           
                                onChange={handleChange}
                                isInvalid={!!errors.zip}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.zip}
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Col md={12} className="mb-3">
                                <h5 className="mb-3">Credit or debit card</h5>                                
                            </Col>
                            <Col md={12} className="mb-3 border border-4">
                                <CardElement id="stripe-element" options={CARD_ELEMENT_OPTIONS} onChange={handleCardChange}/>
                                {error && <div className="error">{error}</div>}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-grid gap-2 mb-5">
                                <Button type="submit">Submit Payment</Button>
                            </Col>
                        </Row>                        
                        </Form>
                    )}
                </Formik>
                </Col>
            </Row>            
        </Container>
    )
}

export default CheckoutForm;