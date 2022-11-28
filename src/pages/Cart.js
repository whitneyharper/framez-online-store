import React, {useContext} from "react";
import { CartContext } from "../context/cart";
import { FiChevronUp } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, increaseAmount, decreaseAmount } = useContext(CartContext);

    if (!cart.length) {
        return <h3>Empty Cart</h3>
    }

    return(
        <Container className="h-100 py-5">
           <Row className="d-flex justify-content-between align-items-center mb-4">
                <Col xs={10} className="fw-normal mb-0 text-black">
                    <h3>Shopping Cart</h3>
                </Col>
                {cart.map(({ id, name, price, image, amount}) => (
                    <Card key={id} className="rounded-3 mb-4">
                        <Card.Body className="p-4">
                            <Row className="d-flex justify-content-between align-items-center">
                                <Col md={2} lg={2} xl={2}>
                                    <Image fluid src={image} atl="" className="rounded-3 mb-3"/>
                                </Col>
                                <Col md={3}>
                                    <h3 className="lead fw-normal">{name}</h3>
                                </Col>
                                <Col md={3} lg={2} className="offset-lg-1">
                                    <h4>$ {price}</h4>
                                </Col>
                                <Col md={3} xl={2} className="d-flex">
                                    <Button variant="secondary" size="sm" onClick={() => increaseAmount(id)}><FiChevronUp /></Button>
                                        <h4 className="mx-3">{amount}</h4>
                                    <Button variant="secondary" size="sm" onClick={() => decreaseAmount(id, amount)}><FiChevronDown /></Button>
                                </Col>                            
                            </Row>
                        </Card.Body>
                    </Card>
                ))}     
                <Col lg={6} className="d-grid mb-3">
                    <Button variant="secondary" size="lg" onClick={() => navigate("/products")}>Continue Shopping</Button>
                </Col>           
                <Col lg={6} className="d-grid mb-4">
                    <Button variant="secondary" size="lg" onClick={() => navigate("/checkout")}>Checkout</Button>
                </Col>
           </Row> 
        </Container>
    )
}

export default Cart;