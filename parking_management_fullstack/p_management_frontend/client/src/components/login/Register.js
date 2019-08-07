import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import '../../css/Register.css';

import fetch_server from '../../server_interface';

const styles = theme => ({
    root: {
        display: 'flex',
        color: 'black',
        alignContent: 'center',
        justifyContent: 'center'
    },

    column: {
        display: 'flex',
        flexDirection: 'column'
    },

    row: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },

    rowButton: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },

    textField: {
        width: '250px',
        margin: '5px'
    },

    textCenter: {
        display: 'flex',
        align: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },

    buttons: {
        display: 'flex',
        width: '200px',
        margin: '5px',
        align: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },

    selectForm: {
        width: '50%'
    }
});

class Register extends Component {
    state = {
        email_utilizador: '',
        confEmail: '',
        password_utilizador: '',
        confPassword: '',
        nome_utilizador: '',
        morada_utilizador: '',
        nif_utilizador: '',
        contacto_utilizador: '',
        necessidades_especiais: '',
        msgErro: ''
    };

    invalidForm = () =>
        this.state.email_utilizador.length === 0 ||
        this.state.confEmail.length === 0 ||
        this.state.password_utilizador.length === 0 ||
        this.state.confPassword.length === 0 ||
        this.state.nome_utilizador.length === 0 ||
        this.state.morada_utilizador.length === 0 ||
        this.state.nif_utilizador.length === 0 ||
        this.state.contacto_utilizador.length === 0;

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
            case 'confEmail':
                if (this.state.email_utilizador !== this.state.confEmail) {
                    status = 500;
                    message = 'emails não conferem!';
                    this.setState({ confEmail: '' });
                }

                break;
            case 'password_utilizador':
                if (this.state.password_utilizador.length < 7) {
                    status = 500;
                    message = 'password deve ser maior que 6 caracters!';
                    this.setState({ password_utilizador: '' });
                }

                break;
            case 'confPassword':
                if (this.state.confPassword.length > 0) {
                    if (this.state.password_utilizador !== this.state.confPassword) {
                        status = 500;
                        message = 'passwords não conferem!';
                        this.setState({ confPassword: '' });
                    }
                } else {
                    status = 500;
                    message = 'passwords não conferem!';
                    this.setState({ confPassword: '' });
                }

                break;
            case 'contacto_utilizador':
                if (this.state.contacto_utilizador.length < 9) {
                    status = 500;
                    message = 'Contacto deve ser maior ou igual a 9 caracters!';
                    this.setState({ contacto_utilizador: '' });
                }

                break;
            case 'nif_utilizador':
                if (this.state.nif_utilizador.length !== 9) {
                    status = 500;
                    message = 'NIF deve ser igual a 9 caracters!';
                    this.setState({ nif_utilizador: '' });
                }

                break;
            default:
                break;
        }

        this.setState({ msgErro: { status: status, message: message } });
    };

    doRegister = () => {
        const dadosIn = {
            email_utilizador: this.state.email_utilizador,
            confEmail: this.state.confEmail,
            password_utilizador: this.state.password_utilizador,
            confPassword: this.state.confPassword,
            nome_utilizador: this.state.nome_utilizador,
            morada_utilizador: this.state.morada_utilizador,
            nif_utilizador: this.state.nif_utilizador,
            contacto_utilizador: this.state.contacto_utilizador,
            necessidades_especiais: this.state.necessidades_especiais,
            saldo_utilizador: 0
        };

        fetch_server('/register', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({
                    msgErro: dadosOut.err,
                    email_utilizador: '',
                    password_utilizador: ''
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
            <div>
                <div className='Register'>
                    <div className={classes.root}>
                        <div className={classes.column}>
                            <h2 className={classes.textCenter}>Registar</h2>
                            <div className={classes.row}>
                                <TextField
                                    className={classes.textField}
                                    label='Email'
                                    value={this.state.email_utilizador}
                                    name='email_utilizador'
                                    onChange={this.handleChange}
                                    onBlur={this.fildsValidator}
                                />
                                <TextField
                                    className={classes.textField}
                                    label='Email (confirmação)'
                                    value={this.state.confEmail}
                                    name='confEmail'
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
                                <TextField
                                    className={classes.textField}
                                    label='Senha (confirmação)'
                                    type='password'
                                    value={this.state.confPassword}
                                    name='confPassword'
                                    onChange={this.handleChange}
                                    onBlur={this.fildsValidator}
                                />
                            </div>
                            <div className={classes.row}>
                                <TextField
                                    className={classes.textField}
                                    label='Nome'
                                    value={this.state.nome_utilizador}
                                    name='nome_utilizador'
                                    onChange={this.handleChange}
                                    onBlur={this.fildsValidator}
                                />
                                <TextField
                                    className={classes.textField}
                                    label='Morada'
                                    value={this.state.morada_utilizador}
                                    name='morada_utilizador'
                                    onChange={this.handleChange}
                                    onBlur={this.fildsValidator}
                                />
                            </div>
                            <div className={classes.row}>
                                <TextField
                                    className={classes.textField}
                                    label='Contacto do utilizador'
                                    value={this.state.contacto_utilizador}
                                    name='contacto_utilizador'
                                    onChange={this.handleChange}
                                    onBlur={this.fildsValidator}
                                />
                                <TextField
                                    className={classes.textField}
                                    label='NIF'
                                    value={this.state.nif_utilizador}
                                    name='nif_utilizador'
                                    onChange={this.handleChange}
                                    onBlur={this.fildsValidator}
                                />
                            </div>
                            <div className={classes.row}>
                                <FormControl className={classes.selectForm}>
                                    <InputLabel>Necessidades especiais</InputLabel>
                                    <Select
                                        value={
                                            this.state.necessidades_especiais != null
                                                ? this.state.necessidades_especiais
                                                : ''
                                        }
                                        onChange={this.handleChange}
                                        input={<Input name='necessidades_especiais' id='necessidades_especiais' />}
                                    >
                                        <MenuItem value='N'>
                                            <em>Não</em>
                                        </MenuItem>
                                        <MenuItem value='S'>
                                            <em>Sim</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <br />
                            <br />

                            <div className={classes.rowButton}>
                                <Button
                                    className={classes.buttons}
                                    variant='raised'
                                    color='default'
                                    disabled={this.invalidForm()}
                                    onClick={this.doRegister}
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
            </div>
        );
    }
}

Register.propTypes = {
    doLogin: PropTypes.func.isRequired
};

export default withRouter(withStyles(styles)(Register));
