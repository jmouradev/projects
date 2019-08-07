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

import UtilizadorForm from './UtilizadorForm';

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

class UtilizadorList extends React.Component {
    state = {
        listaUtilizador: [],
        listaTipoUtilizador: [],
        estado: 'carregando',
        msgErro: null,
        formularioAberto: false,
        itemEditar: null,
        opcao: 'list'
    };

    componentDidMount = props => this.get_list();

    get_list = () => {
        let dadosIn = {};

        if (this.props.loginData.id_tipo_utilizador === 4) {
            dadosIn = { opcao: 'list_all', dados: null };
        } else {
            dadosIn = { opcao: 'list_active_user', dados: { id_utilizador: this.props.loginData.id_utilizador } };
        }

        fetch_server('/utilizador', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
            } else {
                const lista_utilizador = dadosOut.dados.list;
                dadosIn = { opcao: 'list_active', dados: null };

                fetch_server('/tipo_utilizador', dadosIn, dadosOut => {
                    if (dadosOut.err) {
                        this.setState({ estado: 'erro', msgErro: dadosOut.err });
                    } else {
                        let tipoUtilizadorConsulta = {};

                        for (let it of dadosOut.dados.list) {
                            tipoUtilizadorConsulta[it.id_tipo_utilizador] = it.descricao_tipo_utilizador;
                        }

                        this.setState({
                            estado: 'carregado',
                            listaUtilizador: lista_utilizador,
                            listaTipoUtilizador: dadosOut.dados.list,
                            tipoUtilizadorConsulta
                        });
                    }
                });
            }
        });
    };

    add_item = () => {
        const dadosIn = { opcao: 'last_id', dados: null };
        let date = new Date();

        fetch_server('/utilizador', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else
                this.setState({
                    formularioAberto: true,
                    estado: 'carregado',
                    itemEditar: {
                        id_utilizador: dadosOut.dados.max_id + 1,
                        dh_inclusao_utilizador: date,
                        dh_alteracao_utilizador: date,
                        st_utilizador: 'A'
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

        fetch_server('/utilizador', dadosIn, dadosOut => {
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
        if (!window.confirm('Eliminar Utilizador?')) return;

        const dadosIn = { opcao: 'delete', dados: { id_utilizador: id } };

        fetch_server('/utilizador', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                this.handleClose();
            } else {
                this.get_list();
                this.handleClose();
            }
        });
    };

    validate_Button = () => {
        console.log('id_tipo_utilizador:', this.props.loginData.id_tipo_utilizador);
        return this.props.loginData.id_tipo_utilizador !== 4;
    };

    handleClose = () => this.setState({ formularioAberto: false, itemEditar: null });

    render() {
        const { classes } = this.props;
        const {
            estado,
            listaUtilizador,
            listaTipoUtilizador,
            msgErro,
            formularioAberto,
            itemEditar,
            tipoUtilizadorConsulta,
            opcao
        } = this.state;

        return (
            <div className={classes.root}>
                <Paper>
                    {estado === 'carregando' ? (
                        <h3> Carregando... </h3>
                    ) : estado === 'erro' ? (
                        <h3> Erro: {msgErro.message} </h3>
                    ) : (
                        <div className={classes.body}>
                            <h2>Utilizadores</h2>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <IconButton onClick={this.add_item} disabled={this.validate_Button()}>
                                                <AddIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell>Necessidades especiais</TableCell>
                                        <TableCell>Saldo</TableCell>
                                        <TableCell>Contacto</TableCell>
                                        <TableCell>Situação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listaUtilizador.map((item, index) => (
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
                                                        this.delete_item(item.id_utilizador);
                                                    }}
                                                    disabled={this.validate_Button()}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{item.id_utilizador}</TableCell>
                                            <TableCell>{item.nome_utilizador}</TableCell>
                                            <TableCell>{item.email_utilizador}</TableCell>
                                            <TableCell>{tipoUtilizadorConsulta[item.id_tipo_utilizador]}</TableCell>
                                            <TableCell>{item.necessidades_especiais}</TableCell>
                                            <TableCell>{item.saldo_utilizador}</TableCell>
                                            <TableCell>{item.contacto_utilizador}</TableCell>
                                            <TableCell>{item.st_utilizador}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </Paper>

                <Modal open={formularioAberto} onClose={this.handleClose}>
                    <UtilizadorForm
                        function_save={this.save_item}
                        function_cancel={this.handleClose}
                        loginData={this.props.loginData}
                        item_editar={itemEditar}
                        lista_tipo_utilizador={listaTipoUtilizador}
                        option={opcao}
                    />
                </Modal>
            </div>
        );
    }
}

UtilizadorList.propTypes = {
    classes: PropTypes.object.isRequired,
    loginData: PropTypes.object
};

export default withStyles(styles)(UtilizadorList);
