import React, { Component } from 'react';
import  PrincipalAppBar  from '../elements/AppBar';


class Header extends Component {
  render() {
    return (
        <header className="App-header">
            <PrincipalAppBar />

        </header>
    );
  }
}


export default Header;