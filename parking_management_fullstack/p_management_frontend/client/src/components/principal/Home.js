import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import '../css/Home.css';

class Home extends Component {
    render() {
        return (
            <div className='App-home-title'>
                <h1>Bem vindo à gestão de estacionamento!</h1>
                <p>{this.props.loginData.loggedUser}</p>
            </div>
        );
    }
}

Home.propTypes = {
    loginData: PropTypes.object
};

export default Home;
