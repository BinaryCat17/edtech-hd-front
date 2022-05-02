import React from "react"
import { Container, Nav } from "reactstrap"
import Profile from "./Profile"
import Staff from "./Staff"
import Header from "./Header"
import Footer from "./Footer"
import Home from "./Home"
import Contact from "./Contact"
import Login from "./Login"
import { Routes, Route, Navigate, useParams } from "react-router-dom";

const Main = ({persons, leaders, comments}) => {
    const SelectPerson = () => {
        const params = useParams();
        const personId = parseInt(params.personId, 10);
        const person = persons.find((person) => person.id === personId);
        return (<Profile person={person} comments={comments} />);
    }

    return (
        <div className="p-0 d-flex flex-column min-vh-100 main-background">
            <Header />
            <div style={{ minHeight: 60 }}></div>
            <Container className="mt-4 mb-auto">
                <Routes>
                    <Route exact path="/home" element={<Home persons={persons} leaders={leaders} />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route path="/menu" exact element={<Staff persons={persons} />} />
                    <Route path="/menu/:personId" element={<SelectPerson />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route path="" element={<Navigate to="/home" />} />
                    <Route from="*" to="/"/>
                </Routes>
            </Container>
            <Container fluid className="p-0 mt-3">
                <Footer />
            </Container>
        </div>
    );
}

export default Main;