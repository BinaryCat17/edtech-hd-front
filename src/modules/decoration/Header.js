import React from "react"
import { Navbar, NavbarBrand, Nav, NavbarToggler, Container, NavItem, Collapse } from "reactstrap"
import { NavLink } from 'react-router-dom'

const BarItem = (props) => {
    return (
        <NavItem><NavLink className="nav-link p-0 mr-3" to={props.to}> {props.children}</NavLink></NavItem>
    );
}

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isNavOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (<Navbar className="mr-auto p-0 navbar-expand-md" role="navigation">
            <div className="row">
                <div className="p-0 d-flex">
                    <NavbarToggler className="ml-2" onClick={this.toggleNav}>
                        <span className="fa fa-list fa-lg"></span>
                    </NavbarToggler>
                    <NavbarBrand className="p-0" href="/home" >
                        {this.props.brand}
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar className="align-self-center mt-2">
                        <Nav navbar>
                            {this.props.children}
                        </Nav>
                    </Collapse>
                </div>
            </div>
        </Navbar>);
    }
}

export default function HeaderBar() {
    return (
        <Container fluid className="col-12 fixed-top navbar-light main-background">
            <div className="d-flex p-0">
                <Navigation brand={<img className="mt-2 mb-0 pb-0" src="/assets/logo/brend.png" width="70" height="70" />}>
                    <BarItem to="/staff">
                        <img src="/assets/logo/staff.png" width="50" height="50" />
                        <i> Сотрудники</i>
                    </BarItem>
                    <BarItem to="/contact">
                        <img src="/assets/logo/about.png" width="50" height="50" />
                        <i> О Нас</i>
                    </BarItem>
                    <BarItem to="/login">
                        <img src="/assets/logo/login.png" width="50" height="50" />
                        <i> Войти</i>
                    </BarItem>
                </Navigation>

                <div className="mt-2 d-flex col-auto">
                    <div className="align-self-center d-none d-md-block text-center">
                        <h5> Создай свою <br /> партию!</h5>
                    </div>
                    <img src="/assets/logo/company.png" width="60" height="60" />
                </div>
            </div>
        </Container>
    );
}