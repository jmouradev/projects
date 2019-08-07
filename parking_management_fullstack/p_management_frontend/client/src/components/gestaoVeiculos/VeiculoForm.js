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

class VeiculoForm extends React.Component {
    state = {};

    handleChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    save_item = () => this.props.function_save(this.state);

    componentDidMount = () => {
        const { item_editar } = this.props;
        if (item_editar) {
            this.setState({
                id_veiculo: item_editar.id_veiculo,
                matricula_veiculo: item_editar.matricula_veiculo,
                id_tipo_veiculo: item_editar.id_tipo_veiculo,
                id_marca_veiculo: item_editar.id_marca_veiculo,
                id_modelo_veiculo: item_editar.id_modelo_veiculo,
                id_cor_veiculo: item_editar.id_cor_veiculo,
                dh_inclusao_veiculo: item_editar.dh_inclusao_veiculo,
                dh_alteracao_veiculo: item_editar.dh_alteracao_veiculo,
                st_veiculo: item_editar.st_veiculo
            });
        }
    };

    render() {
        const {
            classes,
            function_cancel,
            lista_tipo_veiculo,
            lista_marca_veiculo,
            lista_modelo_veiculo,
            lista_cor_veiculo,
            option
        } = this.props;
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
                        <h2>Veículo</h2>
                        <div className={classes.row}>{buildField('Id', 'id_veiculo', false, true)}</div>
                        <div className={classes.row}>
                            {buildField('Matricula', 'matricula_veiculo', false, bloqueado)}
                        </div>
                        <div className={classes.row}>
                            <FormControl className={classes.selectForm}>
                                <InputLabel>Tipo de veiculo</InputLabel>
                                <Select
                                    value={this.state.id_tipo_veiculo != null ? this.state.id_tipo_veiculo : ''}
                                    onChange={this.handleChange}
                                    input={<Input name='id_tipo_veiculo' id='id_tipo_veiculo' />}
                                >
                                    <MenuItem value=''>
                                        <em>Nada</em>
                                    </MenuItem>
                                    {lista_tipo_veiculo &&
                                        lista_tipo_veiculo.map((item, index) => (
                                            <MenuItem key={index} value={item.id_tipo_veiculo}>
                                                {item.descricao_tipo_veiculo}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.row}>
                            <FormControl className={classes.selectForm}>
                                <InputLabel>Marca de veiculo</InputLabel>
                                <Select
                                    value={this.state.id_marca_veiculo != null ? this.state.id_marca_veiculo : ''}
                                    onChange={this.handleChange}
                                    input={<Input name='id_marca_veiculo' id='id_marca_veiculo' />}
                                >
                                    <MenuItem value=''>
                                        <em>Nada</em>
                                    </MenuItem>
                                    {lista_marca_veiculo &&
                                        lista_marca_veiculo.map((item, index) => (
                                            <MenuItem key={index} value={item.id_marca_veiculo}>
                                                {item.descricao_marca_veiculo}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.row}>
                            <FormControl className={classes.selectForm}>
                                <InputLabel>Modelo de veiculo</InputLabel>
                                <Select
                                    value={this.state.id_modelo_veiculo != null ? this.state.id_modelo_veiculo : ''}
                                    onChange={this.handleChange}
                                    input={<Input name='id_modelo_veiculo' id='id_modelo_veiculo' />}
                                >
                                    <MenuItem value=''>
                                        <em>Nada</em>
                                    </MenuItem>
                                    {lista_modelo_veiculo &&
                                        lista_modelo_veiculo.map((item, index) => (
                                            <MenuItem key={index} value={item.id_modelo_veiculo}>
                                                {item.descricao_modelo_veiculo}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.row}>
                            <FormControl className={classes.selectForm}>
                                <InputLabel>Cor de veiculo</InputLabel>
                                <Select
                                    value={this.state.id_cor_veiculo != null ? this.state.id_cor_veiculo : ''}
                                    onChange={this.handleChange}
                                    input={<Input name='id_cor_veiculo' id='id_cor_veiculo' />}
                                >
                                    <MenuItem value=''>
                                        <em>Nada</em>
                                    </MenuItem>
                                    {lista_cor_veiculo &&
                                        lista_cor_veiculo.map((item, index) => (
                                            <MenuItem key={index} value={item.id_cor_veiculo}>
                                                {item.descricao_cor_veiculo}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.row}>
                            {buildField('Data/Hora inclusão', 'dh_inclusao_veiculo', false, true)}
                        </div>
                        <div className={classes.row}>
                            {buildField('Data/Hora alteração', 'dh_alteracao_veiculo', false, true)}
                        </div>
                        <div className={classes.row}>
                            <FormControl className={classes.selectForm}>
                                <InputLabel>Situação</InputLabel>
                                <Select
                                    value={this.state.st_veiculo != null ? this.state.st_veiculo : ''}
                                    onChange={this.handleChange}
                                    input={<Input name='st_veiculo' id='st_veiculo' />}
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
                        <br />
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

VeiculoForm.propTypes = {
    classes: PropTypes.object.isRequired,
    function_save: PropTypes.object.isRequired,
    function_cancel: PropTypes.func.isRequired,
    item_editar: PropTypes.object,
    lista_tipo_veiculo: PropTypes.array,
    lista_marca_veiculo: PropTypes.array,
    lista_modelo_veiculo: PropTypes.array,
    lista_cor_veiculo: PropTypes.array,
    option: PropTypes.object
};

export default withStyles(styles)(VeiculoForm);
