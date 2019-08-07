/*jshint esversion: 6 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        color: 'black',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        width: '90%',
        marginTop: theme.spacing.unit * 3
    },

    paper: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: '70%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        overflow: 'scroll',
        height: '90%'
    },

    customContentStyle: {
        width: '80%',
        maxWidth: '90%'
    },

    column: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },

    row: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },

    buttons: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '10px'
    },

    textField: {
        width: '100%',
        margin: '5px'
    },

    selectForm: {
        width: '50%'
    }
});

class UtilizadorForm extends React.Component {
    state = {};

    handleChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    save_item = () => this.props.function_save(this.state);

    componentDidMount = () => {
        console.log('id_tipo_utilizador:', this.props.loginData.id_tipo_utilizador);
        const { item_editar } = this.props;
        if (item_editar) {
            this.setState({
                id_utilizador: item_editar.id_utilizador,
                email_utilizador: item_editar.email_utilizador,
                password_utilizador: item_editar.password_utilizador,
                nome_utilizador: item_editar.nome_utilizador,
                id_tipo_utilizador: item_editar.id_tipo_utilizador,
                necessidades_especiais: item_editar.necessidades_especiais,
                morada_utilizador: item_editar.morada_utilizador,
                contacto_utilizador: item_editar.contacto_utilizador,
                num_funcionario: item_editar.num_funcionario,
                nif_utilizador: item_editar.nif_utilizador,
                saldo_utilizador: item_editar.saldo_utilizador,
                dh_inclusao_utilizador: item_editar.dh_inclusao_utilizador,
                dh_alteracao_utilizador: item_editar.dh_alteracao_utilizador,
                st_utilizador: item_editar.st_utilizador
            });
        }
    };

    render() {
        const { classes, function_cancel, lista_tipo_utilizador, option } = this.props;
        let bloqueado = true;

        if (option === 'insert') {
            bloqueado = false;
        }

        console.log('Option:', option, 'bloqueado:', bloqueado);

        let buildField = (label, field, isPassword, isDisabled) => (
            <TextField
                className={classes.textField}
                label={label}
                value={this.state[field] != null ? this.state[field] : ''}
                type={isPassword ? 'password' : 'text'}
                disabled={isDisabled}
                name={field}
                onChange={this.handleChange}
            />
        );

        let buildButton = (text, onClickFunction) => (
            <Button variant='raised' color='default' onClick={onClickFunction}>
                {text}
            </Button>
        );

        let layoutUser = (
            <div className={classes.paper}>
                <div className={classes.root}>
                    <div className={classes.column}>
                        <h2>Utilizador</h2>
                        <div className={classes.row}>{buildField('Id', 'id_utilizador', false, true)}</div>
                        <div className={classes.row}>{buildField('Email', 'email_utilizador')}</div>
                        <div className={classes.row}>{buildField('Senha', 'password_utilizador', true)}</div>
                        <div className={classes.row}>{buildField('Nome', 'nome_utilizador')}</div>
                        <div className={classes.row}>{buildField('Morada', 'morada_utilizador')}</div>
                        <div className={classes.row}>{buildField('Contacto', 'contacto_utilizador')}</div>
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
                        <div className={classes.row}>{buildField('NIF', 'nif_utilizador')}</div>
                        <div className={classes.row}>{buildField('Saldo', 'saldo_utilizador', false, true)}</div>
                        <div className={classes.row}>
                            {buildField('Data/Hora inclusão', 'dh_inclusao_utilizador', false, true)}
                        </div>
                        <div className={classes.row}>
                            {buildField('Data/Hora alteração', 'dh_alteracao_utilizador', false, true)}
                        </div>
                        <div className={classes.row}>{buildField('Situação', 'st_utilizador', false, true)}</div>

                        <div className={classes.buttons}>
                            {buildButton('Executar', this.save_item)}
                            {buildButton('Voltar', function_cancel)}
                        </div>
                    </div>
                </div>
            </div>
        );

        let layoutAdmin = (
            <div className={classes.paper}>
                <div className={classes.root}>
                    <div className={classes.column}>
                        <h2>Utilizador</h2>
                        <div className={classes.row}>{buildField('Id', 'id_utilizador', false, true)}</div>
                        <div className={classes.row}>{buildField('Email', 'email_utilizador')}</div>
                        <div className={classes.row}>{buildField('Senha', 'password_utilizador', true)}</div>
                        <div className={classes.row}>{buildField('Nome', 'nome_utilizador')}</div>
                        <div className={classes.row}>{buildField('Morada', 'morada_utilizador')}</div>
                        <div className={classes.row}>{buildField('Contacto', 'contacto_utilizador')}</div>
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
                        <div className={classes.row}>{buildField('NIF', 'nif_utilizador')}</div>
                        <div className={classes.row}>
                            <FormControl className={classes.selectForm}>
                                <InputLabel>Tipo de utilizador</InputLabel>
                                <Select
                                    value={this.state.id_tipo_utilizador != null ? this.state.id_tipo_utilizador : ''}
                                    onChange={this.handleChange}
                                    input={<Input name='id_tipo_utilizador' id='id_tipo_utilizador' />}
                                >
                                    <MenuItem value=''>
                                        <em>Nada</em>
                                    </MenuItem>
                                    {lista_tipo_utilizador &&
                                        lista_tipo_utilizador.map((item, index) => (
                                            <MenuItem key={index} value={item.id_tipo_utilizador}>
                                                {item.descricao_tipo_utilizador}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.row}>{buildField('Número de funcionário', 'num_funcionario')}</div>
                        <div className={classes.row}>{buildField('Saldo de funcionário', 'saldo_funcionario')}</div>
                        <div className={classes.row}>
                            {buildField('Data/Hora inclusão', 'dh_inclusao_utilizador', false, true)}
                        </div>
                        <div className={classes.row}>
                            {buildField('Data/Hora alteração', 'dh_alteracao_utilizador', false, true)}
                        </div>
                        <div className={classes.row}>
                            <FormControl className={classes.selectForm}>
                                <InputLabel>Situação</InputLabel>
                                <Select
                                    value={this.state.st_utilizador != null ? this.state.st_utilizador : ''}
                                    onChange={this.handleChange}
                                    input={<Input name='st_utilizador' id='st_utilizador' />}
                                >
                                    <MenuItem value='A'>
                                        <em>Ativo</em>
                                    </MenuItem>
                                    <MenuItem value='B'>
                                        <em>Bloquedo</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className={classes.buttons}>
                            {buildButton('Executar', this.save_item)}
                            {buildButton('Voltar', function_cancel)}
                        </div>
                    </div>
                </div>
            </div>
        );

        return this.props.loginData.id_tipo_utilizador === 4 ? layoutAdmin : layoutUser;
    }
}

UtilizadorForm.propTypes = {
    classes: PropTypes.object.isRequired,
    function_save: PropTypes.object.isRequired,
    function_cancel: PropTypes.func.isRequired,
    loginData: PropTypes.object,
    item_editar: PropTypes.object,
    lista_tipo_utilizador: PropTypes.array,
    option: PropTypes.object
};

export default withStyles(styles)(UtilizadorForm);
