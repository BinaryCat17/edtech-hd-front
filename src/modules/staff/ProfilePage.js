import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardBody, Row, Col, Container, CardFooter } from 'reactstrap'
import { selectPersonComments } from "./commentsSlice";
import PersonCard from "./PersonCard";
import { selectPerson } from "./personsSlice";

function RenderComments({ personId, comments }) {
    const c = comments.filter((comment) => comment.personId === personId);
    const commentList = c.map((comment) => {
        const date = new Date(comment.date);
        return (
            <Card className="my-1 background" outline key={comment.id}>
                <CardBody>
                    {comment.comment}
                </CardBody>
                <CardFooter>
                    {comment.author}, {date.toDateString()}
                </CardFooter>
            </Card>
        );
    });

    return (
        <Container className="background-border rounded px-2" style={{ "position": "absolute", "top": 0, "bottom": 0, "left": 0, "right": 0, "overflow": "auto" }}>
            <Container className="p-0">
                {commentList}
            </Container>
        </Container>
    );
}

export default function ProfilePage() {
    const params = useParams();

    const personId = params.personId;
    const person = useSelector(selectPerson(personId));
    const comments = useSelector(selectPersonComments(personId));

    let stars = [];
    for (let index = 0; index < person.socialRating; index++) {
        stars.push(<i key={index} className="fa fa-star" aria-hidden="true" style={{ color: "red" }}></i>)
    }

    return (
        <Container className="col-lg-8 col-md-10  mb-3 mt-2">
            <Row md="2" sm="1" xs="1">
                <Col className="mb-1">
                    <h3 className="mt-2">{person.post}</h3>
                    <PersonCard person={person} />
                    <Container className="p-0 mt-2">
                        {person.description}
                    </Container>
                </Col>
                <Col className="mb-1 d-flex flex-column" style={{ minHeight: "360px" }}>
                    <h3 className="mt-2">Комментарии</h3>
                    <Col className="mb-auto p-0">
                        <div className="col-12" style={{ position: "absolute", bottom: 0, top: 0 }}>
                            <RenderComments personId={person.id} comments={comments} />
                        </div>
                    </Col>
                </Col>
            </Row>
            <h3>Социальный рейтинг</h3>
            <h1>
                {stars}
            </h1>
        </Container>
    );
}