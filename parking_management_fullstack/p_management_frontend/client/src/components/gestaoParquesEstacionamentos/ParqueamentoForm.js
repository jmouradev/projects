import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    root: {
        color: 'black',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        width: '90%',
        marginTop: theme.spacing.unit * 3
    },

    paper: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: '70%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        overflow: 'scroll',
        height: '90%'
    },

    customContentStyle: {
        width: '80%',
        maxWidth: '90%'
    },

    column: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },

    row: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },

    buttons: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '10px'
    },

    textField: {
        width: '100%',
        margin: '5px'
    },

    selectForm: {
        width: '50%'
    }
});

class ParqueamentoForm extends React.Component {
    state = {};

    handleChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    save_item = () => this.props.function_save(this.state);

    componentDidMount = () => {
        const { item_editar } = this.props;
        if (item_editar) {
            this.setState({
                dh_inicio_parqueamento: item_editar.dh_inicio_parqueamento,
                dh_final_parqueamento: item_editar.dh_final_parqueamento,
                id_zona: item_editar.id_zona,
                id_vaga: item_editar.id_vaga,
                id_utilizador: item_editar.id_utilizador,
                id_veiculo: item_editar.id_veiculo,
                valor_pagar: item_editar.valor_pagar
            });
        }
    };

    render() {
        const { classes, function_cancel, option } = this.props;
        let bloqueado = true;

        if (option === 'insert') {
            bloqueado = false;
        }

        console.log('Option:', option, 'bloqueado:', bloqueado);

        let buildField = (label, field, isPassword, isDisabled) => (
            <TextField
                className={classes.textField}
                label={label}
                value={this.state[field] != null ? this.state[field] : ''}
                type={isPassword ? 'password' : 'text'}
                disabled={isDisabled}
                name={field}
                onChange={this.handleChange}
            />
        );

        let buildButton = (text, onClickFunction) => (
            <Button variant='raised' color='default' onClick={onClickFunction}>
                {text}
            </Button>
        );

        return (
            <div className={classes.paper}>
                <div className={classes.root}>
                    <div className={classes.column}>
                        <h2>Parqueamento</h2>
                        <div className={classes.row}>
                            {buildField('Data/Hora Inicio', 'dh_inicio_parqueamento', false, true)}
                        </div>
                        <div className={classes.row}>
                            {buildField('Data/Hora final', 'dh_final_parqueamento', false, true)}
                        </div>
                        <div className={classes.row}>{buildField('Id Zona', 'id_zona', false, bloqueado)}</div>
                        <div className={classes.row}>{buildField('Id Vaga', 'id_vaga', false, bloqueado)}</div>
                        <div className={classes.row}>{buildField('Id Utilizador', 'id_utilizador', false, true)}</div>
                        <div className={classes.row}>{buildField('Id Veículo', 'id_veiculo', false, bloqueado)}</div>
                        <div className={classes.row}>
                            {buildField('Valor a pagar', 'valor_pagar', false, bloqueado)}
                        </div>
                        <div className={classes.buttons}>
                            {buildButton('Executar', this.save_item)}
                            {buildButton('Voltar', function_cancel)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ParqueamentoForm.propTypes = {
    classes: PropTypes.object.isRequired,
    function_save: PropTypes.object.isRequired,
    function_cancel: PropTypes.func.isRequired,
    item_editar: PropTypes.object,
    option: PropTypes.object
};

export default withStyles(styles)(ParqueamentoForm);
