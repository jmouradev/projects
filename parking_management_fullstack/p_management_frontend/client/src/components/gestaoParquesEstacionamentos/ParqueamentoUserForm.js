import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from 'material-ui/Paper';
import Modal from '@material-ui/core/Modal';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import NumberFormat from 'react-number-format';

import ParqueamentoUserPoints from './ParqueamentoUserPoints';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

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

    textField: {
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center'
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
        alignContent: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },

    selectForm: {
        width: '50%'
    },

    formControl: {
        margin: theme.spacing.unit
    }
});

class ParqueamentoUserForm extends React.Component {
    state = {
        dh_inicio_parqueamento_base: '',
        dh_inicio_parqueamento: '',
        dh_final_parqueamento: '',
        dh_current: new Date().toLocaleString('en-GB'),
        id_zona: 0,
        descricao_zona: '',
        id_vaga: 0,
        id_veiculo: 0,
        matricula_veiculo: '',
        valor_pagar: 0,
        listaZonas: [],
        listaVeiculos: [],
        listaVagas: [],
        id_utilizador: 0,
        itemEditar: null,
        estado: 'carregando',
        pointsAberto: false,
        msgErro: null,
        opcao: ''
    };

    componentDidMount = props => this.get_list();

    get_list = () => {
        const dadosIn = { opcao: 'active_parking', dados: { id_utilizador: this.props.loginData.id_utilizador } };
        //lista.filter( x => x.id == 3 )[0].desc

        fetch_server('/parqueamento', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
            } else {
                console.log('dadosOut:', dadosOut, 'list len:', dadosOut.dados.list.length);

                if (dadosOut.dados.list.length > 0) {
                    const dh = dadosOut.dados.list[0].dh_inicio_parqueamento.toLocaleString('en-GB');
                    const ano = dh.substring(0, 4);
                    const mes = dh.substring(5, 7);
                    const dia = dh.substring(8, 10);
                    const hor = dh.substring(11, 13);
                    const min = dh.substring(14, 16);
                    const seg = dh.substring(17, 19);

                    this.setState({
                        estado: 'carregado',
                        dh_inicio_parqueamento_base: ano + '-' + mes + '-' + dia + ' ' + hor + ':' + min + ':' + seg,
                        dh_inicio_parqueamento: dia + '/' + mes + '/' + ano + ', ' + hor + ':' + min + ':' + seg,
                        dh_final_parqueamento: dadosOut.dados.list[0].dh_final_parqueamento,
                        id_zona: dadosOut.dados.list[0].id_zona,
                        descricao_zona: dadosOut.dados.list[0].descricao_zona,
                        id_vaga: dadosOut.dados.list[0].id_vaga,
                        id_utilizador: dadosOut.dados.list[0].id_utilizador,
                        id_veiculo: dadosOut.dados.list[0].id_veiculo,
                        matricula_veiculo: dadosOut.dados.list[0].matricula_veiculo,
                        valor_pagar: dadosOut.dados.list[0].valor_pagar
                    });
                } else {
                    const dadosIn = { opcao: 'list_active', dados: null };

                    fetch_server('/zona', dadosIn, dadosOut => {
                        if (dadosOut.err) {
                            this.setState({ estado: 'erro', msgErro: dadosOut.err });
                        } else {
                            const lista_zonas = dadosOut.dados.list;

                            const dadosIn = {
                                opcao: 'list_active_user',
                                dados: null,
                                id_utilizador: this.props.loginData.id_utilizador
                            };

                            fetch_server('/veiculo', dadosIn, dadosOut => {
                                if (dadosOut.err) {
                                    this.setState({ estado: 'erro', msgErro: dadosOut.err });
                                } else {
                                    this.setState({
                                        estado: 'carregado',
                                        id_utilizador: this.props.loginData.id_utilizador,
                                        listaZonas: lista_zonas,
                                        listaVeiculos: dadosOut.dados.list,
                                        dh_current: new Date().toLocaleString()
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    };

    save_item = item => {
        console.log('saving item', item);
        let opcao = 'insert';

        if (this.state.dh_inicio_parqueamento !== '') {
            opcao = 'finalize';
        }

        const dadosIn = {
            opcao: opcao,
            dados: {
                dh_inicio_parqueamento: this.state.dh_inicio_parqueamento_base,
                dh_final_parqueamento: this.state.dh_final_parqueamento,
                id_zona: this.state.id_zona,
                id_vaga: this.state.id_vaga,
                id_utilizador: this.state.id_utilizador,
                id_veiculo: this.state.id_veiculo,
                valor_pagar: this.state.valor_pagar
            }
        };

        fetch_server('/parqueamento', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
                this.handleClose();
            } else {
                this.get_list();
                this.handleClose();
            }

            if (opcao === 'finalize') {
                this.setState({ dh_inicio_parqueamento: '', id_zona: 0, id_veiculo: 0, id_vaga: 0 });
            }
        });
    };

    select_slot = () => {
        const dadosIn = { opcao: 'select', dados: { id_zona: this.state.id_zona } };

        fetch_server('/zona', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
            } else {
                const item_editar = dadosOut.dados;
                const dadosIn = { opcao: 'list_active', dados: { id_zona: this.state.id_zona } };

                fetch_server('/vaga', dadosIn, dadosOut => {
                    if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
                    else
                        this.setState({
                            estado: 'carregado',
                            listaVagas: dadosOut.dados.list,
                            itemEditar: item_editar,
                            pointsAberto: true,
                            opcao: 'see_park'
                        });
                });
            }
        });
    };

    selected_slot = vagaSelecionada => this.setState({ id_vaga: vagaSelecionada, pointsAberto: false });

    validateSelectVagaButton = event => {
        return this.state.id_zona !== 0 && this.state.id_veiculo !== 0;
    };

    validateExecutarButton = event => {
        return this.state.id_zona !== 0 && this.props.loginData.id_utilizador !== 0 && this.state.id_vaga !== 0;
    };

    handleChangeZona = ev =>
        this.setState({ id_zona: ev.target.value.id_zona, descricao_zona: ev.target.value.descricao_zona });

    handleChangeVeiculo = ev =>
        this.setState({ id_veiculo: ev.target.value.id_veiculo, matricula_veiculo: ev.target.value.matricula_veiculo });

    handleChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    handleClose = () => this.setState({ pointsAberto: false, itemEditar: null });

    render() {
        const { classes } = this.props;
        const {
            dh_inicio_parqueamento,
            id_zona,
            id_veiculo,
            id_vaga,
            estado,
            valor_pagar,
            listaZonas,
            listaVeiculos,
            listaVagas,
            msgErro,
            pointsAberto,
            itemEditar,
            opcao
        } = this.state;

        const descricaoBotao = dh_inicio_parqueamento === '' ? 'Iniciar' : 'Encerrar';

        function NumberFormatCustom(props) {
            const { inputRef, onChange, ...other } = props;

            return (
                <NumberFormat
                    {...other}
                    ref={inputRef}
                    onValueChange={values => {
                        onChange({
                            target: {
                                value: values.value
                            }
                        });
                    }}
                    thousandSeparator='.'
                    decimalSeparator=','
                    prefix='€'
                />
            );
        }

        NumberFormatCustom.propTypes = {
            inputRef: PropTypes.func.isRequired,
            onChange: PropTypes.func.isRequired
        };

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

        let buildButton = (text, onClickFunction, isDisabled) => (
            <Button variant='raised' color='default' disabled={!isDisabled} onClick={onClickFunction}>
                {text}
            </Button>
        );

        return (
            <div>
                <Paper className={classes.root}>
                    {estado === 'carregando' ? (
                        <h3> Carregando... </h3>
                    ) : estado === 'erro' ? (
                        <h3> Erro: {msgErro.message} </h3>
                    ) : (
                        <div className={classes.body}>
                            <h2>Parqueamento</h2>
                            <div>
                                {id_zona === 0 ? (
                                    <FormControl className={classes.selectForm}>
                                        <InputLabel>Zona</InputLabel>
                                        <Select
                                            value={this.state.id_zona != null ? this.state.id_zona : ''}
                                            onChange={this.handleChangeZona}
                                            input={<Input name='id_zona' />}
                                        >
                                            {listaZonas &&
                                                listaZonas.map((item, index) => (
                                                    <MenuItem key={index} value={item}>
                                                        {item.id_zona} - {item.descricao_zona}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <div className={classes.row}>
                                        {buildField('Zona selecionada', 'descricao_zona', false, true)}
                                    </div>
                                )}
                                <br />
                                <br />
                            </div>
                            <div>
                                {id_veiculo === 0 ? (
                                    <FormControl className={classes.selectForm}>
                                        <InputLabel>Veiculos</InputLabel>
                                        <Select
                                            value={this.state.id_veiculo != null ? this.state.id_veiculo : ''}
                                            onChange={this.handleChangeVeiculo}
                                            input={<Input name='id_veiculo' />}
                                        >
                                            {listaVeiculos &&
                                                listaVeiculos.map((item, index) => (
                                                    <MenuItem key={index} value={item}>
                                                        {item.matricula_veiculo}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <div className={classes.row}>
                                        {buildField('Veiculo selecionado', 'matricula_veiculo', false, true)}
                                    </div>
                                )}
                            </div>
                            <br />
                            <br />
                            {id_vaga === 0 ? (
                                <div className={classes.buttons}>
                                    {buildButton('Selecionar vaga', this.select_slot, this.validateSelectVagaButton())}
                                </div>
                            ) : (
                                <div className={classes.row}>
                                    {buildField('Vaga selecionada', 'id_vaga', false, true)}
                                </div>
                            )}
                            {dh_inicio_parqueamento === '' ? (
                                <div>
                                    <br />
                                    <br />
                                </div>
                            ) : (
                                <div>
                                    <br />
                                    <br />
                                    <div className={classes.row}>
                                        {buildField(
                                            'Data/Hora de inicio do parqueamento',
                                            'dh_inicio_parqueamento',
                                            false,
                                            true
                                        )}
                                    </div>
                                    <br />
                                    <br />
                                    <div className={classes.row}>
                                        {buildField('Data/Hora de fim do parqueamento', 'dh_current', false, true)}
                                    </div>
                                    <br />
                                    <br />
                                    <div className={classes.row}>
                                        <TextField
                                            className={classes.formControl}
                                            label='Valor a pagar'
                                            value={valor_pagar}
                                            onChange={this.handleChange}
                                            id='valor_pagar'
                                            name='valor_pagar'
                                            disabled
                                            InputProps={{ inputComponent: NumberFormatCustom }}
                                        />
                                    </div>
                                    <br />
                                    <br />
                                </div>
                            )}
                            <div className={classes.buttons}>
                                {buildButton(descricaoBotao, this.save_item, this.validateExecutarButton())}
                            </div>
                        </div>
                    )}
                </Paper>

                <Modal open={pointsAberto} onClose={this.handleClose}>
                    <ParqueamentoUserPoints
                        function_selected_slot={this.selected_slot}
                        function_cancel={this.handleClose}
                        item_editar={itemEditar}
                        lista_vagas={listaVagas}
                        option={opcao}
                    />
                </Modal>
            </div>
        );
    }
}

ParqueamentoUserForm.propTypes = {
    classes: PropTypes.object.isRequired,
    loginData: PropTypes.object
};

export default withStyles(styles)(ParqueamentoUserForm);
