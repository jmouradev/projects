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

import VeiculoForm from './VeiculoForm';

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

class VeiculoList extends React.Component {
    state = {
        listaVeiculo: [],
        listaTipoVeiculo: [],
        listaMarcaVeiculo: [],
        listaModeloVeiculo: [],
        listaCorVeiculo: [],
        estado: 'carregando',
        msgErro: null,
        formularioAberto: false,
        itemEditar: null,
        opcao: 'list'
    };

    componentDidMount = props => this.get_list();

    get_list = () => {
        const opt = this.props.loginData.id_tipo_utilizador === 4 ? 'list_all' : 'list_active_user';
        let dadosIn = { opcao: opt, dados: null, id_utilizador: this.props.loginData.id_utilizador };

        fetch_server('/veiculo', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
            } else {
                const lista_veiculo = dadosOut.dados.list;
                dadosIn = { opcao: 'list_active', dados: null };

                fetch_server('/tipo_veiculo', dadosIn, dadosOut => {
                    if (dadosOut.err) {
                        this.setState({ estado: 'erro', msgErro: dadosOut.err });
                    } else {
                        let tipoVeiculoConsulta = {};

                        for (let it of dadosOut.dados.list) {
                            tipoVeiculoConsulta[it.id_tipo_veiculo] = it.descricao_tipo_veiculo;
                        }

                        const lista_tipo_veiculo = dadosOut.dados.list;
                        dadosIn = { opcao: 'list_active', dados: null };

                        fetch_server('/marca_veiculo', dadosIn, dadosOut => {
                            if (dadosOut.err) {
                                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                            } else {
                                let marcaVeiculoConsulta = {};

                                for (let it of dadosOut.dados.list) {
                                    marcaVeiculoConsulta[it.id_marca_veiculo] = it.descricao_marca_veiculo;
                                }

                                const lista_marca_veiculo = dadosOut.dados.list;
                                dadosIn = { opcao: 'list_active', dados: null };

                                fetch_server('/modelo_veiculo', dadosIn, dadosOut => {
                                    if (dadosOut.err) {
                                        this.setState({ estado: 'erro', msgErro: dadosOut.err });
                                    } else {
                                        let modeloVeiculoConsulta = {};

                                        for (let it of dadosOut.dados.list) {
                                            modeloVeiculoConsulta[it.id_modelo_veiculo] = it.descricao_modelo_veiculo;
                                        }

                                        const lista_modelo_veiculo = dadosOut.dados.list;
                                        dadosIn = { opcao: 'list_active', dados: null };

                                        fetch_server('/cor_veiculo', dadosIn, dadosOut => {
                                            if (dadosOut.err) {
                                                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                                            } else {
                                                let corVeiculoConsulta = {};

                                                for (let it of dadosOut.dados.list) {
                                                    corVeiculoConsulta[it.id_cor_veiculo] = it.descricao_cor_veiculo;
                                                }

                                                this.setState({
                                                    estado: 'carregado',
                                                    listaVeiculo: lista_veiculo,
                                                    listaTipoVeiculo: lista_tipo_veiculo,
                                                    listaMarcaVeiculo: lista_marca_veiculo,
                                                    listaModeloVeiculo: lista_modelo_veiculo,
                                                    listaCorVeiculo: dadosOut.dados.list,
                                                    tipoVeiculoConsulta,
                                                    marcaVeiculoConsulta,
                                                    modeloVeiculoConsulta,
                                                    corVeiculoConsulta
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    add_item = () => {
        const dadosIn = { opcao: 'last_id', dados: null };
        let date = new Date();

        fetch_server('/veiculo', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else
                this.setState({
                    formularioAberto: true,
                    estado: 'carregado',
                    itemEditar: {
                        id_veiculo: dadosOut.dados.max_id + 1,
                        dh_inclusao_veiculo: date,
                        dh_alteracao_veiculo: date,
                        st_veiculo: 'A'
                    },
                    opcao: 'insert'
                });
        });
    };

    edit_item = item => {
        this.setState({ formularioAberto: true, itemEditar: item, opcao: 'update' });
    };

    save_item = item => {
        const dadosIn = { opcao: this.state.opcao, dados: item, id_utilizador: this.props.loginData.id_utilizador };

        fetch_server('/veiculo', dadosIn, dadosOut => {
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
        if (!window.confirm('Eliminar Veículo?')) return;

        const dadosIn = {
            opcao: 'delete',
            dados: { id_veiculo: id },
            id_utilizador: this.props.loginData.id_utilizador
        };

        fetch_server('/veiculo', dadosIn, dadosOut => {
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
            listaVeiculo,
            listaTipoVeiculo,
            listaMarcaVeiculo,
            listaModeloVeiculo,
            listaCorVeiculo,
            msgErro,
            formularioAberto,
            itemEditar,
            tipoVeiculoConsulta,
            marcaVeiculoConsulta,
            modeloVeiculoConsulta,
            corVeiculoConsulta,
            opcao
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
                            <h2>Veículos</h2>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <IconButton onClick={this.add_item}>
                                                <AddIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Matricula</TableCell>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell>Marca</TableCell>
                                        <TableCell>Modelo</TableCell>
                                        <TableCell>Cor</TableCell>
                                        <TableCell>Data/Hora inclusão</TableCell>
                                        <TableCell>Data/Hora alteração</TableCell>
                                        <TableCell>Situação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listaVeiculo.map((item, index) => (
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
                                                        this.delete_item(item.id_veiculo);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{item.id_veiculo}</TableCell>
                                            <TableCell>{item.matricula_veiculo}</TableCell>
                                            <TableCell>{tipoVeiculoConsulta[item.id_tipo_veiculo]}</TableCell>
                                            <TableCell>{marcaVeiculoConsulta[item.id_marca_veiculo]}</TableCell>
                                            <TableCell>{modeloVeiculoConsulta[item.id_modelo_veiculo]}</TableCell>
                                            <TableCell>{corVeiculoConsulta[item.id_cor_veiculo]}</TableCell>
                                            <TableCell>{item.dh_inclusao_veiculo}</TableCell>
                                            <TableCell>{item.dh_alteracao_veiculo}</TableCell>
                                            <TableCell>{item.st_veiculo}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </Paper>

                <Modal open={formularioAberto} onClose={this.handleClose}>
                    <VeiculoForm
                        function_save={this.save_item}
                        function_cancel={this.handleClose}
                        item_editar={itemEditar}
                        lista_tipo_veiculo={listaTipoVeiculo}
                        lista_marca_veiculo={listaMarcaVeiculo}
                        lista_modelo_veiculo={listaModeloVeiculo}
                        lista_cor_veiculo={listaCorVeiculo}
                        option={opcao}
                    />
                </Modal>
            </div>
        );
    }
}

VeiculoList.propTypes = {
    classes: PropTypes.object.isRequired,
    loginData: PropTypes.object
};

export default withStyles(styles)(VeiculoList);
