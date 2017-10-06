import React, {Component} from 'react';
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
  DropdownToggle
} from 'reactstrap';
import {Redirect} from 'react-router-dom'

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
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
logout(){
  console.log("Logout")
  sessionStorage.clear();
  window.location.reload();
  

}
  render() {

    if (sessionStorage.getItem("token")){
    return (
      <header className="app-header navbar">
        
        <div className="logo-header text-center">
  <a href="index.html">
    <img src="images/gslogo_full.png" alt="logo" />
    </a>
    </div>
    <button type="button" onClick={this.logout.bind(this)} className="btn btn-danger logout_button"> Logout </button>
      </header>
    )
  }
  else{
    return (<div><Redirect to="/" push="true"  /></div>);
  }
}
}
export default Header;
