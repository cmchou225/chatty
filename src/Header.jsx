import React, {Component} from 'react';

class Header extends Component {
  render() {
    
    return (
      <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h3 className="count">{this.props.count} user(s) connected.</h3>
      </nav>
    );
  }
}
export default Header;
