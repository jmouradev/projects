import React, { Component } from 'react';
import Header from './principal/Header';
import Main from './principal/Main';
import Footer from './principal/Footer';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}

export default App;
