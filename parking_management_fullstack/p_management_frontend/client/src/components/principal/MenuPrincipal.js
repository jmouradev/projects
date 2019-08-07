import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Fade from 'material-ui/transitions/Fade';

const styles = theme => ({
    root: {
        display: 'flex',
        width: '99%',
        justifyContent: 'flex-end'
    }
});

class MenuPrincipal extends Component {
    state = {
        menuAberto: null
    };

    abrirMenu = ({ target }) => {
        let menu = target;
        if (!menu.id) menu = target.parentElement;
        let novoMenu = null;
        if (menu !== this.state.menuAberto) novoMenu = menu;
        //    console.log('novomenu', novoMenu)
        this.setState({ menuAberto: novoMenu });
    };

    menuEstaAberto = menu => this.state.menuAberto !== null && menu === this.state.menuAberto.id;

    navegar = pagina => {
        this.setState({ menuAberto: null });
        this.props.history.push(pagina);
    };

    fecharMenu = () => this.setState({ menuAberto: null });

    render() {
        const { menuAberto } = this.state;
        const { classes } = this.props;

        let menuSemLoggar = (
            <div className={classes.root}>
                <Button onClick={() => this.navegar('login')}>Entrar</Button>
                <Button onClick={() => this.navegar('register')}>Registar</Button>
            </div>
        );

        //    console.log("id_tipo_utilizador:", this.props.loginData.id_tipo_utilizador)

        let menuLoggadoRegister = (
            <div className={classes.root}>
                <Button id='gestao_utilizadores' onClick={this.abrirMenu}>
                    Gestão de utilizadores
                </Button>
                <Menu
                    anchorEl={menuAberto}
                    open={this.menuEstaAberto('gestao_utilizadores')}
                    onClose={this.fecharMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => this.navegar('utilizador-listar')}>Utilizadores</MenuItem>
                </Menu>

                <Button id='gestao_veiculos' onClick={this.abrirMenu}>
                    Gestão de Veículos
                </Button>
                <Menu
                    anchorEl={menuAberto}
                    open={this.menuEstaAberto('gestao_veiculos')}
                    onClose={this.fecharMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => this.navegar('veiculo-listar')}>Veículos</MenuItem>
                </Menu>

                <Button id='gestao_parques_estacionamentos' onClick={this.abrirMenu}>
                    Gestão de Parques e Estacionamentos
                </Button>
                <Menu
                    anchorEl={menuAberto}
                    open={this.menuEstaAberto('gestao_parques_estacionamentos')}
                    onClose={this.fecharMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => this.navegar('parqueamento-user-listar')}>Parqueamentos</MenuItem>
                </Menu>

                <Button onClick={this.props.doLogout}>Sair</Button>
            </div>
        );

        let menuLoggadoBasico = (
            <div className={classes.root}>
                <Button id='gestao_utilizadores' onClick={this.abrirMenu}>
                    Gestão de utilizadores
                </Button>
                <Menu
                    anchorEl={menuAberto}
                    open={this.menuEstaAberto('gestao_utilizadores')}
                    onClose={this.fecharMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => this.navegar('utilizador-listar')}>Utilizadores</MenuItem>
                </Menu>

                <Button id='gestao_veiculos' onClick={this.abrirMenu}>
                    Gestão de Veículos
                </Button>
                <Menu
                    anchorEl={menuAberto}
                    open={this.menuEstaAberto('gestao_veiculos')}
                    onClose={this.fecharMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => this.navegar('veiculo-listar')}>Veículos</MenuItem>
                </Menu>

                <Button id='gestao_parques_estacionamentos' onClick={this.abrirMenu}>
                    Gestão de Parques e Estacionamentos
                </Button>
                <Menu
                    anchorEl={menuAberto}
                    open={this.menuEstaAberto('gestao_parques_estacionamentos')}
                    onClose={this.fecharMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => this.navegar('parqueamento-user-listar')}>Parqueamentos</MenuItem>
                </Menu>

                <Button id='relatorios' onClick={this.abrirMenu}>
                    Relatórios
                </Button>
                <Menu
                    anchorEl={menuAberto}
                    open={this.menuEstaAberto('relatorios')}
                    onClose={this.fecharMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => this.navegar('estacionamento-abusivo-listar')}>
                        Alertas de estacionamento abusivo
                    </MenuItem>
                    <MenuItem onClick={() => this.navegar('estacionamento-nao-identificado-listar')}>
                        Alertas de estacionamento não identificado
                    </MenuItem>
                    <MenuItem onClick={() => this.navegar('anomalias-listar')}>Alertas de anomalias</MenuItem>
                    <MenuItem onClick={() => this.navegar('utilizacao-estacionamento-listar')}>
                        Utilização de estacionamento (atual e histórico)
                    </MenuItem>
                </Menu>

                <Button onClick={this.props.doLogout}>Sair</Button>
            </div>
        );

        let menuLoggadoCompleto = (
            <div className={classes.root}>
                <Button id='gestao_utilizadores' onClick={this.abrirMenu}>
                    Gestão de utilizadores
                </Button>
                <Menu
                    anchorEl={menuAberto}
                    open={this.menuEstaAberto('gestao_utilizadores')}
                    onClose={this.fecharMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => this.navegar('nivel-acesso-listar')}>Níveis de acessos</MenuItem>
                    <MenuItem onClick={() => this.navegar('tipo-utilizador-listar')}>Tipos de utilizadores</MenuItem>
                    <MenuItem onClick={() => this.navegar('utilizador-listar')}>Utilizadores</MenuItem>
                </Menu>

                <Button id='gestao_veiculos' onClick={this.abrirMenu}>
                    Gestão de Veículos
                </Button>
                <Menu
                    anchorEl={menuAberto}
                    open={this.menuEstaAberto('gestao_veiculos')}
                    onClose={this.fecharMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => this.navegar('tipo-veiculo-listar')}>Tipos de veículos</MenuItem>
                    <MenuItem onClick={() => this.navegar('marca-veiculo-listar')}>Marcas de veículos</MenuItem>
                    <MenuItem onClick={() => this.navegar('modelo-veiculo-listar')}>Modelos de veículos</MenuItem>
                    <MenuItem onClick={() => this.navegar('cor-veiculo-listar')}>Cores de veículos</MenuItem>
                    <MenuItem onClick={() => this.navegar('veiculo-listar')}>Veículos</MenuItem>
                </Menu>

                <Button id='gestao_parques_estacionamentos' onClick={this.abrirMenu}>
                    Gestão de Parques e Estacionamentos
                </Button>
                <Menu
                    anchorEl={menuAberto}
                    open={this.menuEstaAberto('gestao_parques_estacionamentos')}
                    onClose={this.fecharMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => this.navegar('zona-listar')}>Zonas</MenuItem>
                    <MenuItem onClick={() => this.navegar('tipo-vaga-listar')}>Tipos de vagas</MenuItem>
                    <MenuItem onClick={() => this.navegar('vaga-listar')}>Vagas</MenuItem>
                    <MenuItem onClick={() => this.navegar('tipo-sensor-listar')}>Tipos de sensores</MenuItem>
                    <MenuItem onClick={() => this.navegar('sensor-presenca-listar')}>Sensores de presença</MenuItem>
                    <MenuItem onClick={() => this.navegar('sensor-camara-listar')}>Sensores câmaras</MenuItem>
                    <MenuItem onClick={() => this.navegar('parqueamento-listar')}>Parqueamentos</MenuItem>
                </Menu>

                <Button id='relatorios' onClick={this.abrirMenu}>
                    Relatórios
                </Button>
                <Menu
                    anchorEl={menuAberto}
                    open={this.menuEstaAberto('relatorios')}
                    onClose={this.fecharMenu}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => this.navegar('estacionamento-abusivo-listar')}>
                        Alertas de estacionamento abusivo
                    </MenuItem>
                    <MenuItem onClick={() => this.navegar('estacionamento-nao-identificado-listar')}>
                        Alertas de estacionamento não identificado
                    </MenuItem>
                    <MenuItem onClick={() => this.navegar('anomalias-listar')}>Alertas de anomalias</MenuItem>
                    <MenuItem onClick={() => this.navegar('utilizacao-estacionamento-listar')}>
                        Utilização de estacionamento (atual e histórico)
                    </MenuItem>
                </Menu>

                <Button onClick={this.props.doLogout}>Sair</Button>
            </div>
        );

        let menuLoggado =
            this.props.loginData.id_tipo_utilizador === 4
                ? menuLoggadoCompleto
                : this.props.loginData.id_tipo_utilizador === 5
                ? menuLoggadoBasico
                : menuLoggadoRegister;

        return this.props.loginData.loggedUser ? menuLoggado : menuSemLoggar;
    }
}

MenuPrincipal.propTypes = {
    loginData: PropTypes.object,
    doLogout: PropTypes.func.isRequired
};
export default withRouter(withStyles(styles)(MenuPrincipal));
