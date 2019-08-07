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

import ParqueamentoUserForm from './ParqueamentoUserForm';

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

class ParqueamentoUserList extends React.Component {
    state = {
        lista: [],
        estado: 'carregando',
        msgErro: null,
        formularioAberto: false,
        itemEditar: null,
        opcao: 'list'
    };

    componentDidMount = props => this.getList();

    getList = () => {
        const dadosIn = { opcao: 'list_active_user', dados: { id_utilizador: this.props.loginData.id_utilizador } };

        fetch_server('/parqueamento', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else this.setState({ estado: 'carregado', lista: dadosOut.dados.list });
        });
    };

    add_item = () => {
        console.log('add');
        const dadosIn = { opcao: 'last_id', dados: null };

        fetch_server('/parqueamento', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else
                this.setState({
                    formularioAberto: true,
                    estado: 'carregado',
                    itemEditar: { id_parqueamento: dadosOut.dados.max_id + 1, st_parqueamento: 'A' },
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

        fetch_server('/parqueamento', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                this.handleClose();
            } else {
                this.getList();
                this.handleClose();
            }
        });
    };

    delete_item = id => {
        if (!window.confirm('Eliminar Parqueamento?')) return;
        console.log('delete', id);

        const dadosIn = { opcao: 'delete', dados: { id_parqueamento: id } };

        fetch_server('/parqueamento', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                this.handleClose();
            } else {
                this.getList();
                this.handleClose();
            }
        });
    };

    handleClose = () => this.setState({ formularioAberto: false, itemEditar: null });

    render() {
        const { classes } = this.props;
        const { estado, lista, msgErro, formularioAberto, itemEditar, opcao } = this.state;

        return (
            <div>
                <Paper className={classes.root}>
                    {estado === 'carregando' ? (
                        <h3> Carregando... </h3>
                    ) : estado === 'erro' ? (
                        <h3> Erro: {msgErro.message} </h3>
                    ) : (
                        <div className={classes.body}>
                            <h2>Parqueamentos</h2>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <IconButton onClick={this.add_item}>
                                                <AddIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>Data/Hora inicio</TableCell>
                                        <TableCell>Data/Hora fim</TableCell>
                                        <TableCell>Id Zona</TableCell>
                                        <TableCell>Id Vaga</TableCell>
                                        <TableCell>Id Utilizador</TableCell>
                                        <TableCell>Id Veículo</TableCell>
                                        <TableCell>Valor a pagar</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lista.map((item, index) => (
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
                                                        this.delete_item(item.id_parqueamento);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{item.dh_inicio_parqueamento}</TableCell>
                                            <TableCell>{item.dh_final_parqueamento}</TableCell>
                                            <TableCell>{item.id_zona}</TableCell>
                                            <TableCell>{item.id_vaga}</TableCell>
                                            <TableCell>{item.id_utilizador}</TableCell>
                                            <TableCell>{item.id_veiculo}</TableCell>
                                            <TableCell>{item.valor_pagar}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </Paper>

                <Modal open={formularioAberto} onClose={this.handleClose}>
                    <ParqueamentoUserForm
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

ParqueamentoUserList.propTypes = {
    classes: PropTypes.object.isRequired,
    loginData: PropTypes.object
};

export default withStyles(styles)(ParqueamentoUserList);
