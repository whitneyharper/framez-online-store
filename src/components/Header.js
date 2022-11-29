import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar className="nav p-3" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand className="text-white">FRAMEZ</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto me-2">
                    <Nav.Link><Link to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link to="/products">EyeWear</Link></Nav.Link>
                    <Nav.Link><Link to="/cart">Cart</Link></Nav.Link>
                    <Nav.Link><Link to="/checkout">Checkout</Link></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;