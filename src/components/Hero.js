import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Hero = () => {
    return (
        <Container fluid className="hero text-white">
            <Row className="text-center">
                <Col className="hero-text">
                    <h2 className="fw-bold mb-5">Framez Eyewear</h2>
                    <h3>Eyewear for Everyone</h3>  
                </Col>
            </Row>           
        </Container>
    )
}

export default Hero;