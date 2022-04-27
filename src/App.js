import React from "react";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import {PERSONS} from "./shared/persons";
import {LEADERS} from "./shared/leaders";
import {COMMENTS} from "./shared/comments"

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Main persons={PERSONS} leaders={LEADERS} comments={COMMENTS}/>
            </BrowserRouter>
        );
    }
}

export default App;