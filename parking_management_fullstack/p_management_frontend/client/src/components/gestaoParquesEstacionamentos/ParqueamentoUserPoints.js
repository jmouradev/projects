import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from 'material-ui/Button';

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

class ParqueamentoUserPoints extends Component {
    state = {
        id: 0,
        rectSize: 6,
        msgErro: '',
        isFirst: true,
        isMontarRetangulos: false,
        vagas: {},
        itemEditar: [],
        listaVagas: [],
        option: '',
        vagasLivres: [],
        vagaSelecionada: 0
    };

    componentDidMount = () => {
        const { item_editar, lista_vagas, option } = this.props;
        console.log('item_editar:', item_editar);
        console.log('lista_vagas:', lista_vagas);
        console.log('option:', option);

        if (item_editar) {
            this.setState({ itemEditar: item_editar, listaVagas: lista_vagas, option: option });
        }
    };

    handleClick = event => {
        const canvas = this.refs.canvas;

        this.setState({ msgErro: '' });
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left - this.state.rectSize / 2).toFixed(2);
        const y = (event.clientY - rect.top - this.state.rectSize / 2).toFixed(2);
        let vagasLivres = this.state.vagasLivres;
        let vagaSelecionada = 0;

        for (var i = 0; i < this.state.vagas.length; i++) {
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

                if (minX < x && x < maxX && minY < y && y < maxY) {
                    vagaSelecionada = i;

                    if (vagasLivres[i]) {
                        vagasLivres[i] = false;
                    } else {
                        vagasLivres[i] = true;
                    }
                }
            }
        }

        this.setState({ vagasLivres: vagasLivres, vagaSelecionada: vagaSelecionada, isMontarRetangulos: true });
    };

    montaCirculos = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        const img = this.refs.image;
        ctx.drawImage(img, 0, 0);
        let vagasLivres = this.state.vagasLivres;

        for (var i = 0; i < this.state.vagas.length; i++) {
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
                } else {
                    ctx.strokeStyle = 'red';
                    ctx.fillStyle = 'red';
                }

                const xCenter = minX + (maxX - minX) / 2;
                const yCenter = minY + (maxY - minY) / 2;

                ctx.lineWidth = 5;

                ctx.beginPath();
                ctx.arc(xCenter, yCenter, 20, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }

        this.setState({ isMontarRetangulos: false });
    };

    validateSave = event => {
        return Object.keys(this.state.vagas).length > 0;
    };

    handleMostrar = event => this.setState({ isMontarRetangulos: true });

    loadVagas = () => {
        console.log('config_1_zona:', this.state.itemEditar.config_1_zona);
        if (this.state.itemEditar.config_1_zona) {
            const vagasIn = JSON.parse(this.state.itemEditar.config_1_zona);
            const vagasState = [];

            for (let i = 0; i < vagasIn.length; i++) {
                console.log('vagasIn[i].id:', vagasIn[i].id, 'vagasIn[i]:', vagasIn[i]);
                vagasState[vagasIn[i].id] = vagasIn[i];
            }

            const canvas = this.refs.canvas;
            const ctx = canvas.getContext('2d');
            const img = this.refs.image;

            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };

            let vagasLivres = [];

            this.state.listaVagas.map(item => (vagasLivres[item.id_vaga] = item.estado_vaga === '0' ? false : true));

            this.setState({
                vagas: vagasState,
                vagasLivres: vagasLivres,
                id: 0,
                isFirst: false,
                isMontarRetangulos: true
            });
        }
    };

    handleSave = () => this.props.function_selected_slot(this.state.vagaSelecionada);

    render() {
        const { classes, function_cancel } = this.props;
        const { isFirst, isMontarRetangulos } = this.state;

        let buildButton = (text, onClickFunction, isDisabled) => (
            <Button variant='raised' color='default' disabled={!isDisabled} onClick={onClickFunction}>
                {text}
            </Button>
        );

        if (isFirst) this.loadVagas();

        if (isMontarRetangulos) {
            this.montaCirculos();
        }

        return (
            <div className={classes.paper}>
                <div className='App-canvas'>
                    <h3 className='App-canvas-title'>Zona : {this.state.itemEditar.id_zona} </h3>
                    <div onClick={this.handleClick}>
                        <canvas
                            ref='canvas'
                            width={this.state.itemEditar.largura_imagem_zona}
                            height={this.state.itemEditar.altura_imagem_zona}
                        />
                        <img ref='image' src={this.state.itemEditar.path_imagem_zona} className='hidden' alt='' />
                    </div>
                    <div>
                        <div className={classes.root}>
                            <div className={classes.column}>
                                <div className={classes.buttons}>
                                    {buildButton('Mostrar', this.handleMostrar, true)}
                                    {buildButton('Selecionar', this.handleSave, this.validateSave())}
                                    {buildButton('Voltar', function_cancel, true)}
                                </div>
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

ParqueamentoUserPoints.propTypes = {
    classes: PropTypes.object.isRequired,
    function_selected_slot: PropTypes.object.isRequired,
    function_cancel: PropTypes.func.isRequired,
    item_editar: PropTypes.object,
    lista_vagas: PropTypes.object,
    option: PropTypes.object
};

export default withStyles(styles)(ParqueamentoUserPoints);
