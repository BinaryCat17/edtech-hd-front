import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import { Container } from "reactstrap";

export default function Template({ children }) {
    return (
        <Container className="p-0 mt-5">
            {children}
        </Container>
    );
}