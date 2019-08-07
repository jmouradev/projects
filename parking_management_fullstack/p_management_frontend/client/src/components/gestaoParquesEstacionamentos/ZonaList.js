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
import LocalParkingIcon from '@material-ui/icons/LocalParking';

import ZonaForm from './ZonaForm';
import ZonaPoints from './ZonaPoints';
import ZonaDrawPark from './ZonaDrawPark';

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

class ZonaList extends React.Component {
    state = {
        listaZonas: [],
        listaVagas: [],
        estado: 'carregando',
        msgErro: null,
        formularioAberto: false,
        pointsAberto: false,
        drawAberto: false,
        itemEditar: null,
        opcao: 'list'
    };

    componentDidMount = props => this.get_list();

    get_list = () => {
        const dadosIn = { opcao: 'list_all', dados: null };

        fetch_server('/zona', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else this.setState({ estado: 'carregado', listaZonas: dadosOut.dados.list });
        });
    };

    add_item = () => {
        const dadosIn = { opcao: 'last_id', dados: null };
        let date = new Date();

        fetch_server('/zona', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else
                this.setState({
                    formularioAberto: true,
                    estado: 'carregado',
                    itemEditar: {
                        id_zona: dadosOut.dados.max_id + 1,
                        config_1_zona: '{}',
                        dh_inclusao_zona: date,
                        dh_alteracao_zona: date,
                        st_zona: 'A'
                    },
                    opcao: 'insert'
                });
        });
    };

    edit_item = item => {
        this.setState({ formularioAberto: true, itemEditar: item, opcao: 'update' });
    };

    save_item = item => {
        console.log('item:', item);
        const dadosIn = { opcao: this.state.opcao, dados: item };

        fetch_server('/zona', dadosIn, dadosOut => {
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
        if (!window.confirm('Eliminar Zona?')) return;

        const dadosIn = { opcao: 'delete', dados: { id_zona: id } };

        fetch_server('/zona', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                this.handleClose();
            } else {
                this.get_list();
                this.handleClose();
            }
        });
    };

    see_park = item => {
        const dadosIn = { opcao: 'list_active', dados: { id_zona: item.id_zona } };

        fetch_server('/vaga', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else
                this.setState({
                    estado: 'carregado',
                    listaVagas: dadosOut.dados.list,
                    itemEditar: item,
                    pointsAberto: true,
                    opcao: 'see_park'
                });
        });
    };

    validate_pointsButton = item => {
        return (
            item.path_imagem_zona.replace(/\s/g, '').length === 0 &&
            item.largura_imagem_zona === 0 &&
            item.altura_imagem_zona === 0
        );
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

    draw_park = item => {
        console.log('marcar', item);
        this.setState({
            itemEditar: item,
            drawAberto: true,
            estado: 'carregado'
        });
    };

    handleClose = () =>
        this.setState({ formularioAberto: false, pointsAberto: false, drawAberto: false, itemEditar: null });

    render() {
        const { classes } = this.props;
        const {
            estado,
            listaZonas,
            msgErro,
            formularioAberto,
            pointsAberto,
            drawAberto,
            itemEditar,
            listaVagas,
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
                            <h2>Zonas</h2>
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
                                        <TableCell>Longitude</TableCell>
                                        <TableCell>Latitude</TableCell>
                                        <TableCell>Data/Hora alteração</TableCell>
                                        <TableCell>Situação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listaZonas.map((item, index) => (
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
                                                        this.delete_item(item.id_zona);
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
                                                <IconButton
                                                    onClick={() => {
                                                        this.see_park(item);
                                                    }}
                                                    disabled={this.validate_pointsButton(item)}
                                                >
                                                    <LocalParkingIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{item.id_zona}</TableCell>
                                            <TableCell>{item.descricao_zona}</TableCell>
                                            <TableCell>{item.longitude_zona}</TableCell>
                                            <TableCell>{item.latitude_zona}</TableCell>
                                            <TableCell>{item.dh_alteracao_zona}</TableCell>
                                            <TableCell>{item.st_zona}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </Paper>

                <Modal open={formularioAberto} onClose={this.handleClose}>
                    <ZonaForm
                        function_save={this.save_item}
                        function_cancel={this.handleClose}
                        item_editar={itemEditar}
                        option={opcao}
                    />
                </Modal>

                <Modal open={pointsAberto} onClose={this.handleClose}>
                    <ZonaPoints
                        function_save={this.save_item}
                        function_cancel={this.handleClose}
                        item_editar={itemEditar}
                        lista_vagas={listaVagas}
                        option={opcao}
                    />
                </Modal>

                <Modal open={drawAberto} onClose={this.handleClose}>
                    <ZonaDrawPark
                        function_save={this.save_item}
                        function_cancel={this.handleClose}
                        item_editar={itemEditar}
                    />
                </Modal>
            </div>
        );
    }
}

//<IconButton onClick={()=>{this.draw_park(item)}}><FullscreenIcon/></IconButton>

ZonaList.propTypes = {
    classes: PropTypes.object.isRequired,
    loginData: PropTypes.object
};

export default withStyles(styles)(ZonaList);
