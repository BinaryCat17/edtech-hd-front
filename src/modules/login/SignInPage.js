import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap"
import InputField from "core/input/InputField"
import { authorize, command, selectCommand, selectLogin } from "core/commands/commandsSlice";
import LoginTemplate from "./LoginTemplate"
import { Link } from "react-router-dom";

export default function SignInPage(_) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    function loginHandler() {
        dispatch(authorize(username, password))
    }

    selectLogin

    return (
        <LoginTemplate size="4">
            <p className="text-title mt-3 mb-1">Войти в ваш аккаунт</p>
            <Link to="/signup">
                <p className="text-normal mr-1">Или <i className="link-normal">зарегистрируйтесь, если у вас еще нет аккаунта.</i></p>
            </Link>
            <InputField className="mx-4 mt-3"
                placeholder="Логин"
                name="username"
                type="text"
                autoComplete="username"
                onBlur={setUsername}
            />
            <InputField className="mx-4 mb-3"
                placeholder="Пароль"
                name="password"
                type="password"
                autoComplete="new-password"
                onBlur={setPassword}
            />
            <div className="d-flex flex-row mx-4">
                <FormGroup check className="mr-auto">
                    <Input id="checkbox2" type="checkbox" />
                    <Label check className="text-normal">Запомнить меня</Label>
                </FormGroup>
                <p className="link-normal">Забыли пароль</p>
            </div>

            <div onClick={loginHandler} className="login-button mx-4 mb-4 d-flex flex-row pt-2 m-0"  style={{height: "40px"}}>
                <img src="/assets/logo/lock.png" className="ml-1 mr-5" width={30} height={25}/>
                <div className="col-10" style={{ position: "absolute" }}>
                    <p className="text-normal-light ml-4 mt-1">Войти</p>
                </div>
            </div>
        </LoginTemplate>)
}


