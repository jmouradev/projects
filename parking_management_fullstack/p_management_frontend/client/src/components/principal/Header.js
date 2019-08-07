import React, { Component } from 'react';
import { withRouter } from 'react-router';
//import { Link } from 'react-router-dom'
import '../../css/Header.css';

class Header extends Component {
    render() {
        return (
            <div className='App-Header'>
                <header className='App-header'>
                    <h1 className='App-title'>Gestão de Estacionamento</h1>
                </header>
            </div>
        );
    }
}

export default withRouter(Header);
