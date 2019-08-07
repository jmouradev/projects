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

class ZonaForm extends React.Component {
    state = {};

    handleChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    save_item = () => this.props.function_save(this.state);

    componentDidMount = () => {
        const { item_editar } = this.props;
        console.log('item_editar:', item_editar);
        if (item_editar) {
            this.setState({
                id_zona: item_editar.id_zona,
                descricao_zona: item_editar.descricao_zona,
                longitude_zona: item_editar.longitude_zona,
                latitude_zona: item_editar.latitude_zona,
                morada_zona: item_editar.morada_zona,
                horario_funcionamento_zona: item_editar.horario_funcionamento_zona,
                path_imagem_zona: item_editar.path_imagem_zona,
                largura_imagem_zona: item_editar.largura_imagem_zona,
                altura_imagem_zona: item_editar.altura_imagem_zona,
                config_1_zona: item_editar.config_1_zona,
                valor_minuto_zona: item_editar.valor_minuto_zona,
                valor_minimo_zona: item_editar.valor_minimo_zona,
                valor_maximo_zona: item_editar.valor_maximo_zona,
                fracao_zona: item_editar.fracao_zona,
                dh_inclusao_zona: item_editar.dh_inclusao_zona,
                dh_alteracao_zona: item_editar.dh_alteracao_zona,
                st_zona: item_editar.st_zona
            });
        }
    };

    render() {
        const { classes, function_cancel, option } = this.props;
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
                        <h2>Zona</h2>
                        <div className={classes.row}>{buildField('Id', 'id_zona', false, true)}</div>
                        <div className={classes.row}>{buildField('Descrição', 'descricao_zona')}</div>
                        <div className={classes.row}>{buildField('Longitude', 'longitude_zona')}</div>
                        <div className={classes.row}>{buildField('Latitude', 'latitude_zona')}</div>
                        <div className={classes.row}>{buildField('Morada', 'morada_zona')}</div>
                        <div className={classes.row}>
                            {buildField('Horário de funcionamento', 'horario_funcionamento_zona')}
                        </div>
                        <div className={classes.row}>{buildField('Path da imagem', 'path_imagem_zona')}</div>
                        <div className={classes.row}>{buildField('Largura da imagem', 'largura_imagem_zona')}</div>
                        <div className={classes.row}>{buildField('Altura da imagem', 'altura_imagem_zona')}</div>
                        <div className={classes.row}>{buildField('Configuração 1', 'config_1_zona')}</div>
                        <div className={classes.row}>{buildField('Valor do minuto', 'valor_minuto_zona')}</div>
                        <div className={classes.row}>{buildField('Valor mínimo', 'valor_minimo_zona')}</div>
                        <div className={classes.row}>{buildField('Valor máximo', 'valor_maximo_zona')}</div>
                        <div className={classes.row}>{buildField('Fração (em minutos)', 'fracao_zona')}</div>
                        <div className={classes.row}>
                            {buildField('Data/Hora inclusão', 'dh_inclusao_zona', false, true)}
                        </div>
                        <div className={classes.row}>
                            {buildField('Data/Hora alteração', 'dh_alteracao_zona', false, true)}
                        </div>
                        <div className={classes.row}>
                            <FormControl className={classes.selectForm}>
                                <InputLabel>Situação</InputLabel>
                                <Select
                                    value={this.state.st_zona != null ? this.state.st_zona : ''}
                                    onChange={this.handleChange}
                                    input={<Input name='st_zona' id='st_zona' />}
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

ZonaForm.propTypes = {
    classes: PropTypes.object.isRequired,
    function_save: PropTypes.object.isRequired,
    function_cancel: PropTypes.func.isRequired,
    item_editar: PropTypes.object,
    option: PropTypes.object
};

export default withStyles(styles)(ZonaForm);
