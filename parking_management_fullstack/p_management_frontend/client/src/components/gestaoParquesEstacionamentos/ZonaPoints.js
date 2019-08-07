import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

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

class ZonaPoints extends Component {
    state = {
        id: 0,
        divisionFactor: 1,
        points: [[0, 0], [0, 0], [0, 0], [0, 0]],
        indPoints: 0,
        rectSize: 6,
        msgErro: '',
        isFirst: true,
        isMontarRetangulos: false,
        vagas: {},
        itemEditar: [],
        listaVagas: [],
        imageParque: false,
        imageCarro: false,
        imageGoogle: false,
        window_width: window.innerWidth,
        window_height: window.innerHeight
    };

    componentDidMount = () => {
        const { item_editar, lista_vagas, option } = this.props;
        let factor = 1;

        if (option === 'see_park') {
            factor = 2;
        }

        if (item_editar) {
            this.setState({ itemEditar: item_editar, listaVagas: lista_vagas, divisionFactor: factor });
        }
    };

    handleClick = event => {
        if (this.state.id === 0) {
            this.setState({ msgErro: 'Deve escolher um número de vaga antes de selecionar os pontos!' });
        } else {
            const canvas = this.refs.canvas;
            const ctx = canvas.getContext('2d');

            const rect = canvas.getBoundingClientRect();
            const x = (event.clientX - rect.left - this.state.rectSize / 2).toFixed(2);
            const y = (event.clientY - rect.top - this.state.rectSize / 2).toFixed(2);
            const array = this.state.points;
            array[this.state.indPoints][0] = Math.round(x);
            array[this.state.indPoints][1] = Math.round(y);
            this.setState({ msgErro: '', points: array, indPoints: this.state.indPoints + 1 });

            ctx.fillStyle = 'green';
            ctx.fillRect(x, y, this.state.rectSize, this.state.rectSize);

            if (this.state.indPoints === 3) {
                const vagasState = this.state.vagas;
                const novaVaga = { id: parseInt(this.state.id, 10), points: this.state.points };
                vagasState[this.state.id] = novaVaga;
                this.setState({
                    vagas: vagasState,
                    id: 0,
                    points: [[0, 0], [0, 0], [0, 0], [0, 0]],
                    indPoints: 0,
                    isMontarRetangulos: true
                });
            }
        }
    };

    montaRetangulos = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');

        if (typeof this.state.itemEditar.largura_imagem_zona !== 'undefined' && this.state.imageParque) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const imageParque = this.refs.imageParque;
            const x = (canvas.width - this.state.itemEditar.largura_imagem_zona / this.state.divisionFactor) / 2;
            ctx.drawImage(
                imageParque,
                x,
                0,
                this.state.itemEditar.largura_imagem_zona / this.state.divisionFactor,
                this.state.itemEditar.altura_imagem_zona / this.state.divisionFactor
            );

            for (let i = 0; i < this.state.vagas.length; i++) {
                if (typeof this.state.vagas[i] !== 'undefined') {
                    const id = parseFloat(this.state.vagas[i].id);
                    const points = this.state.vagas[i].points;

                    const arrayX = [
                        parseFloat(points[0][0]),
                        parseFloat(points[1][0]),
                        parseFloat(points[2][0]),
                        parseFloat(points[3][0])
                    ];
                    const arrayY = [
                        parseFloat(points[0][1]),
                        parseFloat(points[1][1]),
                        parseFloat(points[2][1]),
                        parseFloat(points[3][1])
                    ];

                    const maxX = Math.max(...arrayX);
                    const minX = Math.min(...arrayX);
                    const maxY = Math.max(...arrayY);
                    const minY = Math.min(...arrayY);

                    ctx.strokeStyle = 'green';
                    ctx.lineWidth = 5;

                    ctx.beginPath();
                    ctx.moveTo(parseFloat(points[0][0] + x), parseFloat(points[0][1]));
                    ctx.lineTo(parseFloat(points[1][0] + x), parseFloat(points[1][1]));
                    ctx.moveTo(parseFloat(points[1][0] + x), parseFloat(points[1][1]));
                    ctx.lineTo(parseFloat(points[2][0] + x), parseFloat(points[2][1]));
                    ctx.moveTo(parseFloat(points[2][0] + x), parseFloat(points[2][1]));
                    ctx.lineTo(parseFloat(points[3][0] + x), parseFloat(points[3][1]));
                    ctx.moveTo(parseFloat(points[3][0] + x), parseFloat(points[3][1]));
                    ctx.lineTo(parseFloat(points[0][0] + x), parseFloat(points[0][1]));
                    ctx.stroke();
                    ctx.fillStyle = 'red';
                    ctx.font = '20px Courier';

                    const xCenter = minX + (maxX - minX) / 2;
                    const yCenter = minY + (maxY - minY) / 2;

                    ctx.fillText(id, xCenter + x, yCenter);
                }
            }

            this.setState({ isMontarRetangulos: false });
        }
    };

    montaCirculos = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');

        if (
            typeof this.state.itemEditar.largura_imagem_zona !== 'undefined' &&
            this.state.imageCarro &&
            this.state.imageGoogle &&
            this.state.imageParque
        ) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const x = (canvas.width - this.state.itemEditar.largura_imagem_zona / this.state.divisionFactor) / 2;
            const imageParque = this.refs.imageParque;
            ctx.drawImage(
                imageParque,
                x,
                0,
                this.state.itemEditar.largura_imagem_zona / this.state.divisionFactor,
                this.state.itemEditar.altura_imagem_zona / this.state.divisionFactor
            );

            const imageGoogle = this.refs.imageGoogle;
            ctx.drawImage(imageGoogle, 0, 0, 500, 300);

            let vagasLivres = [];

            this.state.listaVagas.map(item => (vagasLivres[item.id_vaga] = item.estado_vaga === '0' ? false : true));

            for (let i = 0; i < this.state.vagas.length; i++) {
                if (typeof this.state.vagas[i] !== 'undefined') {
                    const points = this.state.vagas[i].points;

                    const arrayX = [
                        parseFloat(points[0][0]),
                        parseFloat(points[1][0]),
                        parseFloat(points[2][0]),
                        parseFloat(points[3][0])
                    ];
                    const arrayY = [
                        parseFloat(points[0][1]),
                        parseFloat(points[1][1]),
                        parseFloat(points[2][1]),
                        parseFloat(points[3][1])
                    ];

                    const maxX = Math.max(...arrayX);
                    const minX = Math.min(...arrayX);
                    const maxY = Math.max(...arrayY);
                    const minY = Math.min(...arrayY);

                    if (vagasLivres[i]) {
                        ctx.strokeStyle = 'green';
                        ctx.fillStyle = 'green';

                        const xCenter = (minX + (maxX - minX) / 2) / this.state.divisionFactor;
                        const yCenter = (minY + (maxY - minY) / 2) / this.state.divisionFactor;

                        ctx.lineWidth = 5;

                        ctx.beginPath();
                        ctx.arc(xCenter + x, yCenter, 10, 0, 2 * Math.PI);
                        ctx.stroke();
                    } else {
                        let imageCarro = this.refs.imageCarro;
                        ctx.drawImage(
                            imageCarro,
                            minX / this.state.divisionFactor + x,
                            minY / this.state.divisionFactor,
                            (maxX - minX) / this.state.divisionFactor,
                            (maxY - minY) / this.state.divisionFactor
                        );
                    }
                }
            }

            this.setState({ isMontarRetangulos: false });
        }
    };

    validateClearEsp = event => {
        return this.state.id !== 0 && Object.keys(this.state.vagas).length > 0;
    };

    validateClear = event => {
        return this.state.id === 0 && Object.keys(this.state.vagas).length > 0;
    };

    validateSave = event => {
        return Object.keys(this.state.vagas).length > 0;
    };

    handleClearEsp = event => {
        const vagasState = this.state.vagas;
        delete vagasState[this.state.id];
        this.setState({
            vagas: vagasState,
            id: 0,
            points: [[0, 0], [0, 0], [0, 0], [0, 0]],
            indPoints: 0,
            msgErro: '',
            isMontarRetangulos: true
        });
    };

    handleClear = event =>
        this.setState({
            vagas: [],
            id: 0,
            points: [[0, 0], [0, 0], [0, 0], [0, 0]],
            indPoints: 0,
            msgErro: '',
            isMontarRetangulos: true
        });

    handleMostrar = event => this.setState({ isMontarRetangulos: true });

    reload_vagas = event => {
        const dadosIn = { opcao: 'list_active', dados: { id_zona: this.state.itemEditar.id_zona } }; //
        fetch_server('/vaga', dadosIn, dadosOut => {
            if (dadosOut.err) {
                this.setState({ estado: 'erro', msgErro: dadosOut.err });
            } else {
                this.setState({ listaVagas: dadosOut.dados.list, isMontarRetangulos: true, opcao: 'see_park' });
            }
        });
    };

    load_image = () => {
        const dadosIn = { opcao: 'load_image', dados: { filename: 'deltas_cameras/grafico_delta_z4_c11.svg' } }; //
        fetch_server('/zona', dadosIn, dadosOut => {
            console.log('DadosOut(1):', dadosOut);
            if (dadosOut.err) this.setState({ estado: 'erro', msgErro: dadosOut.err, imageGoogle: true });
            else this.setState({ image: dadosOut.dados.image, isMontarRetangulos: true, opcao: 'see_park' });
        });
    };

    loadVagas = () => {
        if (this.state.itemEditar.config_1_zona) {
            const vagasIn = JSON.parse(this.state.itemEditar.config_1_zona);
            const vagasState = [];

            for (let i = 0; i < vagasIn.length; i++) {
                console.log('vagasIn[i].id:', vagasIn[i].id, 'vagasIn[i]:', vagasIn[i]);
                vagasState[vagasIn[i].id] = vagasIn[i];
            }

            const imageParque = this.refs.imageParque;

            imageParque.onload = () => {
                this.setState({ imageParque: true, isMontarRetangulos: true });
            };

            const imageCarro = this.refs.imageCarro;

            imageCarro.onload = () => {
                this.setState({ imageCarro: true, isMontarRetangulos: true });
            };

            const imageGoogle = this.refs.imageGoogle;

            imageGoogle.onload = () => {
                this.setState({ imageGoogle: true, isMontarRetangulos: true });
            };

            this.setState({
                vagas: vagasState,
                id: 0,
                points: [[0, 0], [0, 0], [0, 0], [0, 0]],
                indPoints: 0,
                isFirst: false,
                isMontarRetangulos: true
            });
        }
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

    handleChange = event => this.setState({ id: event.target.value, msgErro: '' });

    render() {
        const { classes, function_cancel, option } = this.props;
        const { isFirst, isMontarRetangulos, window_width, window_height } = this.state;

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

        if (isFirst) this.loadVagas();

        if (isMontarRetangulos) {
            if (option === 'see_park') {
                this.montaCirculos();
            } else {
                this.montaRetangulos();
            }
        }

        return (
            <div className={classes.paper}>
                <div>
                    <img
                        ref='imageGoogle'
                        src={'/getImage/plantas_parques/google_zona_4.png'}
                        className='hidden'
                        alt=''
                    />
                    <img ref='imageCarro' src={'/getImage/carros/carro_vertical.png'} className='hidden' alt='' />
                    <img ref='imageParque' src={this.state.itemEditar.path_imagem_zona} className='hidden' alt='' />
                </div>
                <div className='App-canvas'>
                    <h3 className='App-canvas-title'>Zona : {this.state.itemEditar.id_zona} </h3>
                    <div onClick={this.handleClick}>
                        <canvas ref='canvas' width={window_width} height={window_height} />
                    </div>
                    <div>
                        {option === 'see_park' ? (
                            <div className={classes.root}>
                                <div className={classes.buttons}>
                                    {buildButton('Atualizar', this.reload_vagas, true)}
                                    {buildButton('Voltar', function_cancel, true)}
                                </div>
                            </div>
                        ) : (
                            <div className={classes.root}>
                                <div className={classes.column}>
                                    <h2>Vagas</h2>
                                    <div className={classes.row}>{buildField('Vaga', 'id')}</div>
                                    <div className={classes.buttons}>
                                        {buildButton('Atualizar', this.reload_vagas, true)}
                                        {buildButton('Salvar', this.handleSave, this.validateSave())}
                                        {buildButton('Limpar Especifico', this.handleClearEsp, this.validateClearEsp())}
                                        {buildButton('Limpar', this.handleClear, this.validateClear())}
                                        {buildButton('Voltar', function_cancel, true)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='App-canvas-error'>
                        <p> {this.state.msgErro.message} </p>
                    </div>
                </div>
            </div>
        );
    }
}

ZonaPoints.propTypes = {
    classes: PropTypes.object.isRequired,
    function_save: PropTypes.object.isRequired,
    function_cancel: PropTypes.func.isRequired,
    item_editar: PropTypes.object,
    lista_vagas: PropTypes.object,
    option: PropTypes.object
};

export default withStyles(styles)(ZonaPoints);
