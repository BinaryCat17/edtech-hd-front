import React from "react"
import { Button, ButtonGroup, Container, Input, Row, Col } from "reactstrap"
import { FaGoogle, FaSlack, FaTelegram, FaPepperHot } from "react-icons/fa"

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container className="custom-background">
                <Container className="p-5">
                    <Container className="m-5"/>
                    <Container className="col-xxl-4 col-xl-5 col-lg-6 col-md-8 p-5 custom-login-container">
                        <Container className="d-flex justify-content-center">
                            <Container className="custom-background-light rounded-circle col-3" style={{ position: "absolute", top: -50 }}>
                                <div className="container">
                                    <Container className="pt-4"></Container>
                                    <FaPepperHot color="red" className="h1 ml-1" />
                                    <Container className="pb-4"></Container>
                                </div>
                            </Container>
                        </Container>
                        <Input placeholder="Рабочая почта" className="custom-input mb-3 mt-2"></Input>
                        <Input placeholder="Пароль" className="custom-input mb-3"></Input>
                        <Input placeholder="Повторите пароль" className="custom-input mb-3"></Input>
                        <Container className="d-flex justify-content-end p-0">
                            <Button outline color="dark" size="lg"><p className="m-0 h6">Регистрация</p></Button>
                        </Container>
                        <h6 className="mt-2">Уже есть аккаут?</h6>
                            <Button outline color="dark" size="lg"><p className="m-0 h6">Войти</p></Button>
                        <h6 className="mt-2">Или войти с помощью:</h6>
                        <Row>
                            <Col className="pr-0"><Button color="dark" outline className="btn-block">
                                <FaGoogle className="h3 m-0" />
                            </Button></Col>
                            <Col className="pr-0"><Button color="dark" outline className="btn-block">
                                <FaSlack className="h3 m-0" />
                            </Button></Col>
                            <Col className="pr-0"><Button color="dark" outline className="btn-block">
                                <FaTelegram className="h3 m-0" />
                            </Button></Col>
                        </Row>
                    </Container>
                </Container>
            </Container>
        );
    }
}

export default Login;