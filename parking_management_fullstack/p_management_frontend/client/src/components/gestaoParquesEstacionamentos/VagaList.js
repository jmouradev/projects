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

import VagaForm from './VagaForm';

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

class VagaList extends React.Component {
    state = {
        listaVaga: [],
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
        const dadosIn = { opcao: 'last_id', dados: { id_zona: this.state.id_zona } };
        let date = new Date();

        fetch_server('/vaga', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else
                this.setState({
                    formularioAberto: true,
                    estado: 'carregado',
                    itemEditar: {
                        id_zona: this.state.id_zona,
                        id_vaga: dadosOut.dados.max_id + 1,
                        ponto_01_vaga: 0,
                        ponto_02_vaga: 0,
                        ponto_03_vaga: 0,
                        ponto_04_vaga: 0,
                        estado_vaga: 0,
                        dh_inclusao_vaga: date,
                        dh_alteracao_vaga: date,
                        st_vaga: 'A'
                    },
                    opcao: 'insert'
                });
        });
    };

    edit_item = item => {
        this.setState({ formularioAberto: true, itemEditar: item, opcao: 'update' });
    };

    save_item = item => {
        const dadosIn = { opcao: this.state.opcao, dados: item };

        fetch_server('/vaga', dadosIn, dadosOut => {
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
        console.log('id:', id_zona);
        const dadosIn = { opcao: 'list_all', dados: { id_zona: id_zona } };

        fetch_server('/vaga', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else this.setState({ estado: 'carregado', listaVaga: dadosOut.dados.list, addButtonDisabled: false });
        });
    };

    delete_item = id => {
        if (!window.confirm('Eliminar Vaga?')) return;

        const dadosIn = { opcao: 'delete', dados: { id_vaga: id } };

        fetch_server('/vaga', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                this.handleClose();
            } else {
                this.selected_item(this.state.id_zona);
                this.handleClose();
            }
        });
    };

    handleClose = () => this.setState({ formularioAberto: false, itemEditar: null });

    render() {
        const { classes } = this.props;
        const {
            estado,
            listaVaga,
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
                            <h2>Vagas</h2>
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
                                            <TableCell>Id Zona</TableCell>
                                            <TableCell>Id Vaga</TableCell>
                                            <TableCell>Descrição</TableCell>
                                            <TableCell>Tipo de vaga</TableCell>
                                            <TableCell>Estado</TableCell>
                                            <TableCell>Data/Hora inclusão</TableCell>
                                            <TableCell>Data/Hora alteração</TableCell>
                                            <TableCell>Situação</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listaVaga.map((item, index) => (
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
                                                            this.delete_item(item.id_vaga);
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>{item.id_zona}</TableCell>
                                                <TableCell>{item.id_vaga}</TableCell>
                                                <TableCell>{item.descricao_vaga}</TableCell>
                                                <TableCell>{item.id_tipo_vaga}</TableCell>
                                                <TableCell>{item.estado_vaga}</TableCell>
                                                <TableCell>{item.dh_inclusao_vaga}</TableCell>
                                                <TableCell>{item.dh_alteracao_vaga}</TableCell>
                                                <TableCell>{item.st_vaga}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </Paper>

                <Modal open={formularioAberto} onClose={this.handleClose}>
                    <VagaForm
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

VagaList.propTypes = {
    classes: PropTypes.object.isRequired,
    loginData: PropTypes.object
};

export default withStyles(styles)(VagaList);
