/*jshint esversion: 6 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 5001;

//gestaoUtilizadores
const utilizadorRoute = require('./routes/gestaoUtilizadores/utilizadorRoute');
const nivelAcessoRoute = require('./routes/gestaoUtilizadores/nivelAcessoRoute');
const tipoUtilizadorRoute = require('./routes/gestaoUtilizadores/tipoUtilizadorRoute');

//gestaoVeiculos
const tipoVeiculoRoute = require('./routes/gestaoVeiculos/tipoVeiculoRoute');
const marcaVeiculoRoute = require('./routes/gestaoVeiculos/marcaVeiculoRoute');
const modeloVeiculoRoute = require('./routes/gestaoVeiculos/modeloVeiculoRoute');
const corVeiculoRoute = require('./routes/gestaoVeiculos/corVeiculoRoute');
const veiculoRoute = require('./routes/gestaoVeiculos/veiculoRoute');

//gestaoParquesEstacionamentos
const zonaRoute = require('./routes/gestaoParquesEstacionamentos/zonaRoute');
const tipoVagaRoute = require('./routes/gestaoParquesEstacionamentos/tipoVagaRoute');
const vagaRoute = require('./routes/gestaoParquesEstacionamentos/vagaRoute');
const tipoSensorRoute = require('./routes/gestaoParquesEstacionamentos/tipoSensorRoute');
const sensorPresencaRoute = require('./routes/gestaoParquesEstacionamentos/sensorPresencaRoute');
const sensorCamaraRoute = require('./routes/gestaoParquesEstacionamentos/sensorCamaraRoute');
const parqueamentoRoute = require('./routes/gestaoParquesEstacionamentos/parqueamentoRoute');

//relatorios
const anomaliaRoute = require('./routes/relatorios/anomaliaRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//gestaoUtilizadores
app.use('/login', function(req, res) {
    utilizadorRoute.login(req, res);
});
app.use('/register', function(req, res) {
    utilizadorRoute.register(req, res);
});
app.use('/utilizador', function(req, res) {
    utilizadorRoute.maintenance(req, res);
});
app.use('/nivel_acesso', function(req, res) {
    nivelAcessoRoute.maintenance(req, res);
});
app.use('/tipo_utilizador', function(req, res) {
    tipoUtilizadorRoute.maintenance(req, res);
});
app.use('/forma_pagamento', function(req, res) {
    formaPagamentoRoute.maintenance(req, res);
});

//gestaoVeiculos
app.use('/tipo_veiculo', function(req, res) {
    tipoVeiculoRoute.maintenance(req, res);
});
app.use('/marca_veiculo', function(req, res) {
    marcaVeiculoRoute.maintenance(req, res);
});
app.use('/modelo_veiculo', function(req, res) {
    modeloVeiculoRoute.maintenance(req, res);
});
app.use('/cor_veiculo', function(req, res) {
    corVeiculoRoute.maintenance(req, res);
});
app.use('/veiculo', function(req, res) {
    veiculoRoute.maintenance(req, res);
});

//gestaoParquesEstacionamentos
app.use('/zona', function(req, res) {
    zonaRoute.maintenance(req, res);
});
app.use('/tipo_vaga', function(req, res) {
    tipoVagaRoute.maintenance(req, res);
});
app.use('/vaga', function(req, res) {
    vagaRoute.maintenance(req, res);
});
app.use('/tipo_sensor', function(req, res) {
    tipoSensorRoute.maintenance(req, res);
});
app.use('/sensor_presenca', function(req, res) {
    sensorPresencaRoute.maintenance(req, res);
});
app.use('/sensor_camara', function(req, res) {
    sensorCamaraRoute.maintenance(req, res);
});
app.use('/parqueamento', function(req, res) {
    parqueamentoRoute.maintenance(req, res);
});

//relatorios
app.use('/anomalia', function(req, res) {
    anomaliaRoute.maintenance(req, res);
});

app.use('/getImage', express.static('images'));

app.listen(port, () => console.log(`Listening on port ${port}`));
