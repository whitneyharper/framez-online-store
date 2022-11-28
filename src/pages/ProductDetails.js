import React, {useContext} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { ProductContext } from '../context/products';
import { CartContext } from '../context/cart';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {products} = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);

    const product = products.find((product) => {
        return product.id === id;
      });
      if (!product) {
        return <h3>Loading...</h3>;
      }

      const {image: url, name, description, price} = product;

    return(
        <Container>
            <Row className="mx-auto px-5 mt-5">
                <Col md={6} className="mb-3">
                    <Image fluid src={url} className="img-thumbnail"/>
                </Col>
                <Col md={6} className="mb-5 mt-md-5">
                    <h3 className="mb-3">{name}</h3>
                    <h4 className="mb-3">${price}</h4>
                    <Button variant="secondary"
                       onClick={() => {
                            addToCart({ ...product, id });
                            navigate("/cart");
                        }} 
                    >Add to Cart</Button>
                </Col>
                <Col md={12} className="mt-3">
                    <h3 className="fw-bold">Product Description</h3>
                    <p>{description}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductDetails;