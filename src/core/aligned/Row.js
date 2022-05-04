import React from "react"
import { Row, Col} from "reactstrap"

export default function AlRow({ children, parts = "0", className }) {
    let elems = React.Children.map(children, child => (
        <Col className="pr-0">
            {React.cloneElement(child, { className: "m-0 p-0" })}
        </Col>
    ));
    parts = parseInt(parts, 10);

    if (Math.abs(parts) > elems.length) {
        for (let index = 0; index < (Math.abs(parts) - elems.length) + 1; index++) {
            const element = <Col key={elems.length + index} className="pr-0" />;
            if (parts > 0) {
                elems.push(element);
            } else {
                elems.unshift(element);
            }
        }
    }

    return (<Row className={"mr-0 " + className}>{elems}</Row>);
}