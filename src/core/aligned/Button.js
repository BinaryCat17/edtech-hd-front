import React from "react"
import { Button } from "reactstrap"

export default function AlButton ({ children, type, outline = true }) {
    return(<Button type={type} outline={outline} className="btn-block py-2 m-0 d-flex justify-content-center">
        {children}
    </Button>);
}