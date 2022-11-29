import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
 
const SuccessAlert = () => {
    const navigate = useNavigate();
    return(
        <Alert variant="success" className="mt-3">                
            <p>Order has been processed</p>
            <hr />
            <div className="d-flex justify-content-end">
                <Button onClick={() => navigate("/confirmation")} variant="outline-success">
                    Close
                </Button>
            </div>
        </Alert>
    )
}

export default SuccessAlert;