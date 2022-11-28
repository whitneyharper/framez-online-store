import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import config from '../aws-exports'
import {withAuthenticator} from "@aws-amplify/ui-react";
import { API, Storage } from "aws-amplify";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import { Formik } from 'formik';
import * as yup from 'yup';
import '@aws-amplify/ui-react/styles.css';

const schema = yup.object().shape({
    image: yup.mixed().required("Image is required"),
    name: yup.string().required("Name is required"),
    price: yup.number().required("Price is required"),
    featured: yup.boolean(),
    description: yup.string().required("Description is required"),
});

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config

const Admin = ({signOut}) => {
    const [image, setImage] = useState(undefined)
    const [imgUrl, setImgUrl] = useState("")

  
    const handleImageUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
        setImgUrl(url);
        try {
            // Upload the file to s3 with public access level. 
            await Storage.put(key, file, {
                level: 'public',
                contentType: file.type
            });
            // Retrieve the uploaded file to display
            const image = await Storage.get(key, { level: 'public' })
            setImage(image);
            
        } catch (err) {
            console.log(err);
        }
    }

    
    return(
        <Container>
            <Row className="my-5">
                <Col md={6} className="mb-3">
                    <h3>Add New Product</h3>
                </Col>
                <Col md={6}>
                    <Button onClick={signOut} variant="danger">Sign out</Button>
                </Col>
                <Col md={12} className="p-5">
                <Formik
                    enableReinitialize={true}
                    validationSchema={schema}
                    onSubmit={async(values, actions) => {
                       try {
                            actions.setSubmitting(true);
                            const response = await API.post('productsAPI', '/products', { 
                                body: {
                                    id: uuidv4(),
                                    image: values.image,
                                    name: values.name,
                                    price: values.price,
                                    description: values.description,
                                    featured: values.featured,
                                } 
                                })
                            if (response){
                                actions.resetForm();
                                actions.setSubmitting(false)
                                setImgUrl("")
                                setImage(undefined)
                            }
                       } catch (err){
                        console.log(err)
                        console.log(err.response.data)
                       }
                    }}
                    initialValues={{
                        image: imgUrl,
                        name: '',
                        price: '',
                        description: '',
                        featured: false,
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
                                {image ? <Image fluid src={image} alt="" className='w-75 h-75 mx-auto mb-4'/> : <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload image</Form.Label>
                                    <Form.Control 
                                        type="file"                                         
                                        onChange={handleImageUpload}
                                        isInvalid={!!errors.image}
                                    />
                                </Form.Group>}

                                <Form.Group as={Col} sm={6} className="mb-3" controlId="validationFormik01">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Type the name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} sm={6} className="mb-3" controlId="validationFormikUsername">
                                    <Form.Label>Price</Form.Label>
                                    <InputGroup hasValidation>
                                    <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control
                                        type="text"
                                        placeholder="USD"
                                        aria-describedby="inputGroupPrepend"
                                        name="price"
                                        value={values.price}
                                        onChange={handleChange}
                                        isInvalid={!!errors.price}
                                        />                                        
                                        <Form.Control.Feedback type="invalid">
                                        {errors.price}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>  

                                <Form.Group as={Col} sm={12} className="mb-3" controlId="validationFormik02">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>         

                                <Form.Group className="mb-3">
                                    <Form.Check
                                    name="featured"
                                    label="Featured"
                                    onChange={handleChange}
                                    isInvalid={!!errors.featured}
                                    feedback={errors.featured}
                                    feedbackType="invalid"
                                    id="validationFormik0"
                                    />
                                </Form.Group>                   
                            </Row>                            
                            <Button type="submit" variant="secondary">Submit</Button>
                        </Form>
                    )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    )
}

export default withAuthenticator(Admin);