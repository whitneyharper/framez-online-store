import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import {ProductContext} from '../context/products'

function Confirmation() {
    const { orderID } = useContext(ProductContext);
    const id = orderID.toString().substring(0, 7);
    const navigate = useNavigate();
    return(
        <Container>
            <Card className="text-center mt-5 pt-5 confirmation">
                <Card.Body>
                    <Col xs={12} className="my-2">
                        <h1 className="fw-bold">Your order has been received</h1>
                    </Col>
                    <Col xs={12} className="my-2">
                        <h3 className="mb-3">Thank you for your purchase!</h3>
                        <p>Your order ID is : {id}</p>
                    </Col>
                    <Col xs={12} className="mt-2 mb-5">
                        <Button className="p-3" onClick={() => navigate("/products")}>CONTINUE SHOPPING</Button>
                    </Col>
                </Card.Body>
            </Card>         
        </Container>
    )
}

export default Confirmation;