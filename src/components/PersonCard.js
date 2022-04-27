import React from "react";
import { Card, CardTitle, Button, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

const PersonCard = ({ person }) => {
    console.log(person.image)
    return (
        <Card>
            <img src={person.image} alt={person.name} />
            <CardTitle tag="h2" className="text-center m-0"></CardTitle>
            <Link to={`/menu/${person.id}`}>
                <Button className="text-black bg-light btn-block" style={{ border: "none" }}>
                    <h4>{person.name}</h4>
                </Button>
            </Link>
        </Card>
    );
}

export default PersonCard;