import React, {useState} from "react"
import { useSelector, useDispatch } from "react-redux";
import { Container, Form } from "reactstrap"
import InputField from "core/input/Field"
import AlButton from "core/aligned/Button"
import AlRow from "core/aligned/Row"
import { authorize, command, selectCommand, selectLogin } from "core/commands/commandsSlice";


const LoginPage = _ => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = useSelector(selectLogin)
    const users = useSelector(selectCommand("user-info"))
    var users_text
    if (users === null) {
        users_text = ""
    } else {
        users_text = JSON.stringify(users)
    }
    const dispatch = useDispatch()

    function checkUsername(username) {
        setUsername(username)
        if (username.length < 3) {
            return "Имя пользователя должно быть не меньше 3 символов";
        } else if (username.length > 16) {
            return "Имя пользователя должно быть не больше 16 символов";
        }
        return "";
    }

    function checkEmail(email) {
        if (!email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            return "Не верный формат электронной почты";
        }
        return "";
    }

    function checkPassword(password) {
        setPassword(password)
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

    function checkPasswordRepeat(password) {
        return "";
    }

    function submitHandler() {
        dispatch(authorize(username, password))
        dispatch(command("GET", "user-info", []))
    }

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
                        onBlur={checkUsername}
                        error={true}
                        feedback={login.access}
                    />
                    <InputField
                        placeholder="aboba почта"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onBlur={checkEmail}
                        error={true}
                        feedback={users_text}
                    />
                    <InputField
                        placeholder="Пароль"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        onBlur={checkPassword}
                    />
                    <InputField
                        placeholder="Повторите пароль"
                        name="repeatpassword"
                        type="password"
                        autoComplete="new-password"
                        onBlur={checkPasswordRepeat}
                    />
                    <AlRow parts="-3"><AlButton type="submit">Создать</AlButton></AlRow>
                </Form>

                <p className="mb-1">Уже есть аккаунт?</p>
                <AlRow parts="3" className="mb-2">
                    <AlButton onSubmit={submitHandler}>Войти</AlButton>
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

export default LoginPage;