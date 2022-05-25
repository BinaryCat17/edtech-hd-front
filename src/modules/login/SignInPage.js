import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap"
import InputField from "core/input/Field"
import { authorize, command, selectCommand, selectLogin } from "core/commands/commandsSlice";
import LoginTemplate from "./LoginTemplate"



export default function SignInPage(_) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    function loginHandler() {
        dispatch(authorize(username, password))
    }

    return (
        <LoginTemplate>
            <p className="text-title mt-3 mb-1">Sign in to your account</p>
            <p className="text-normal mr-1">Or <a className="link-normal">sign up if you don`t have account</a></p>
            <InputField className="mx-4 mt-3"
                placeholder="Username"
                name="username"
                type="text"
                autoComplete="username"
                onBlur={setUsername}
            />
            <InputField className="mx-4 mb-3"
                placeholder="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                onBlur={setPassword}
            />
            <div className="d-flex flex-row mx-4">
                <FormGroup check className="mr-auto">
                    <Input id="checkbox2" type="checkbox" />
                    <Label check className="text-normal">Remeber me</Label>
                </FormGroup>
                <p className="link-normal">Forgot password</p>
            </div>

            <div onClick={loginHandler} className="login-button mx-4 mb-4 d-flex flex-row pt-2 m-0">
                <img src="/assets/logo/lock.png" className="ml-1 mr-5" width={30} height={25} />
                <p className="text-normal-light mt-1 mb-2 ml-5 mr-3 text-center col-sm-3 col-md-4 col-xl-6 col-xxl-6">Sign In</p>
            </div>
        </LoginTemplate>)
}


