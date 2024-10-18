// Core Imports
import React from "react";

// Styling Imports
import { Container, Spinner } from "react-bootstrap";

const GenericComponentLoader: React.FC = () => {
    return (
        <Container className="text-center">
            <Spinner animation="border" role="status" aria-hidden="true">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h5 className="mt-3">Loading, please wait...</h5>
        </Container>
    );
};

export default GenericComponentLoader;