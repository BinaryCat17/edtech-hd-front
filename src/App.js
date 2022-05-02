import React from "react";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";

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