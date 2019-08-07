import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

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

class AnomaliasList extends React.Component {
    state = {
        lista: [],
        estado: 'carregando',
        msgErro: null,
        opcao: 'list'
    };

    componentDidMount = props => this.get_list();

    get_list = () => {
        const dadosIn = { opcao: 'list', dados: null };

        fetch_server('/anomalia', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else this.setState({ estado: 'carregado', lista: dadosOut.dados.list });
        });
    };

    render() {
        const { classes } = this.props;
        const { estado, lista, msgErro } = this.state;

        return (
            <div>
                <Paper className={classes.root}>
                    {estado === 'carregando' ? (
                        <h3> Carregando... </h3>
                    ) : estado === 'erro' ? (
                        <h3> Erro: {msgErro.message} </h3>
                    ) : (
                        <div className={classes.body}>
                            <h2>Anomalias</h2>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data/Hora abertura</TableCell>
                                        <TableCell>Data/Hora fechamento</TableCell>
                                        <TableCell>Criticidade</TableCell>
                                        <TableCell>Descrição</TableCell>
                                        <TableCell>Estado</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lista.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.dh_abertura_anomalia}</TableCell>
                                            <TableCell>{item.dh_fechamento_anomalia}</TableCell>
                                            <TableCell>{item.criticidade_anomalia}</TableCell>
                                            <TableCell>{item.descricao_anomalia}</TableCell>
                                            <TableCell>{item.estado_anomalia}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </Paper>
            </div>
        );
    }
}

AnomaliasList.propTypes = {
    classes: PropTypes.object.isRequired,
    loginData: PropTypes.object
};

export default withStyles(styles)(AnomaliasList);
