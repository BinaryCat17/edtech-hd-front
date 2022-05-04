import React, { useState } from "react";
import { FormGroup, Input, FormFeedback } from "reactstrap"

export default function InputField(
    { placeholder, name, type, autoComplete, feedback, error, onBlur }) {

    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);

    const handleBlur = (e) => {
        setValue(e.target.value);
        setTouched(true);
        onBlur();
    } 

    return (<FormGroup>
        <Input className="custom-input"
            placeholder={placeholder}
            autoComplete={autoComplete}
            type={type}
            id={name}
            name={name}
            onBlur={handleBlur}
            value={value}
            valid={!error && value !== "" && touched}
            invalid={error && value !== "" && touched}
        />
        <FormFeedback>{feedback}</FormFeedback>
    </FormGroup>);
}
