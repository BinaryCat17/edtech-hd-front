import React from "react"
import { Form } from "reactstrap"

export default function LoginTemplate(props) {
    return (
        <div className="login-background p-0 m-0">
            <div className="d-flex align-items-center m-0 min-vh-100" style={{ position: "absolute", width: "100vw" }}>
                <div className="login-stand col-2 col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6 container text-center"></div>
            </div>
            <div className="d-flex align-items-center m-0 min-vh-100" style={{ position: "absolute", width: "100vw" }}>
                <Form className={"login-box col-" + props.size + " container text-center"}>
                    {props.children}
                </Form>
            </div>
        </div>)
}



