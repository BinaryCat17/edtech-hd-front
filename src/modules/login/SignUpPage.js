import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap"
import InputField from "core/input/Field"
import { authorize, command, selectCommand, selectLogin } from "core/commands/commandsSlice";
import LoginTemplate from "./LoginTemplate";

export default function SignUpPage(_) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    return (
        <LoginTemplate>
            <p className="text-title mt-3 mb-1">Create your own account</p>
            <p className="text-normal mr-1">Or <a className="link-normal">sign in if you already have one</a></p>
            <InputField className="mx-4 mt-3 mb-3" placeholder="Email address" />

            <InputField className="mx-4 mt-4 pt-2" placeholder="Name" />
            <InputField className="mx-4 mb-3 pt-2" placeholder="Role" />

            <InputField className="mx-4 mt-4 pt-2" placeholder="Password" />
            <InputField className="mx-4 mb-3 pt-2" placeholder="Repeat password" />
            <div className="d-flex flex-row mx-4">
                <FormGroup check className="mr-auto">
                    <Input id="checkbox2" type="checkbox" />
                    <Label check className="text-normal">Remeber me</Label>
                </FormGroup>
            </div>

            <div className="login-button mx-4 mb-4 d-flex flex-row pt-2 m-0">
                <img src="/assets/logo/lock.png" className="ml-1 mr-5" width={30} height={25} />
                <p className="text-normal-light mt-1 mb-2 ml-5 mr-3 text-center col-sm-3 col-md-4 col-xl-6 col-xxl-6">Sign Up</p>
            </div>
        </LoginTemplate>)
}


