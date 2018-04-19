import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Navbar bsStyle="inverse">
                <Navbar.Header>
                    <Navbar.Brand>
                        IOT APP
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="/">
                    <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Device List
              </NavItem>
                    <NavItem eventKey={2} href="/create">
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add New
              </NavItem>
                    <NavDropdown eventKey={3} title="Demo" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>New Device</MenuItem>
                        <MenuItem eventKey={3.2}></MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}
export default Header;