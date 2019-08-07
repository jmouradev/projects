import React, { Component } from 'react';
import '../../css/Footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className='App-footer'>
                <footer>
                    <h5 id='esquerdo'>
                        <i>ISEL - PROJETO - 2017/2018 SV</i>
                    </h5>
                    <h5 id='direito'>
                        <i>Euclydes Netto (35987) .</i>
                    </h5>
                    <h5 id='direito'>
                        <i>João Martins (33376) .</i>
                    </h5>
                </footer>
            </div>
        );
    }
}

export default Footer;
