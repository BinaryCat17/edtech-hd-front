import React from "react";
import { Container, Card, CardImg, Row, Col, CardText, CardSubtitle, CardTitle, CardBody } from "reactstrap";
import PersonCard from "./PersonCard";

const Home = ({ persons, leaders }) => {

    const menu = leaders.map((leader) => {
        const person = persons.find((person) => person.id === leader.personId)
        return (
            <div key={leader.id} className="mb-3">
                <div className="d-flex flex-row col-2 p-0">
                    <Container className="p-0 mr-2"><PersonCard person={person} /></Container>
                    <Container className="col-12 p-0">
                        <Container className="border rounded mb-2">
                            <h6>Заслуги перед партией</h6>
                            {leader.achievement}
                        </Container>
                        <Container className="border rounded">
                            <h6>Сильные стороны</h6>
                        </Container>
                    </Container>
                </div>
            </div>
        );
    });

    return (<Container>
        <div>
            <h1>Сотрудники дня</h1>
            {menu}
        </div>
    </Container>
    )
}

export default Home;