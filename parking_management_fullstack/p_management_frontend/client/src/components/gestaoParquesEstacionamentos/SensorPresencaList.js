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

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import SensorPresencaForm from './SensorPresencaForm';

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

class SensorPresencaList extends React.Component {
    state = {
        listaSensorPresenca: [],
        listaZona: [],
        estado: 'carregando',
        msgErro: null,
        formularioAberto: false,
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
        const dadosIn = { opcao: 'last_id', dados: null };
        let date = new Date();

        fetch_server('/sensor_presenca', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else
                this.setState({
                    formularioAberto: true,
                    estado: 'carregado',
                    itemEditar: {
                        id_zona: this.state.id_zona,
                        id_sensor_presenca: dadosOut.dados.max_id + 1,
                        ip_sensor_presenca: '123.456.789.012',
                        config_1_sensor_presenca: '{}',
                        config_2_sensor_presenca: '{}',
                        dh_inclusao_sensor_presenca: date,
                        dh_alteracao_sensor_presenca: date,
                        st_sensor_presenca: 'A'
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

        fetch_server('/sensor_presenca', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                this.handleClose();
            } else {
                this.selected_item(this.state.id_zona);
                this.handleClose();
            }
        });
    };

    delete_item = id => {
        if (!window.confirm('Eliminar Sensor?')) return;
        console.log('delete', id);

        const dadosIn = { opcao: 'delete', dados: { id_sensor_presenca: id } };

        fetch_server('/sensor_presenca', dadosIn, dadosOut => {
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

        fetch_server('/sensor_presenca', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else
                this.setState({
                    estado: 'carregado',
                    listaSensorPresenca: dadosOut.dados.list,
                    addButtonDisabled: false
                });
        });
    };

    handleClose = () => this.setState({ formularioAberto: false, itemEditar: null });

    render() {
        const { classes } = this.props;
        const {
            estado,
            listaSensorPresenca,
            listaZona,
            msgErro,
            formularioAberto,
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
                            <h2>Sensores de presença</h2>
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
                                            <TableCell>Id Sensor</TableCell>
                                            <TableCell>Id Zona</TableCell>
                                            <TableCell>Id Vaga</TableCell>
                                            <TableCell>Descrição</TableCell>
                                            <TableCell>Tipo</TableCell>
                                            <TableCell>IP</TableCell>
                                            <TableCell>Data/Hora alteração</TableCell>
                                            <TableCell>Situação</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listaSensorPresenca.map((item, index) => (
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
                                                            this.delete_item(item.id_sensor_presenca);
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>{item.id_sensor_presenca}</TableCell>
                                                <TableCell>{item.id_zona}</TableCell>
                                                <TableCell>{item.id_vaga}</TableCell>
                                                <TableCell>{item.descricao_sensor_presenca}</TableCell>
                                                <TableCell>{item.id_tipo_sensor}</TableCell>
                                                <TableCell>{item.ip_sensor_presenca}</TableCell>
                                                <TableCell>{item.dh_alteracao_sensor_presenca}</TableCell>
                                                <TableCell>{item.st_sensor_presenca}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </Paper>

                <Modal open={formularioAberto} onClose={this.handleClose}>
                    <SensorPresencaForm
                        function_save={this.save_item}
                        function_cancel={this.handleClose}
                        item_editar={itemEditar}
                        option={opcao}
                    />
                </Modal>
            </div>
        );
    }
}

SensorPresencaList.propTypes = {
    classes: PropTypes.object.isRequired,
    loginData: PropTypes.object
};

export default withStyles(styles)(SensorPresencaList);
