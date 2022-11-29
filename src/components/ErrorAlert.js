import React from "react";
import Alert from 'react-bootstrap/Alert';
 
const ErrorAlert = () => {
    
    return(
        <Alert variant="danger" className="mt-3">
            <Alert.Heading>Unable to Process Payment!</Alert.Heading>
                <p>
                    We're sorry, we were unable to process your payment. Please try again later.
                </p>
        </Alert>
    )
}

export default ErrorAlert;