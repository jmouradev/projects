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

class SensorCamaraForm extends React.Component {
    state = {};

    handleChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    save_item = () => this.props.function_save(this.state);

    componentDidMount = () => {
        const { item_editar } = this.props;
        if (item_editar) {
            this.setState({
                id_sensor_camara: item_editar.id_sensor_camara,
                id_zona: item_editar.id_zona,
                descricao_sensor_camara: item_editar.descricao_sensor_camara,
                id_tipo_sensor: item_editar.id_tipo_sensor,
                ip_sensor_camara: item_editar.ip_sensor_camara,
                config_1_sensor_camara: item_editar.config_1_sensor_camara,
                send_config_1_sensor_camara: item_editar.send_config_1_sensor_camara,
                config_2_sensor_camara: item_editar.config_2_sensor_camara,
                send_config_2_sensor_camara: item_editar.send_config_2_sensor_camara,
                config_3_sensor_camara: item_editar.config_3_sensor_camara,
                send_config_3_sensor_camara: item_editar.send_config_3_sensor_camara,
                config_4_sensor_camara: item_editar.config_4_sensor_camara,
                send_config_4_sensor_camara: item_editar.send_config_4_sensor_camara,
                config_5_sensor_camara: item_editar.config_5_sensor_camara,
                send_config_5_sensor_camara: item_editar.send_config_5_sensor_camara,
                config_6_sensor_camara: item_editar.config_6_sensor_camara,
                send_config_6_sensor_camara: item_editar.send_config_6_sensor_camara,
                path_imagem_sensor_camara: item_editar.path_imagem_sensor_camara,
                largura_imagem_sensor_camara: item_editar.largura_imagem_sensor_camara,
                altura_imagem_sensor_camara: item_editar.altura_imagem_sensor_camara,
                dh_inclusao_sensor_camara: item_editar.dh_inclusao_sensor_camara,
                dh_alteracao_sensor_camara: item_editar.dh_alteracao_sensor_camara,
                st_sensor_camara: item_editar.st_sensor_camara
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
                        <h2>Sensor câmara</h2>
                        <div className={classes.row}>{buildField('Id Camara', 'id_sensor_camara', false, true)}</div>
                        <div className={classes.row}>{buildField('Id Zona', 'id_zona', false, true)}</div>
                        <div className={classes.row}>{buildField('Descrição', 'descricao_sensor_camara')}</div>
                        <div className={classes.row}>{buildField('Tipo', 'id_tipo_sensor', false, true)}</div>
                        <div className={classes.row}>{buildField('IP', 'ip_sensor_camara', false, true)}</div>
                        <div className={classes.row}>
                            {buildField('Configuração 1', 'config_1_sensor_camara', false, true)}
                        </div>
                        <div className={classes.row}>
                            {buildField('Enviar configuração 1', 'send_config_1_sensor_camara', false, true)}
                        </div>
                        <div className={classes.row}>
                            {buildField('Configuração 2', 'config_2_sensor_camara', false, true)}
                        </div>
                        <div className={classes.row}>
                            {buildField('Enviar configuração 2', 'send_config_2_sensor_camara', false, true)}
                        </div>
                        <div className={classes.row}>{buildField('Configuração 3', 'config_3_sensor_camara')}</div>
                        <div className={classes.row}>
                            {buildField('Enviar configuração 3', 'send_config_3_sensor_camara')}
                        </div>
                        <div className={classes.row}>{buildField('Configuração 4', 'config_4_sensor_camara')}</div>
                        <div className={classes.row}>
                            {buildField('Enviar configuração 4', 'send_config_4_sensor_camara')}
                        </div>
                        <div className={classes.row}>
                            {buildField('Configuração 5', 'config_5_sensor_camara', false, true)}
                        </div>
                        <div className={classes.row}>
                            {buildField('Enviar configuração 5', 'send_config_5_sensor_camara', false, true)}
                        </div>
                        <div className={classes.row}>{buildField('Configuração 6', 'config_6_sensor_camara')}</div>
                        <div className={classes.row}>
                            {buildField('Enviar configuração 6', 'send_config_6_sensor_camara')}
                        </div>
                        <div className={classes.row}>{buildField('Path da imagem', 'path_imagem_sensor_camara')}</div>
                        <div className={classes.row}>
                            {buildField('Largura da imagem', 'largura_imagem_sensor_camara')}
                        </div>
                        <div className={classes.row}>
                            {buildField('Altura da imagem', 'altura_imagem_sensor_camara')}
                        </div>
                        <div className={classes.row}>
                            {buildField('Data/Hora inclusão', 'dh_inclusao_sensor_camara', false, true)}
                        </div>
                        <div className={classes.row}>
                            {buildField('Data/Hora alteração', 'dh_alteracao_sensor_camara', false, true)}
                        </div>
                        <div className={classes.row}>
                            <FormControl className={classes.selectForm}>
                                <InputLabel>Situação</InputLabel>
                                <Select
                                    value={this.state.st_sensor_camara != null ? this.state.st_sensor_camara : ''}
                                    onChange={this.handleChange}
                                    input={<Input name='st_sensor_camara' id='st_sensor_camara' />}
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

SensorCamaraForm.propTypes = {
    classes: PropTypes.object.isRequired,
    function_save: PropTypes.object.isRequired,
    function_cancel: PropTypes.func.isRequired,
    item_editar: PropTypes.object,
    option: PropTypes.object
};

export default withStyles(styles)(SensorCamaraForm);
