import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import Calendar from 'react-calendar';

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

class UtilizacaoEstacionametoList extends React.Component {
    state = {
        selectedDate: new Date(),
        lista: [],
        estado: 'carregado',
        msgErro: null,
        selecionarData: true
    };

    componentDidMount = props => {
        this.setState({ msgErro: null });
    };

    get_list = date => {
        const dh = date.toLocaleString('en-GB');
        const dia = dh.substring(0, 2);
        const mes = dh.substring(3, 5);
        const ano = dh.substring(6, 10);
        const formatedDate = ano + '-' + mes + '-' + dia;
        const dadosIn = { opcao: 'list_specific_date', dados: { dh_inicio_parqueamento: formatedDate } };

        fetch_server('/parqueamento', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else this.setState({ estado: 'carregado', lista: dadosOut.dados.list });
        });
    };

    onChange = date => {
        this.setState({ selectedDate: date, selecionarData: false, estado: 'carregando' });
        this.get_list(date);
    };

    render() {
        const { classes } = this.props;
        const { msgErro, estado, lista, selecionarData } = this.state;

        return (
            <div>
                <Paper className={classes.root}>
                    {estado === 'carregando' ? (
                        <h3> Carregando... </h3>
                    ) : estado === 'erro' ? (
                        <h3> Erro: {msgErro.message} </h3>
                    ) : (
                        <div className={classes.body}>
                            <h2>Utilização de estaconamento</h2>
                            {selecionarData ? (
                                <div className={classes.table}>
                                    <Calendar onChange={this.onChange} value={this.state.selectedDate} />
                                    <br />
                                    <br />
                                </div>
                            ) : (
                                <div>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
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
                        </div>
                    )}
                </Paper>
            </div>
        );
    }
}

UtilizacaoEstacionametoList.propTypes = {
    classes: PropTypes.object.isRequired,
    loginData: PropTypes.object
};

export default withStyles(styles)(UtilizacaoEstacionametoList);
