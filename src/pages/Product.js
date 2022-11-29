import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import { ProductContext } from '../context/products';

const Products = () => {

    const { products, loading } = useContext(ProductContext);
    const navigate = useNavigate();

    if (loading) {
        return <h3>Loading...</h3>
    }

    return(
        <Container>
            <Row xs={1} md={2} lg={4} className="my-5 g-4">
                {products.length === 0 ? <h3>No Products</h3> : products.map(({ image, id, name, price}) => (
                    <Col key={id}>
                        <Card className="text-center text-white border border-white shadow-lg bg border-2 border-opacity-50 p-2 mb-3">
                            <Card.Img variant="top" src={image} className="img-fluid rounded shadow-lg image mx-auto d-block mt-3"/>
                            <Card.Body className="d-grid">
                                <Card.Text className="fw-bold">{name}</Card.Text>
                                <Card.Text className="fw-bold">$ {price}</Card.Text>
                                <Button onClick={() => navigate(`/products/${id}`)} size="lg" id="product-btn">Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Products;