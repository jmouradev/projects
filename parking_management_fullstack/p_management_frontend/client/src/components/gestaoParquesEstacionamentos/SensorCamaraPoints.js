import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

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

class SensorCamaraPoints extends Component {
    state = {
        id: 0,
        points: [[0, 0], [0, 0], [0, 0], [0, 0]],
        indPoints: 0,
        rectSize: 6,
        msgErro: '',
        isFirst: true,
        isMontarRetangulos: false,
        vagas: {},
        itemEditar: []
    };

    componentDidMount = () => {
        const { item_editar } = this.props;

        if (item_editar) {
            this.setState({ itemEditar: item_editar });
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
        console.log('montaRetangulos');
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        const img = this.refs.image;
        ctx.drawImage(img, 0, 0);

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
                ctx.moveTo(parseFloat(points[0][0]), parseFloat(points[0][1]));
                ctx.lineTo(parseFloat(points[1][0]), parseFloat(points[1][1]));
                ctx.moveTo(parseFloat(points[1][0]), parseFloat(points[1][1]));
                ctx.lineTo(parseFloat(points[2][0]), parseFloat(points[2][1]));
                ctx.moveTo(parseFloat(points[2][0]), parseFloat(points[2][1]));
                ctx.lineTo(parseFloat(points[3][0]), parseFloat(points[3][1]));
                ctx.moveTo(parseFloat(points[3][0]), parseFloat(points[3][1]));
                ctx.lineTo(parseFloat(points[0][0]), parseFloat(points[0][1]));
                ctx.stroke();
                ctx.fillStyle = 'red';
                ctx.font = '20px Courier';

                const xCenter = minX + (maxX - minX) / 2;
                const yCenter = minY + (maxY - minY) / 2;

                ctx.fillText(id, xCenter, yCenter);
            }
        }

        this.setState({ isMontarRetangulos: false });
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

    handleNew = event => {
        console.log('handleNew');

        if (this.state.itemEditar.config_4_sensor_camara) {
            const newSensorConfig = JSON.parse(this.state.itemEditar.config_2_sensor_camara);
            const newImage = JSON.parse(this.state.itemEditar.config_4_sensor_camara);

            newImage.print_frame = true;
            newSensorConfig.send_image = true;

            let temp = this.state.itemEditar;
            temp['config_2_sensor_camara'] = JSON.stringify(newSensorConfig);
            temp['config_4_sensor_camara'] = JSON.stringify(newImage);
            this.setState({ itemEditar: temp });
            this.props.function_save(this.state.itemEditar);
        }
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

    loadVagas = () => {
        if (this.state.itemEditar.config_5_sensor_camara) {
            const vagasIn = JSON.parse(this.state.itemEditar.config_5_sensor_camara);

            console.log('vagasIn3:', vagasIn, 'vagasIn.length:', vagasIn.length);
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
        temp['config_5_sensor_camara'] = JSON.stringify(vagasSave);
        this.setState({ itemEditar: temp });
        this.props.function_save(this.state.itemEditar);
    };

    handleChange = event => this.setState({ id: event.target.value, msgErro: '' });

    render() {
        const { classes, function_cancel } = this.props;
        const { isFirst, isMontarRetangulos } = this.state;

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

        if (isMontarRetangulos) this.montaRetangulos();

        return (
            <div className={classes.paper}>
                <div className='App-canvas'>
                    <h3 className='App-canvas-title'>
                        Zona : {this.state.itemEditar.id_zona} Câmara : {this.state.itemEditar.id_sensor_camara}{' '}
                    </h3>
                    <div onClick={this.handleClick}>
                        <canvas
                            ref='canvas'
                            width={this.state.itemEditar.largura_imagem_sensor_camara}
                            height={this.state.itemEditar.altura_imagem_sensor_camara}
                        />
                        <img
                            ref='image'
                            src={this.state.itemEditar.path_imagem_sensor_camara}
                            className='hidden'
                            alt=''
                        />
                    </div>
                    <div>
                        <div className={classes.root}>
                            <div className={classes.column}>
                                <h2>Vagas</h2>
                                <div className={classes.row}>{buildField('Vaga', 'id')}</div>

                                <div className={classes.buttons}>
                                    {buildButton('Mostrar', this.handleMostrar, true)}
                                    {buildButton('Nova imagem', this.handleNew, true)}
                                    {buildButton('Salvar', this.handleSave, this.validateSave())}
                                    {buildButton('Limpar Especifico', this.handleClearEsp, this.validateClearEsp())}
                                    {buildButton('Limpar', this.handleClear, this.validateClear())}
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

SensorCamaraPoints.propTypes = {
    classes: PropTypes.object.isRequired,
    function_save: PropTypes.object.isRequired,
    function_cancel: PropTypes.func.isRequired,
    item_editar: PropTypes.object
};

export default withStyles(styles)(SensorCamaraPoints);
