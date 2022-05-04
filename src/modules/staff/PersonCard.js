import React from "react";
import { Card, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";

export default function PersonCard({ person }) {
    return (
        <Card className="foreground">
            <img src={person.image} alt={person.name} />
            <CardTitle tag="h2" className="text-center m-0"></CardTitle>
            <Link to={`/staff/${person.id}`}>
                <Button className="text-black btn-block foreground" style={{ border: "none" }}>
                    <h4>{person.name}</h4>
                </Button>
            </Link>
        </Card>
    );
}