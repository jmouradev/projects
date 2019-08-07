/*jshint esversion: 6 */

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

import TipoUtilizadorForm from './TipoUtilizadorForm';

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

class TipoUtilizadorList extends React.Component {
    state = {
        listaTipoUtilizador: [],
        listaNivelAcesso: [],
        estado: 'carregando',
        msgErro: null,
        formularioAberto: false,
        itemEditar: null,
        opcao: 'list'
    };

    componentDidMount = props => this.get_list();

    get_list = () => {
        let dadosIn = { opcao: 'list_all', dados: null };

        fetch_server('/tipo_utilizador', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
            } else {
                const lista_tipo_utilizador = dadosOut.dados.list;
                dadosIn = { opcao: 'list_active', dados: null };

                fetch_server('/nivel_acesso', dadosIn, dadosOut => {
                    if (dadosOut.err) {
                        this.setState({ estado: 'erro', msgErro: dadosOut.err });
                    } else {
                        let nivelAcessoConsulta = {};

                        for (let it of dadosOut.dados.list) {
                            nivelAcessoConsulta[it.id_nivel_acesso] = it.descricao_nivel_acesso;
                        }

                        this.setState({
                            estado: 'carregado',
                            listaTipoUtilizador: lista_tipo_utilizador,
                            listaNivelAcesso: dadosOut.dados.list,
                            nivelAcessoConsulta
                        });
                    }
                });
            }
        });
    };

    add_item = () => {
        const dadosIn = { opcao: 'last_id', dados: null };
        let date = new Date();

        fetch_server('/tipo_utilizador', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else
                this.setState({
                    formularioAberto: true,
                    estado: 'carregado',
                    itemEditar: {
                        id_tipo_utilizador: dadosOut.dados.max_id + 1,
                        dh_inclusao_tipo_utilizador: date,
                        dh_alteracao_tipo_utilizador: date,
                        st_tipo_utilizador: 'A'
                    },
                    opcao: 'insert'
                });
        });
    };

    edit_item = item => {
        this.setState({ formularioAberto: true, itemEditar: item, opcao: 'update' });
    };

    save_item = item => {
        console.log(this.state.opcao);
        const dadosIn = { opcao: this.state.opcao, dados: item };

        fetch_server('/tipo_utilizador', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                this.handleClose();
            } else {
                this.get_list();
                this.handleClose();
            }
        });
    };

    delete_item = id => {
        if (!window.confirm('Eliminar Tipo de Utilizador?')) return;

        const dadosIn = { opcao: 'delete', dados: { id_tipo_utilizador: id } };

        fetch_server('/tipo_utilizador', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                this.handleClose();
            } else {
                this.get_list();
                this.handleClose();
            }
        });
    };

    handleClose = () => this.setState({ formularioAberto: false, itemEditar: null });

    render() {
        const { classes } = this.props;
        const {
            estado,
            listaTipoUtilizador,
            listaNivelAcesso,
            msgErro,
            formularioAberto,
            itemEditar,
            opcao,
            nivelAcessoConsulta
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
                            <h2>Tipos de Utilizadores</h2>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <IconButton onClick={this.add_item}>
                                                <AddIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Descrição</TableCell>
                                        <TableCell>Nivel de acesso</TableCell>
                                        <TableCell>Data/Hora inclusão</TableCell>
                                        <TableCell>Data/Hora alteração</TableCell>
                                        <TableCell>Situação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listaTipoUtilizador.map((item, index) => (
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
                                                        this.delete_item(item.id_tipo_utilizador);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{item.id_tipo_utilizador}</TableCell>
                                            <TableCell>{item.descricao_tipo_utilizador}</TableCell>
                                            <TableCell>{nivelAcessoConsulta[item.id_nivel_acesso]}</TableCell>
                                            <TableCell>{item.dh_inclusao_tipo_utilizador}</TableCell>
                                            <TableCell>{item.dh_alteracao_tipo_utilizador}</TableCell>
                                            <TableCell>{item.st_tipo_utilizador}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </Paper>

                <Modal open={formularioAberto} onClose={this.handleClose}>
                    <TipoUtilizadorForm
                        function_save={this.save_item}
                        function_cancel={this.handleClose}
                        item_editar={itemEditar}
                        option={opcao}
                        lista_nivel_acesso={listaNivelAcesso}
                    />
                </Modal>
            </div>
        );
    }
}

TipoUtilizadorList.propTypes = {
    classes: PropTypes.object.isRequired,
    loginData: PropTypes.object
};

export default withStyles(styles)(TipoUtilizadorList);
