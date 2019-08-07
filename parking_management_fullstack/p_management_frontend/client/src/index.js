import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Client from './components/Client';
//import registerServiceWorker from './registerServiceWorker';

render(
    <BrowserRouter>
        <Client />
    </BrowserRouter>,
    document.getElementById('root')
);

//registerServiceWorker();
