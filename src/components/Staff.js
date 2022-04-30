import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import PersonCard from "./PersonCard";

const Staff = ({ persons }) => {
    const menu = persons.map((person) => {
        return (
            <Col key={person.id} className="col-md-6 col-lg-4 col-xl-3 col-sm-6 col-xs-7 mb-3">
                <PersonCard person={person}/>
                
            </Col>
        );
    });

    return (
        <Container>
            <Row>
                <Container className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </Container>
            </Row>
            <Row>
                {menu}
            </Row>
        </Container>
    );
}

export default Staff;