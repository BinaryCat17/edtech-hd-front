import React from "react"
import { Container } from "reactstrap";

export default function Template({ children }) {
    return (
        <Container className="p-0 m-0">
            {children}
        </Container>
    );
}