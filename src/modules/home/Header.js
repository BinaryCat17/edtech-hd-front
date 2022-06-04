import React from "react"
import { useDispatch } from "react-redux";
import { Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse } from "reactstrap"
import { getOne } from "core/commands/commandsSlice"

const BarItem = (props) => {
    return (
        <NavItem><a className="nav-link p-0 mr-3" href={props.to}> {props.children}</a></NavItem>
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
    const dispatch = useDispatch()
    var login = <div className="home-signin-button align-self-center d-flex flex-row">
        <a to="/signin">
            <a href="/signin"><p className="text-light my-1 mx-2">Войти</p></a>
        </a>
    </div>
    var defuser = getOne(dispatch, "self", [], "", "undefined")
    if (defuser != "undefined") {
        login = <div>
            <a href={"/app/team-view/" + defuser.username}><img className="mb-0 pb-0 pt-1" style={{ position: "absolute", top: "4px", right: "10px" }} src="/assets/logo/profile.png" width="50" height="50" /></a>
            <a href={"/app/team-view/" + defuser.username}><p className="mb-0 pb-0 pt-1 link-big" style={{ position: "absolute", top: "15px", right: "75px" }}>{defuser.fullname}</p></a>
        </div>
    }

    return (
        <div className="col-12 fixed-top header-home-background">
            <div className="d-flex p-0">
                <Navigation brand={<img className="mb-0 pb-0 pt-1" style={{ position: "absolute", top: "7px" }} src="/assets/logo/brand.svg" width="200" height="60" />}>
                    <BarItem to="/home">
                        <div className="mb-2" style={{ width: "280px", height: "40px" }}>
                        </div>
                    </BarItem>
                    <BarItem to="/app/team-view">
                        <img src="/assets/logo/workspace.png" width="40" height="40" />
                        <i className="text-bold mr-2 ml-2">РАБОЧЕЕ ПРОСТРАНСТВО</i>
                    </BarItem>
                    <BarItem to="/login">
                        <img src="/assets/logo/news.png" width="40" height="40" />
                        <i className="text-bold ml-2 mr-5">НОВОСТИ</i>
                    </BarItem>
                    <BarItem to="/login">
                        <img src="/assets/logo/about.png" width="40" height="40" />
                        <i className="text-bold ml-2 mr-5">О НАС</i>
                    </BarItem>
                    <BarItem to="/login">
                        <img src="/assets/logo/help.png" width="40" height="40" />
                        <i className="text-bold ml-2">ПОМОЩЬ</i>
                    </BarItem>
                </Navigation>

                <div className="d-flex col-auto">
                    {login}
                </div>
            </div>
        </div>
    );
}