import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Modal from '@material-ui/core/Modal';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

import SensorCamaraForm from './SensorCamaraForm';
import SensorCamaraPoints from './SensorCamaraPoints';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import fetch_server from '../../server_interface';

const styles = theme => ({
    root: {
        color: 'black',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },

    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        overflow: 'auto'
    },

    body: {
        width: '100%'
    },

    table: {
        minWidth: 550
    },

    customContentStyle: {
        width: '50%',
        maxWidth: '60%'
    },

    column: {
        display: 'flex',
        flexDirection: 'column'
    },

    row: {
        display: 'flex',
        padding: '1px',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },

    selectForm: {
        width: '50%'
    }
});

class SensorCamaraList extends React.Component {
    state = {
        listaSensorCamara: [],
        listaZona: [],
        estado: 'carregando',
        msgErro: null,
        formularioAberto: false,
        pointsAberto: false,
        itemEditar: null,
        opcao: 'list',
        addButtonDisabled: true
    };

    componentDidMount = props => this.get_list();

    get_list = () => {
        const dadosIn = { opcao: 'list_active', dados: null };

        fetch_server('/zona', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else this.setState({ estado: 'carregado', listaZona: dadosOut.dados.list });
        });
    };

    add_item = () => {
        console.log('add');
        const dadosIn = { opcao: 'last_id', dados: { id_zona: this.state.id_zona } };
        let date = new Date();

        fetch_server('/sensor_camara', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else
                this.setState({
                    formularioAberto: true,
                    estado: 'carregado',
                    itemEditar: {
                        id_zona: this.state.id_zona,
                        id_sensor_camara: dadosOut.dados.max_id + 1,
                        id_tipo_sensor: 1,
                        ip_sensor_camara: '123.456.789.012',
                        config_1_sensor_camara: '{}',
                        config_2_sensor_camara: '{}',
                        config_3_sensor_camara: '{}',
                        config_4_sensor_camara: '{}',
                        config_5_sensor_camara: '{}',
                        dh_inclusao_sensor_camara: date,
                        dh_alteracao_sensor_camara: date,
                        st_sensor_camara: 'A'
                    },
                    opcao: 'insert'
                });
        });

        console.log('itemEdit', this.state.itemEditar);
    };

    edit_item = item => {
        this.setState({ formularioAberto: true, itemEditar: item, opcao: 'update' });
        console.log('edit', item);
    };

    save_item = item => {
        console.log('saving item', item);
        const dadosIn = { opcao: this.state.opcao, dados: item };

        fetch_server('/sensor_camara', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                this.handleClose();
            } else {
                this.selected_item(this.state.id_zona);
                this.handleClose();
            }
        });
    };

    selected_item_event = ev => {
        console.log('ev.target.name:', ev.target.name, 'ev.target.value:', ev.target.value);
        this.setState({ [ev.target.name]: ev.target.value });
        this.selected_item(ev.target.value);
    };

    selected_item = id_zona => {
        const dadosIn = { opcao: 'list_all', dados: { id_zona: id_zona } };

        fetch_server('/sensor_camara', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else
                this.setState({
                    estado: 'carregado',
                    listaSensorCamara: dadosOut.dados.list,
                    addButtonDisabled: false
                });
        });
    };

    validate_pointsButton = item => {
        return (
            item.path_imagem_sensor_camara.replace(/\s/g, '').length === 0 &&
            item.largura_imagem_sensor_camara === 0 &&
            item.altura_imagem_sensor_camara === 0
        );
    };

    delete_item = id => {
        if (!window.confirm('Eliminar Camara?')) return;
        console.log('delete', id);

        const dadosIn = { opcao: 'delete', dados: { id_sensor_camara: id } };

        fetch_server('/sensor_camara', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                this.handleClose();
            } else {
                this.selected_item(this.state.id_zona);
                this.handleClose();
            }
        });
    };

    choose_points = item => {
        console.log('marcar', item);
        this.setState({
            itemEditar: item,
            pointsAberto: true,
            estado: 'carregado',
            opcao: 'update'
        });
    };

    handleClose = () => this.setState({ formularioAberto: false, pointsAberto: false, itemEditar: null });

    render() {
        const { classes } = this.props;
        const {
            estado,
            listaSensorCamara,
            listaZona,
            msgErro,
            formularioAberto,
            pointsAberto,
            itemEditar,
            opcao,
            addButtonDisabled
        } = this.state;

        return (
            <div>
                <Paper className={classes.root}>
                    {estado === 'carregando' ? (
                        <h3> Carregando... </h3>
                    ) : estado === 'erro' ? (
                        <h3> Erro: {msgErro.message} </h3>
                    ) : (
                        <div className={classes.body}>
                            <h2>Sensores câmaras</h2>
                            <div>
                                <FormControl className={classes.selectForm}>
                                    <InputLabel>Zona</InputLabel>
                                    <Select
                                        value={this.state.id_zona != null ? this.state.id_zona : ''}
                                        onChange={this.selected_item_event}
                                        input={<Input name='id_zona' />}
                                    >
                                        {listaZona &&
                                            listaZona.map((item, index) => (
                                                <MenuItem key={index} value={item.id_zona}>
                                                    {item.id_zona} - {item.descricao_zona}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                                <br />
                                <br />
                            </div>
                            <div>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <IconButton onClick={this.add_item} disabled={addButtonDisabled}>
                                                    <AddIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>Id Camara</TableCell>
                                            <TableCell>Id Zona</TableCell>
                                            <TableCell>Descrição</TableCell>
                                            <TableCell>Tipo</TableCell>
                                            <TableCell>IP</TableCell>
                                            <TableCell>Data/Hora alteração</TableCell>
                                            <TableCell>Situação</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listaSensorCamara.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell component='th' scope='row'>
                                                    <IconButton
                                                        onClick={() => {
                                                            this.edit_item(item);
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => {
                                                            this.delete_item(item.id_sensor_camara);
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => {
                                                            this.choose_points(item);
                                                        }}
                                                        disabled={this.validate_pointsButton(item)}
                                                    >
                                                        <FullscreenIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>{item.id_sensor_camara}</TableCell>
                                                <TableCell>{item.id_zona}</TableCell>
                                                <TableCell>{item.descricao_sensor_camara}</TableCell>
                                                <TableCell>{item.id_tipo_sensor}</TableCell>
                                                <TableCell>{item.ip_sensor_camara}</TableCell>
                                                <TableCell>{item.dh_alteracao_sensor_camara}</TableCell>
                                                <TableCell>{item.st_sensor_camara}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </Paper>

                <Modal open={formularioAberto} onClose={this.handleClose}>
                    <SensorCamaraForm
                        function_save={this.save_item}
                        function_cancel={this.handleClose}
                        item_editar={itemEditar}
                        option={opcao}
                    />
                </Modal>

                <Modal open={pointsAberto} onClose={this.handleClose}>
                    <SensorCamaraPoints
                        function_save={this.save_item}
                        function_cancel={this.handleClose}
                        item_editar={itemEditar}
                    />
                </Modal>
            </div>
        );
    }
}

SensorCamaraList.propTypes = {
    classes: PropTypes.object.isRequired,
    loginData: PropTypes.object
};

export default withStyles(styles)(SensorCamaraList);
