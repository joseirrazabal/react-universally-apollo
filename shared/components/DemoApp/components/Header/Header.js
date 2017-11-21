import React, { Component } from 'react';
import {
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  DropdownToggle,
} from 'reactstrap';
import { Link }       from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          &#9776;
        </NavbarToggler>
        <NavbarBrand tag={Link} to="#" />
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          &#9776;
        </NavbarToggler>

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink tag={Link} to="/">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink tag={Link} to="#">Users</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink tag={Link} to="/about">Settings</NavLink>
          </NavItem>
        </Nav>

        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink tag={Link} to="#">
              <i className="icon-bell" />
              <Badge pill color="danger">
                5
              </Badge>
            </NavLink>
          </NavItem>

          <NavItem className="d-md-down-none">
            <NavLink tag={Link} to="#">
              <i className="icon-list" />
            </NavLink>
          </NavItem>

          <NavItem className="d-md-down-none">
            <NavLink tag={Link} to="#">
              <i className="icon-location-pin" />
            </NavLink>
          </NavItem>

          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className="nav-link dropdown-toggle">
                <img
                  src={'img/avatars/6.jpg'}
                  className="img-avatar"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="d-md-down-none">admin</span>
              </DropdownToggle>
              <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                <DropdownItem header tag="div" className="text-center">
                  <strong>Account</strong>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-bell-o" /> Updates<Badge color="info">42</Badge>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-envelope-o" /> Messages<Badge color="success">42</Badge>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-tasks" /> Tasks<Badge color="danger">42</Badge>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-comments" /> Comments<Badge color="warning">42</Badge>
                </DropdownItem>
                <DropdownItem header tag="div" className="text-center">
                  <strong>Settings</strong>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-user" /> Profile
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-wrench" /> Settings
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-usd" /> Payments<Badge color="secondary">42</Badge>
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-file" /> Projects<Badge color="primary">42</Badge>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <i className="fa fa-shield" /> Lock Account
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-lock" /> Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
        <NavbarToggler className="d-md-down-none" type="button" onClick={this.asideToggle}>
          &#9776;
        </NavbarToggler>
      </header>
    );
  }
}

export default Header;
