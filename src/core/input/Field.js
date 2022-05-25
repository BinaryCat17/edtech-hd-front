import React, { useState } from "react";
import { FormGroup, Input, FormFeedback } from "reactstrap"

export default function InputField(
    { placeholder, name, type, autoComplete, feedback, error, onBlur, className }) {

    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);

    const handleBlur = (e) => {
        setValue(e.target.value);
        setTouched(true);
        onBlur(e.target.value);
    } 

    return (<div className={className}>
        <Input className={"m-0 p-3"}
            placeholder={placeholder}
            autoComplete={autoComplete}
            type={type}
            id={name}
            name={name}
            onBlur={handleBlur}
            onChange={(val) => setValue(val.target.value) }
            value={value}
            valid={!error && value !== "" && touched}
            invalid={error && value !== "" && touched}
        />
        <FormFeedback className="m-0 p-0">{feedback}</FormFeedback>
    </div>);
}
