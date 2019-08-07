import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import fetch_server from '../../server_interface';

import '../../css/Canvas.css';

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
        width: '90%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        overflow: 'scroll',
        height: '90%'
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
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },

    buttons: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '10px'
    },

    textField: {
        width: '250px',
        margin: '5px'
    },

    selectForm: {
        width: '50%'
    }
});

class ZonaDrawPark extends Component {
    state = {
        divisionFactor: 1,
        filas: 0,
        quantidade_fila: 0,
        orientacao: 'H',
        angulo: '0',
        lado: 'E',
        msgErro: '',
        altura: 768,
        largura: 768,
        image: '',
        window_width: window.innerWidth,
        window_height: window.innerHeight,
        vagas: {},
        itemEditar: []
    };

    componentDidMount = () => {
        const { item_editar } = this.props;
        let update_width = window.innerWidth;
        let update_height = window.innerHeight;
        console.log('update_height:', update_height, 'update_width:', update_width);

        if (item_editar) {
            this.setState({ itemEditar: item_editar });
        }

        this.handleGenerate();
    };

    handleGenerate = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');

        let q_filas = 1;
        const filas = parseInt(this.state.filas, 0);
        console.log('filas:', filas);

        let j = -1;

        for (let i = 0; i < filas; i++) {
            q_filas++;
            j++;

            if (j === 2) {
                q_filas++;
                j = 0;
            }
        }

        if (filas % 2 === 0) {
            if (this.state.lado === 'D' || this.state.lado === 'B') {
                q_filas++;
            }
        }

        console.log('q_filas:', q_filas);

        const exp_lin = 5;

        let x1 = 0;
        let y1 = 0;
        let x2 = 0;
        let y2 = 0;
        let x3 = 0;
        let y3 = 0;
        let x4 = 0;
        let y4 = 0;

        let altura = 576;
        let largura = 768;
        let larg_fila = Math.round(altura / q_filas);
        let larg_vaga = Math.round(largura / this.state.quantidade_fila);

        if (this.state.orientacao === 'V') {
            altura = 768;
            largura = 576;
            larg_fila = Math.round(largura / q_filas);
            larg_vaga = Math.round(altura / this.state.quantidade_fila);
        }

        console.log('q_filas:', q_filas);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = exp_lin;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        let salto = this.state.orientacao === 'V' ? (this.state.lado === 'E' ? 0 : 1) : this.state.lado === 'C' ? 0 : 1;
        let id = 1;
        let vagas = [];

        if (this.state.orientacao === 'V') {
            if (this.state.lado === 'D') {
                x1 = larg_fila;
            }
        } else {
            if (this.state.lado === 'B') {
                y1 = larg_fila;
            }
        }

        for (let i = 0; i < q_filas; i++) {
            for (let j = 0; j < this.state.quantidade_fila; j++) {
                if (this.state.orientacao === 'V') {
                    x2 = x1 + larg_fila;
                    y2 = y1;
                    x3 = x2;
                    y3 = y2 + larg_vaga;
                    x4 = x1;
                    y4 = y3;
                } else {
                    x2 = x1 + larg_vaga;
                    y2 = y1;
                    x3 = x2;
                    y3 = y2 + larg_fila;
                    x4 = x1;
                    y4 = y3;
                }

                let array = [[0, 0], [0, 0], [0, 0], [0, 0]];
                array[0][0] = Math.round(x1);
                array[0][1] = Math.round(y1);
                array[1][0] = Math.round(x2);
                array[1][1] = Math.round(y2);
                array[2][0] = Math.round(x3);
                array[2][1] = Math.round(y3);
                array[3][0] = Math.round(x4);
                array[3][1] = Math.round(y4);

                const novaVaga = { id: parseInt(id, 10), points: { array } };
                vagas[id] = novaVaga;

                ctx.beginPath();
                ctx.moveTo(parseFloat(x1), parseFloat(y1));
                ctx.lineTo(parseFloat(x2), parseFloat(y2));
                ctx.moveTo(parseFloat(x2), parseFloat(y2));
                ctx.lineTo(parseFloat(x3), parseFloat(y3));
                ctx.moveTo(parseFloat(x3), parseFloat(y3));
                ctx.lineTo(parseFloat(x4), parseFloat(y4));
                ctx.moveTo(parseFloat(x4), parseFloat(y4));
                ctx.lineTo(parseFloat(x1), parseFloat(y1));
                ctx.stroke();

                const arrayX = [parseFloat(x1), parseFloat(x2), parseFloat(x3), parseFloat(x4)];
                const arrayY = [parseFloat(y1), parseFloat(y2), parseFloat(y3), parseFloat(y4)];

                const maxX = Math.max(...arrayX);
                const minX = Math.min(...arrayX);
                const maxY = Math.max(...arrayY);
                const minY = Math.min(...arrayY);

                const xCenter = minX + (maxX - minX) / 2;
                const yCenter = minY + (maxY - minY) / 2;

                ctx.fillText(id, xCenter, yCenter);
                id++;

                if (this.state.orientacao === 'V') {
                    x1 = x4;
                    y1 = y4;
                } else {
                    x1 = x2;
                    y1 = y2;
                }
            }

            let larg_somar = larg_fila;

            if (i === salto) {
                larg_somar = larg_fila + larg_fila;
                salto = salto + 3;
                i++;
            }

            if (this.state.orientacao === 'V') {
                x1 = x1 + larg_somar;
                y1 = 0;
            } else {
                x1 = 0;
                y1 = y1 + larg_somar;
            }
        }

        this.setState({ largura: largura, altura: altura, vagas: vagas });
        console.log(vagas);
    };

    validateGenerete = event => {
        return this.state.quantidade_fila > 0 && this.state.filas > 0;
    };

    validateClear = event => {
        return this.state.quantidade_fila > 0 && this.state.filas > 0;
    };

    validateSave = event => {
        return this.state.quantidade_fila > 0 && this.state.filas > 0;
    };

    handleClear = event => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.setState({ msgErro: '' });
    };

    load_image = () => {
        const dadosIn = { opcao: 'load_image', dados: { filename: 'plantas_parques/planta_parque_z999.svg' } }; //
        fetch_server('/zona', dadosIn, dadosOut => {
            console.log('DadosOut(1):', dadosOut);
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else this.setState({ image: dadosOut.dados.image, isMontarRetangulos: true, opcao: 'see_park' });
        });
    };

    handleSaveNew = event => {
        const canvas = this.refs.canvas;
        const img = this.refs.image;
        //    const ctx = canvas.getContext("2d");
        let dataURL = canvas.toDataURL('imgs/png');
        //    console.log("dataURL:", dataURL)
        img.src = dataURL;
        console.log('Aqui 999');
        const dadosIn = {
            opcao: 'save_image',
            dados: { filename: 'plantas_parques/planta_parque_z999.svg', image: dataURL }
        }; //
        fetch_server('/zona', dadosIn, dadosOut => {
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err });
            else this.setState({ msgErro: '' });
        });
    };

    handleSave = event => {
        let idx = 0;
        let vagasSave = [];

        for (let i = 0; i < this.state.vagas.length; i++) {
            if (typeof this.state.vagas[i] !== 'undefined') {
                vagasSave[idx] = this.state.vagas[i];
                idx++;
            }
        }

        console.log('vagasSaveJJJ:', JSON.stringify(vagasSave));

        let temp = this.state.itemEditar;
        temp['config_1_zona'] = JSON.stringify(vagasSave);
        this.setState({ itemEditar: temp });
        this.props.function_save(this.state.itemEditar);
    };

    handleChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    render() {
        const { classes, function_cancel } = this.props;
        const { orientacao } = this.state;

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
            <div className={classes.paper}>
                <div className='App-canvas'>
                    <h3 className='App-canvas-title'>Zona : {this.state.itemEditar.id_zona} </h3>
                    <div>
                        <canvas ref='canvas' width={this.state.largura} height={this.state.altura} />
                        <img ref='image' src='' className='hidden' alt='' />
                    </div>
                    <div className={classes.root}>
                        <div className={classes.column}>
                            <h2>Vagas</h2>
                            <div className={classes.row}>{buildField('Número de filas', 'filas')}</div>
                            <div className={classes.row}>
                                {buildField('Quantidade de vagas por fila', 'quantidade_fila')}
                            </div>
                            <div className={classes.row}>
                                <FormControl className={classes.selectForm}>
                                    <InputLabel>Orientação das vagas</InputLabel>
                                    <Select
                                        value={this.state.orientacao != null ? this.state.orientacao : ''}
                                        onChange={this.handleChange}
                                        input={<Input name='orientacao' id='orientacao' />}
                                    >
                                        <MenuItem value='H'>
                                            <em>Horizontal</em>
                                        </MenuItem>
                                        <MenuItem value='V'>
                                            <em>Vertical</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            {orientacao === 'V' ? (
                                <div className={classes.row}>
                                    <FormControl className={classes.selectForm}>
                                        <InputLabel>Primeira linha do lado</InputLabel>
                                        <Select
                                            value={this.state.lado != null ? this.state.lado : ''}
                                            onChange={this.handleChange}
                                            input={<Input name='lado' id='lado' />}
                                        >
                                            <MenuItem value='E'>
                                                <em>Esquerdo</em>
                                            </MenuItem>
                                            <MenuItem value='D'>
                                                <em>Direito</em>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            ) : (
                                <div className={classes.row}>
                                    <FormControl className={classes.selectForm}>
                                        <InputLabel>Primeira linha do lado</InputLabel>
                                        <Select
                                            value={this.state.lado != null ? this.state.lado : ''}
                                            onChange={this.handleChange}
                                            input={<Input name='lado' id='lado' />}
                                        >
                                            <MenuItem value='C'>
                                                <em>Em cima</em>
                                            </MenuItem>
                                            <MenuItem value='B'>
                                                <em>Em baixo</em>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            )}
                            <div className={classes.row}>
                                <FormControl className={classes.selectForm}>
                                    <InputLabel>Ângulo das vagas</InputLabel>
                                    <Select
                                        value={this.state.angulo != null ? this.state.angulo : ''}
                                        onChange={this.handleChange}
                                        input={<Input name='angulo' id='angulo' />}
                                    >
                                        <MenuItem value='0'>
                                            <em>0º</em>
                                        </MenuItem>
                                        <MenuItem value='45'>
                                            <em>45º</em>
                                        </MenuItem>
                                        <MenuItem value='75'>
                                            <em>75º</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={classes.buttons}>
                                {buildButton('Gerar', this.handleGenerate, this.validateGenerete())}
                                {buildButton('Salvar', this.handleSaveNew, this.validateSave())}
                                {buildButton('Limpar', this.handleClear, this.validateClear())}
                                {buildButton('Voltar', function_cancel, true)}
                            </div>
                        </div>
                    </div>
                    <div className='App-canvas-error'>
                        <p> {this.state.msgErro} </p>
                    </div>
                </div>
            </div>
        );
    }
}

ZonaDrawPark.propTypes = {
    classes: PropTypes.object.isRequired,
    function_save: PropTypes.object.isRequired,
    function_cancel: PropTypes.func.isRequired,
    item_editar: PropTypes.object
};

export default withStyles(styles)(ZonaDrawPark);
