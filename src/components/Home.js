import React from "react";
import { Container, Row, Col } from "reactstrap";
import PersonCard from "./PersonCard";

const Home = ({ persons, leaders }) => {

    const menu = leaders.map((leader) => {
        const person = persons.find((person) => person.id === leader.personId)
        return (
            <div key={leader.id} className="mb-3 ml-5">
                <Row className="col-md-6 col-lg-4 col-xl-3 col-sm-6 col-xs-7 p-0">
                    <Col className="p-0 mr-2 mb-0"><PersonCard person={person} /></Col>
                    <Col className="p-0 border rounded" style={{marginTop:"-1px"}}>
                        <Container className="mb-2">
                            <h5>Заслуги перед партией</h5>
                            {leader.achievement}
                        </Container>
                        <Container>
                            <h5>Сильные стороны</h5>
                        </Container>
                    </Col>
                </Row>
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