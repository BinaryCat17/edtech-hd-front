import React from "react"
import { Container, Form } from "reactstrap"
import InputField from "./InputField"
import { AlButton, AlRow } from "./Aligned"

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.checkUsername = this.checkUsername.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkPasswordRepeat = this.checkPasswordRepeat.bind(this);
        this.updatePasswordRepeat = this.updatePasswordRepeat.bind(this);

        this.state = {
            password: ""
        }
    }

    checkUsername(username) {
        if (username.length < 3) {
            return "Имя пользователя должно быть не меньше 3 символов";
        } else if (username.length > 16) {
            return "Имя пользователя должно быть не больше 16 символов";
        }
        return "";
    }

    checkEmail(email) {
        if (!email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            return "Не верный формат электронной почты";
        }
        return "";
    }

    checkPassword(password) {
        this.setState({ password: password })

        if (password.length < 8) {
            return "Пароль должен быть не меньше 8 символов";
        }
        if (!/[a-z]/.test(password)) {
            return "Пароль должен содержать как минимум одну строчную букву";
        }
        if (!/[A-Z]/.test(password)) {
            return "Пароль должен содержать как минимум одну заглавную букву";
        }
        if (!/[0-9]/.test(password)) {
            return "Пароль должен содержать как минимум одну цифру";
        }
        return "";
    }

    updatePasswordRepeat(password) {
        this.setState({ repeatPassword: password })
    }

    checkPasswordRepeat() {
        if (this.state.password !== this.state.repeatPassword) {
            return "Пароли не совпадают";
        }
        return "";
    }

    render() {
        const Logo = () => {
            return (
                <Container className="d-flex justify-content-center mb-3">
                    <Container className="highlight rounded-circle col-3 p-0" style={{ position: "absolute", top: -50 }}>
                        <Container>
                            <Container className="pt-2"></Container>
                            <div className="text-center">
                                <img src="/assets/logo/brend.png" width="80" height="80" />
                            </div>
                            <Container className="pb-2"></Container>
                        </Container>
                    </Container>
                </Container>
            );
        }

        return (
            <Container className="pb-5 px-md-5">
                <Container className="m-5" />
                <Container className="col-xxl-4 col-xl-5 col-lg-6 col-md-8 col-sm-10 p-5 background custom-login-container">
                    <Logo />
                    <Form onSubmit={(event) => event.preventDefault()}>
                        <InputField
                            placeholder="Имя пользователя"
                            name="username"
                            type="text"
                            autoComplete="username"
                            check={this.checkUsername}
                        />
                        <InputField
                            placeholder="Электронная почта"
                            name="email"
                            type="email"
                            autoComplete="email"
                            check={this.checkEmail}
                        />
                        <InputField
                            placeholder="Пароль"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            check={this.checkPassword}
                        />
                        <InputField
                            placeholder="Повторите пароль"
                            name="repeatpassword"
                            type="password"
                            autoComplete="new-password"
                            check={this.updatePasswordRepeat}
                            error={this.checkPasswordRepeat()}
                        />
                        <AlRow parts="-3"><AlButton type="submit">Создать</AlButton></AlRow>
                    </Form>

                    <p className="mb-1">Уже есть аккаунт?</p>
                    <AlRow parts="3" className="mb-2">
                        <AlButton>Войти</AlButton>
                    </AlRow>

                    <p className="mb-1">Или войти с помощью:</p>
                    <AlRow>
                        <AlButton><img src="/assets/logo/google.png" width="25" height="25" /></AlButton>
                        <AlButton><img src="/assets/logo/slack.png" width="25" height="25" /></AlButton>
                        <AlButton><img src="/assets/logo/telegram.png" width="25" height="25" /></AlButton>
                    </AlRow>

                </Container>
            </Container>
        );
    }
}

export default Login;