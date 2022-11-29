import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Hero from '../components/Hero';
import { useNavigate } from "react-router-dom";
import { ProductContext } from '../context/products';


const Home = () => {
    const { featured, loading } = useContext(ProductContext);
    const navigate = useNavigate();

    if (loading) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            <Hero />
            <Container fluid>
                <Row className="text-center feature p-4">
                    <Col>
                        <h3 className="text-white fw-semibold">Featured Collection</h3>
                    </Col>
                </Row>
                {/* PLACE HOLDER TO SEE LAYOUT */}
                <Row className="mt-3 mb-5 mx-auto justify-content-evenly">
                    {featured.length === 0 ? <h3>No Featured Products</h3> : featured.map(({id, image}) => (
                        <Col key={id} xs={8} md={4} lg={3}>
                            <Card className="text-center border border-white shadow-lg bg border-2 border-opacity-50 p-2 mb-3 mw-50">
                                <Card.Img variant="top" src={image} className="img-fluid rounded shadow-lg image mx-auto d-block mt-3"/>
                                <Card.Body className="d-grid">
                                    <Button onClick={() => navigate(`/products/${id}`)} size="lg" id="product-btn">Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}                    
                </Row>
            </Container>
        </>         
    )
}

export default Home;