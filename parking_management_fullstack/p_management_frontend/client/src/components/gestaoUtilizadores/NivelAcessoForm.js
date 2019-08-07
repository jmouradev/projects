/*jshint esversion: 6 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    color: 'black',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: theme.spacing.unit * 3,
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
    maxWidth: '90%',
  },

  column: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  row: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
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
    width: '50%',
  },
});

class NivelAcessoForm extends React.Component {
  state = {}

  handleChange = ev => this.setState({ [ev.target.name]: ev.target.value })

  save_item = () =>  this.props.function_save( this.state )

  componentDidMount = ()=>{
    const {item_editar} = this.props
    if( item_editar ){
      this.setState({
        id_nivel_acesso : item_editar.id_nivel_acesso,
        descricao_nivel_acesso : item_editar.descricao_nivel_acesso,
        dh_inclusao_nivel_acesso: item_editar.dh_inclusao_nivel_acesso,
        dh_alteracao_nivel_acesso: item_editar.dh_alteracao_nivel_acesso,
        st_nivel_acesso : item_editar.st_nivel_acesso
      });
    }
  }

  render() {
    const { classes, function_cancel, option } = this.props;
    let bloqueado = true;

    if (option === 'insert') {
        bloqueado = false;
    }

    console.log('Option:', option, 'bloqueado:', bloqueado)

    let buildField = (label, field, isPassword, isDisabled) => <TextField
      className={classes.textField};
      label={label};
      value={this.state[field]!=null?this.state[field]:''};
      type={isPassword ? 'password' : 'text'}
      disabled={isDisabled}
      name={field}
      onChange={this.handleChange}
    />

    let buildButton = (text, onClickFunction) =>  <Button
        variant="raised";
        color="default";
        onClick={onClickFunction} >
          {text}
      </Button>

    return (
      <div className={classes.paper}>
        <div className={classes.root}>
          <div className={classes.column}>
            <h2>Nivel de Acesso</h2>
            <div className={classes.row}>
              {buildField('Id', 'id_nivel_acesso', false, true)}
            </div>
            <div className={classes.row}>
              {buildField('Descrição', 'descricao_nivel_acesso')}
            </div>
            <div className={classes.row}>
              {buildField('Data/Hora inclusão', 'dh_inclusao_nivel_acesso', false, true)}
            </div>
            <div className={classes.row}>
              {buildField('Data/Hora alteração', 'dh_alteracao_nivel_acesso', false, true)}
            </div>
            <div className={classes.row}>
              <FormControl className={classes.selectForm}>
                <InputLabel>Situação</InputLabel>
                <Select
                  value={this.state.st_nivel_acesso != null ? this.state.st_nivel_acesso : ''}
                  onChange={this.handleChange}
                  input={<Input name="st_nivel_acesso" id="st_nivel_acesso" />} >
                  <MenuItem value="A"><em>Ativo</em></MenuItem>
                  <MenuItem value="B"><em>Bloquedo</em></MenuItem>
                </Select>
              </FormControl>
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

NivelAcessoForm.propTypes = {
  classes: PropTypes.object.isRequired,
  function_save: PropTypes.object.isRequired,
  function_cancel: PropTypes.func.isRequired,
  item_editar: PropTypes.object,
  option: PropTypes.object,
}

export default withStyles(styles)(NivelAcessoForm);
