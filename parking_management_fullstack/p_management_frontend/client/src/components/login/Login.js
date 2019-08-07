import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import '../../css/Login.css';

import fetch_server from '../../server_interface';

const styles = theme => ({
    root: {
        display: 'flex',
        color: 'black',
        align: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },

    column: {
        display: 'flex',
        flexDirection: 'column'
    },

    row: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },

    textCenter: {
        display: 'flex',
        align: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },

    textField: {
        display: 'flex',
        width: '250px',
        margin: '5px'
    },

    buttons: {
        display: 'flex',
        width: '150px',
        margin: '5px',
        align: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    }
});

class Login extends Component {
    state = {
        email_utilizador: '',
        password_utilizador: '',
        msgErro: ''
    };

    invalidForm = () => this.state.email_utilizador.length === 0 || this.state.password_utilizador.length === 0;
    handleChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    fildsValidator = ev => {
        let status = null;
        let message = '';

        switch (ev.target.name) {
            case 'email_utilizador':
                let emailValid = this.state.email_utilizador.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

                if (!emailValid) {
                    status = 500;
                    message = 'email invalido!';
                    this.setState({ email_utilizador: '' });
                }

                break;
            case 'password_utilizador':
                if (this.state.password_utilizador.length < 7) {
                    status = 500;
                    message = 'password deve ser maior que 6 caracters!';
                    this.setState({ password_utilizador: '' });
                }

                break;
            default:
                break;
        }

        this.setState({ msgErro: { status: status, message: message } });
    };

    doLogin = () => {
        const dadosIn = {
            email_utilizador: this.state.email_utilizador,
            password_utilizador: this.state.password_utilizador
        };

        fetch_server('/login', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({
                    msgErro: dadosOut.err,
                    email: '',
                    password: ''
                });
            } else {
                this.props.doLogin(
                    dadosOut.dados.id_utilizador,
                    dadosOut.dados.nome_utilizador,
                    dadosOut.dados.id_tipo_utilizador
                );
                this.props.history.push('/');
            }
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className='Login'>
                <div className={classes.root}>
                    <div className={classes.column}>
                        <h2 className={classes.textCenter}>Entrar</h2>
                        <div className={classes.row}>
                            <TextField
                                className={classes.textField}
                                autoFocus
                                label='Email'
                                type='email'
                                value={this.state.email_utilizador}
                                name='email_utilizador'
                                onChange={this.handleChange}
                                onBlur={this.fildsValidator}
                            />
                        </div>
                        <div className={classes.row}>
                            <TextField
                                className={classes.textField}
                                label='Senha'
                                type='password'
                                value={this.state.password_utilizador}
                                name='password_utilizador'
                                onChange={this.handleChange}
                                onBlur={this.fildsValidator}
                            />
                        </div>
                        <div className={classes.row}>
                            <Button
                                className={classes.buttons}
                                variant='raised'
                                color='default'
                                disabled={this.invalidForm()}
                                onClick={this.doLogin}
                            >
                                Executar
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='Msg-error'>
                    <p>
                        {' '}
                        {this.state.msgErro.status
                            ? this.state.msgErro.status + ' - ' + this.state.msgErro.message
                            : ''}{' '}
                    </p>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    doLogin: PropTypes.func.isRequired
};

export default withRouter(withStyles(styles)(Login));
