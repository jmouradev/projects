import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../../css/Main.css';

import Menu from './MenuPrincipal';
import Home from './Home';

//gestaoUtilizadores
import Login from '../login/Login';
import Register from '../login/Register';
import UtilizadorList from '../gestaoUtilizadores/UtilizadorList';
import NivelAcessoList from '../gestaoUtilizadores/NivelAcessoList';
import TipoUtilizadorList from '../gestaoUtilizadores/TipoUtilizadorList';

//gestaoVeiculos
import TipoVeiculoList from '../gestaoVeiculos/TipoVeiculoList';
import MarcaVeiculoList from '../gestaoVeiculos/MarcaVeiculoList';
import ModeloVeiculoList from '../gestaoVeiculos/ModeloVeiculoList';
import CorVeiculoList from '../gestaoVeiculos/CorVeiculoList';
import VeiculoList from '../gestaoVeiculos/VeiculoList';

//gestaoParquesEstacionamentos
import ZonaList from '../gestaoParquesEstacionamentos/ZonaList';
import TipoVagaList from '../gestaoParquesEstacionamentos/TipoVagaList';
import VagaList from '../gestaoParquesEstacionamentos/VagaList';
import TipoSensorList from '../gestaoParquesEstacionamentos/TipoSensorList';
import SensorPresencaList from '../gestaoParquesEstacionamentos/SensorPresencaList';
import SensorCamaraList from '../gestaoParquesEstacionamentos/SensorCamaraList';
import ParqueamentoList from '../gestaoParquesEstacionamentos/ParqueamentoList';
//import ParqueamentoUserList from '../gestaoParquesEstacionamentos/ParqueamentoUserList'
import ParqueamentoUserForm from '../gestaoParquesEstacionamentos/ParqueamentoUserForm';

//relatorios
import AnomaliasList from '../relatorios/AnomaliasList';
import EstacionamentoAbusivoList from '../relatorios/EstacionamentoAbusivoList';
import EstacionamentoNaoIdentificadosList from '../relatorios/EstacionamentoNaoIdentificadoList';
import UtilizacaoEstacionametoList from '../relatorios/UtilizacaoEstacionamentoList';

class Main extends Component {
    state = {
        id_utilizador: 0,
        loggedUser: null,
        id_tipo_utilizador: 0
    };

    doLogout = () => {
        this.setState({ id_utilizador: 0, loggedUser: null, id_tipo_utilizador: 0 });
    };

    doLogin = (id, username, tipo) => {
        this.setState({ id_utilizador: id, loggedUser: username, id_tipo_utilizador: tipo });
    };

    render() {
        let loginComponent = <Login doLogin={this.doLogin} />;
        let registerComponent = <Register doLogin={this.doLogin} />;

        return (
            <div className='App-main'>
                Main componente
                <Menu loginData={this.state} doLogout={this.doLogout} />
                <main>
                    <Switch>
                        <Route exact path='/' component={() => <Home loginData={this.state} />} />
                        <Route exact path='/login' component={() => loginComponent} />
                        <Route exact path='/register' component={() => registerComponent} />
                        {this.state.loggedUser ? (
                            <div>
                                <Route
                                    exact
                                    path='/utilizador-listar'
                                    component={() => <UtilizadorList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/nivel-acesso-listar'
                                    component={() => <NivelAcessoList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/tipo-utilizador-listar'
                                    component={() => <TipoUtilizadorList loginData={this.state} />}
                                />

                                <Route
                                    exact
                                    path='/tipo-veiculo-listar'
                                    component={() => <TipoVeiculoList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/marca-veiculo-listar'
                                    component={() => <MarcaVeiculoList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/modelo-veiculo-listar'
                                    component={() => <ModeloVeiculoList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/cor-veiculo-listar'
                                    component={() => <CorVeiculoList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/veiculo-listar'
                                    component={() => <VeiculoList loginData={this.state} />}
                                />

                                <Route
                                    exact
                                    path='/zona-listar'
                                    component={() => <ZonaList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/tipo-vaga-listar'
                                    component={() => <TipoVagaList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/vaga-listar'
                                    component={() => <VagaList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/tipo-sensor-listar'
                                    component={() => <TipoSensorList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/sensor-presenca-listar'
                                    component={() => <SensorPresencaList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/sensor-camara-listar'
                                    component={() => <SensorCamaraList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/parqueamento-listar'
                                    component={() => <ParqueamentoList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/parqueamento-user-listar'
                                    component={() => <ParqueamentoUserForm loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/anomalias-listar'
                                    component={() => <AnomaliasList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/estacionamento-abusivo-listar'
                                    component={() => <EstacionamentoAbusivoList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/estacionamento-nao-identificado-listar'
                                    component={() => <EstacionamentoNaoIdentificadosList loginData={this.state} />}
                                />
                                <Route
                                    exact
                                    path='/utilizacao-estacionamento-listar'
                                    component={() => <UtilizacaoEstacionametoList loginData={this.state} />}
                                />
                            </div>
                        ) : (
                            loginComponent
                        )}
                    </Switch>
                </main>
            </div>
        );
    }
}

export default Main;
