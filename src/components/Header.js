import React from "react"
import { Navbar, NavbarBrand, Nav, NavbarToggler, Container, Row, Col, NavItem, Collapse } from "reactstrap"
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
        return (<Navbar className="mr-auto p-0 navbar-expand-md">
            <div className="row">
                <div className="p-0 d-flex">
                    <NavbarToggler className="ml-2" onClick={this.toggleNav}>
                        <span className="fa fa-list fa-lg"></span>
                    </NavbarToggler>
                    <NavbarBrand className="p-0" href="/home" >
                        {this.props.brand}
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar className="align-self-center">
                        <Nav navbar>
                            {this.props.children}
                        </Nav>
                    </Collapse>
                </div>
            </div>
        </Navbar>);
    }
}

const Header = () => {
    const brend = (<>
        <img src="/assets/logo/social.jpg" width="90" height="60" />
    </>);

    return (
        <Container fluid className="bg-light border col-12 p-0 fixed-top navbar-light">
            <div className="d-flex p-0">
                <Navigation brand={brend}>
                    <BarItem to="/menu">
                        <i className="fa fa-user fa-lg"> Сотрудники</i>
                    </BarItem>
                    <BarItem to="/contact">
                        <i className="fa fa-info fa-lg"> О Нас</i>
                    </BarItem>
                    <BarItem to="/login">
                        <i className="fa fa-log fa-lg"> Войти</i>
                    </BarItem>
                </Navigation>

                <div className="pr-2 d-flex col-auto">
                    <div className="align-self-center d-none d-md-block text-center">
                        <h5> Создай свою <br /> партию!</h5>
                    </div>
                    <img src="/assets/logo/ussr.png" width="60" height="60" />
                </div>
            </div>
        </Container>
    );
}

export default Header;