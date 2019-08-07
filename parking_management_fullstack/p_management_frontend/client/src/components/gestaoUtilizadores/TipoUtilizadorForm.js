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

class TipoUtilizadorForm extends React.Component {
    state = {};

    handleChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    save_item = () => this.props.function_save(this.state);

    componentDidMount = () => {
        const { item_editar } = this.props;
        if (item_editar) {
            this.setState({
                id_tipo_utilizador: item_editar.id_tipo_utilizador,
                descricao_tipo_utilizador: item_editar.descricao_tipo_utilizador,
                id_nivel_acesso: item_editar.id_nivel_acesso,
                dh_inclusao_tipo_utilizador: item_editar.dh_inclusao_tipo_utilizador,
                dh_alteracao_tipo_utilizador: item_editar.dh_alteracao_tipo_utilizador,
                st_tipo_utilizador: item_editar.st_tipo_utilizador
            });
        }
    };

    render() {
        const { classes, function_cancel, lista_nivel_acesso, option } = this.props;
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

        return (
            <div className={classes.paper}>
                <div className={classes.root}>
                    <div className={classes.column}>
                        <h2>Tipo de Utilizador</h2>
                        <div className={classes.row}>{buildField('Id', 'id_tipo_utilizador', false, false)}</div>
                        <div className={classes.row}>{buildField('Descrição', 'descricao_tipo_utilizador')}</div>
                        <div className={classes.row}>
                            <FormControl className={classes.selectForm}>
                                <InputLabel>Nível de acesso</InputLabel>
                                <Select
                                    value={this.state.id_nivel_acesso != null ? this.state.id_nivel_acesso : ''}
                                    onChange={this.handleChange}
                                    input={<Input name='id_nivel_acesso' id='id_nivel_acesso' />}
                                >
                                    <MenuItem value=''>
                                        <em>Nada</em>
                                    </MenuItem>
                                    {lista_nivel_acesso &&
                                        lista_nivel_acesso.map((item, index) => (
                                            <MenuItem key={index} value={item.id_nivel_acesso}>
                                                {item.descricao_nivel_acesso}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.row}>
                            {buildField('Data/Hora inclusão', 'dh_inclusao_tipo_utilizador', false, true)}
                        </div>
                        <div className={classes.row}>
                            {buildField('Data/Hora alteração', 'dh_alteracao_tipo_utilizador', false, true)}
                        </div>
                        <div className={classes.row}>
                            <FormControl className={classes.selectForm}>
                                <InputLabel>Situação</InputLabel>
                                <Select
                                    value={this.state.st_tipo_utilizador != null ? this.state.st_tipo_utilizador : ''}
                                    onChange={this.handleChange}
                                    input={<Input name='st_tipo_utilizador' id='st_tipo_utilizador' />}
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
    }
}

TipoUtilizadorForm.propTypes = {
    classes: PropTypes.object.isRequired,
    function_save: PropTypes.object.isRequired,
    function_cancel: PropTypes.func.isRequired,
    item_editar: PropTypes.object,
    lista_nivel_acesso: PropTypes.array,
    option: PropTypes.object
};

export default withStyles(styles)(TipoUtilizadorForm);
