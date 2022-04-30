import React from "react"
import { FormGroup, Input, FormFeedback } from "reactstrap"

class InputField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            error: "",
            touched: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        this.setState({ value: value });
    }

    handleBlur = (event) => {
        this.setState({ touched: true });
        if (this.props.error === undefined) {
            this.setState({ error: this.props.check(this.state.value) });
        } else {
            this.props.check(this.state.value);
        }
    }

    render() {
        let error = this.state.error;
        if(this.props.error !== undefined) {
            error = this.props.error;
        }

        return (<FormGroup>
            <Input className="custom-input"
                placeholder={this.props.placeholder}
                autoComplete={this.props.autoComplete}
                type={this.props.type}
                id={this.props.name}
                name={this.props.name}
                onChange={this.handleInputChange}
                onBlur={this.handleBlur}
                value={this.state.value}
                valid={error === '' && this.state.value !== "" && this.state.touched}
                invalid={error !== '' && this.state.value !== "" && this.state.touched}
            />
            <FormFeedback>{error}</FormFeedback>
        </FormGroup>);
    }
}
export default InputField;