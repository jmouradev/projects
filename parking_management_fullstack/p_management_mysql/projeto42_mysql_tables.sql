--
-- Create database
--
CREATE DATABASE projeto_42_db CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create user accessing from localhost
--
CREATE USER 'projeto_42_user' @'localhost' IDENTIFIED BY '';
--
-- Create user accessing from remote hosts
--
CREATE USER 'projeto_42_user' @'%' IDENTIFIED BY '';
--
-- Grant usages
--
GRANT USAGE ON *.* TO 'projeto_42_user' @'localhost' IDENTIFIED BY '' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT USAGE ON *.* TO 'projeto_42_user' @'%' IDENTIFIED BY '' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
--
-- Grant privileges
--
GRANT ALL PRIVILEGES ON projeto_42_db.* TO 'projeto_42_user' @'localhost';
GRANT ALL PRIVILEGES ON projeto_42_db.* TO 'projeto_42_user' @'%';
GRANT ALL PRIVILEGES ON projeto_42_db.* TO 'projeto_42_user' @'' IDENTIFIED BY '' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON projeto_42_db.* TO 'projeto_42_user' @'%' IDENTIFIED BY '' WITH GRANT OPTION;
-- mysql -u projeto_42_user -h IP -p PASS
-- GRANT ALL PRIVILEGES ON * . * TO 'projeto_42_user'@'localhost';
FLUSH PRIVILEGES;
--
-- Database: Projeto 42
--
--
-- Estrutura da tabela e-mail de forward
--
CREATE TABLE IF NOT EXISTS projeto_42_db.emails_reencaminhar (
  id_emails_reencaminhar int (011) NOT NULL AUTO_INCREMENT,
  nome_conta varchar (032) NOT NULL,
  usa_link_seguro int (001) NOT NULL DEFAULT 0,
  servidor_smtp varchar (032) NOT NULL,
  porto int (005) NOT NULL,
  tempo_inativo int (003) NOT NULL,
  nome_acesso varchar (128) NOT NULL,
  password_email varchar (040) NOT NULL,
  email varchar (128) NOT NULL,
  nome_mostrar varchar (128) NOT NULL,
  st_emails_reencaminhar char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_emails_reencaminhar),
  UNIQUE KEY id_emails_reencaminhar_UNIQUE (id_emails_reencaminhar),
  UNIQUE KEY nome_conta_UNIQUE (nome_conta)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table anomalias
--
CREATE TABLE IF NOT EXISTS projeto_42_db.anomalia (
  dh_abertura_anomalia datetime NOT NULL DEFAULT NOW(),
  dh_fechamento_anomalia datetime NOT NULL DEFAULT NOW(),
  criticidade_anomalia char (050) NOT NULL DEFAULT 'ALTA',
  descricao_anomalia varchar (250) NOT NULL,
  estado_anomalia char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (dh_abertura_anomalia),
  UNIQUE KEY all_unique (dh_abertura_anomalia)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table nivel_acesso
--
CREATE TABLE IF NOT EXISTS projeto_42_db.nivel_acesso (
  id_nivel_acesso int (011) NOT NULL AUTO_INCREMENT,
  descricao_nivel_acesso varchar (250) NOT NULL,
  dh_inclusao_nivel_acesso datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_nivel_acesso datetime NOT NULL DEFAULT NOW(),
  st_nivel_acesso char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_nivel_acesso),
  UNIQUE KEY id_nivel_acesso_UNIQUE (id_nivel_acesso)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table tipo_utilizador
--
CREATE TABLE IF NOT EXISTS projeto_42_db.tipo_utilizador (
  id_tipo_utilizador int (011) NOT NULL AUTO_INCREMENT,
  descricao_tipo_utilizador varchar (250) NOT NULL,
  id_nivel_acesso int (011) NOT NULL,
  dh_inclusao_tipo_utilizador datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_tipo_utilizador datetime NOT NULL DEFAULT NOW(),
  st_tipo_utilizador char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_tipo_utilizador),
  UNIQUE KEY id_tipo_utilizador_UNIQUE (id_tipo_utilizador)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table tipo_veiculo
--
CREATE TABLE IF NOT EXISTS projeto_42_db.tipo_veiculo (
  id_tipo_veiculo int (011) NOT NULL AUTO_INCREMENT,
  descricao_tipo_veiculo varchar (250) NOT NULL,
  dh_inclusao_tipo_veiculo datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_tipo_veiculo datetime NOT NULL DEFAULT NOW(),
  st_tipo_veiculo char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_tipo_veiculo),
  UNIQUE KEY id_tipo_veiculo_UNIQUE (id_tipo_veiculo)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table marca_veiculo
--
CREATE TABLE IF NOT EXISTS projeto_42_db.marca_veiculo (
  id_marca_veiculo int (011) NOT NULL AUTO_INCREMENT,
  descricao_marca_veiculo varchar (250) NOT NULL,
  dh_inclusao_marca_veiculo datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_marca_veiculo datetime NOT NULL DEFAULT NOW(),
  st_marca_veiculo char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_marca_veiculo),
  UNIQUE KEY id_marca_veiculo_UNIQUE (id_marca_veiculo)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table modelo_veiculo
--
CREATE TABLE IF NOT EXISTS projeto_42_db.modelo_veiculo (
  id_modelo_veiculo int (011) NOT NULL AUTO_INCREMENT,
  descricao_modelo_veiculo varchar (250) NOT NULL,
  dh_inclusao_modelo_veiculo datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_modelo_veiculo datetime NOT NULL DEFAULT NOW(),
  st_modelo_veiculo char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_modelo_veiculo),
  UNIQUE KEY id_modelo_veiculo_UNIQUE (id_modelo_veiculo)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table cor_veiculo
--
CREATE TABLE IF NOT EXISTS projeto_42_db.cor_veiculo (
  id_cor_veiculo int (011) NOT NULL AUTO_INCREMENT,
  descricao_cor_veiculo varchar (250) NOT NULL,
  dh_inclusao_cor_veiculo datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_cor_veiculo datetime NOT NULL DEFAULT NOW(),
  st_cor_veiculo char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_cor_veiculo),
  UNIQUE KEY id_cor_veiculo_UNIQUE (id_cor_veiculo)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table zona
--
CREATE TABLE IF NOT EXISTS projeto_42_db.zona (
  id_zona int (011) NOT NULL AUTO_INCREMENT,
  descricao_zona varchar (250) NOT NULL,
  longitude_zona char (015) NOT NULL,
  latitude_zona char (015) NOT NULL,
  morada_zona varchar (250) NOT NULL,
  horario_funcionamento_zona varchar (250) NOT NULL,
  path_imagem_zona varchar (250) NOT NULL,
  largura_imagem_zona int (005) NOT NULL,
  altura_imagem_zona int (005) NOT NULL,
  config_1_zona json NOT NULL,
  send_config_1_zona char (001) NOT NULL DEFAULT 'N',
  valor_minuto_zona float (015, 2) NOT NULL,
  valor_minimo_zona float (015, 2) NOT NULL,
  valor_maximo_zona float (015, 2) NOT NULL,
  fracao_zona int (002) NOT NULL,
  dh_inclusao_zona datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_zona datetime NOT NULL DEFAULT NOW(),
  st_zona char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_zona),
  UNIQUE KEY id_zona_UNIQUE (id_zona)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table tipo_sensor
--
CREATE TABLE IF NOT EXISTS projeto_42_db.tipo_sensor (
  id_tipo_sensor int (011) NOT NULL AUTO_INCREMENT,
  descricao_tipo_sensor varchar(250) NOT NULL,
  dh_inclusao_tipo_sensor datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_tipo_sensor datetime NOT NULL DEFAULT NOW(),
  st_tipo_sensor char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_tipo_sensor),
  UNIQUE KEY id_tipo_sensor_UNIQUE (id_tipo_sensor)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table tipo_vaga
--
CREATE TABLE IF NOT EXISTS projeto_42_db.tipo_vaga (
  id_tipo_vaga int (011) NOT NULL AUTO_INCREMENT,
  descricao_tipo_vaga varchar(250) NOT NULL,
  dh_inclusao_tipo_vaga datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_tipo_vaga datetime NOT NULL DEFAULT NOW(),
  st_tipo_vaga char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_tipo_vaga),
  UNIQUE KEY id_tipo_sensor_UNIQUE (id_tipo_vaga)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table vaga
--
CREATE TABLE IF NOT EXISTS projeto_42_db.vaga (
  id_zona int (011) NOT NULL,
  id_vaga int (011) NOT NULL,
  descricao_vaga varchar (250) NOT NULL,
  id_tipo_vaga int (011) NOT NULL DEFAULT 1,
  ponto_01_vaga int (005) NOT NULL,
  ponto_02_vaga int (005) NOT NULL,
  ponto_03_vaga int (005) NOT NULL,
  ponto_04_vaga int (005) NOT NULL,
  estado_vaga char (001) NOT NULL DEFAULT '0',
  dh_inclusao_vaga datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_vaga datetime NOT NULL DEFAULT NOW(),
  st_vaga char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_zona, id_vaga),
  UNIQUE KEY id_zona_id_vaga_UNIQUE (id_zona, id_vaga)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table sensor_presenca
--
CREATE TABLE IF NOT EXISTS projeto_42_db.sensor_presenca (
  id_sensor_presenca int (011) NOT NULL AUTO_INCREMENT,
  id_zona int (011) NOT NULL,
  id_vaga int (011) NOT NULL,
  descricao_sensor_presenca varchar (105) NOT NULL,
  id_tipo_sensor int (011) NOT NULL,
  ip_sensor_presenca varchar (045) NOT NULL,
  config_1_sensor_presenca json NOT NULL,
  send_config_1_sensor_presenca char (001) NOT NULL DEFAULT 'N',
  config_2_sensor_presenca json NOT NULL,
  send_config_2_sensor_presenca char (001) NOT NULL DEFAULT 'N',
  dh_inclusao_sensor_presenca datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_sensor_presenca datetime NOT NULL DEFAULT NOW(),
  st_sensor_presenca char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_sensor_presenca),
  UNIQUE KEY id_sensor_presenca_UNIQUE (id_sensor_presenca),
  UNIQUE KEY id_zona_id_vaga_UNIQUE (id_zona, id_vaga)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table sensor_camara
--
CREATE TABLE IF NOT EXISTS projeto_42_db.sensor_camara (
  id_zona int (011) NOT NULL,
  id_sensor_camara int (011) NOT NULL,
  descricao_sensor_camara varchar (105) NOT NULL,
  id_tipo_sensor int (011) NOT NULL,
  ip_sensor_camara varchar (045) NOT NULL,
  config_1_sensor_camara json NOT NULL,
  send_config_1_sensor_camara char (001) NOT NULL DEFAULT 'N',
  config_2_sensor_camara json NOT NULL,
  send_config_2_sensor_camara char (001) NOT NULL DEFAULT 'N',
  config_3_sensor_camara json NOT NULL,
  send_config_3_sensor_camara char (001) NOT NULL DEFAULT 'N',
  config_4_sensor_camara json NOT NULL,
  send_config_4_sensor_camara char (001) NOT NULL DEFAULT 'N',
  config_5_sensor_camara json NOT NULL,
  send_config_5_sensor_camara char (001) NOT NULL DEFAULT 'N',
  config_6_sensor_camara json NOT NULL,
  send_config_6_sensor_camara char (001) NOT NULL DEFAULT 'N',
  path_imagem_sensor_camara varchar (250) NOT NULL,
  largura_imagem_sensor_camara int (005) NOT NULL,
  altura_imagem_sensor_camara int (005) NOT NULL,
  dh_inclusao_sensor_camara datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_sensor_camara datetime NOT NULL DEFAULT NOW(),
  st_sensor_camara char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_zona, id_sensor_camara),
  UNIQUE KEY id_zona_id_sensor_camara_UNIQUE (id_zona, id_sensor_camara)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table sensor_camara_vaga
--
CREATE TABLE IF NOT EXISTS projeto_42_db.sensor_camara_vaga (
  id_zona int (011) NOT NULL,
  id_sensor_camara int (011) NOT NULL DEFAULT 0,
  id_vaga int (011) NOT NULL DEFAULT 0,
  dh_inclusao_sensor_camara_vaga datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_sensor_camara_vaga datetime NOT NULL DEFAULT NOW(),
  st_sensor_camara_vaga char(001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_zona, id_sensor_camara, id_vaga),
  UNIQUE KEY id_zona_id_sensor_camara_id_vaga_UNIQUE (id_zona, id_sensor_camara, id_vaga)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table sensor_camara_historico_delta
--
CREATE TABLE IF NOT EXISTS projeto_42_db.sensor_camara_historico_delta (
  id_zona int (011) NOT NULL,
  id_sensor_camara int (011) NOT NULL,
  dh_inclusao_historico_delta datetime NOT NULL DEFAULT NOW(),
  delta_list_historico_delta json NOT NULL,
  PRIMARY KEY (
    id_zona,
    id_sensor_camara,
    dh_inclusao_historico_delta
  ),
  UNIQUE KEY id_zona_id_sensor_camara_dh_inclusao_historico_delta_UNIQUE (
    id_zona,
    id_sensor_camara,
    dh_inclusao_historico_delta
  )
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table utilizador
--
CREATE TABLE IF NOT EXISTS projeto_42_db.utilizador (
  id_utilizador int (011) NOT NULL AUTO_INCREMENT,
  email_utilizador varchar (250) NOT NULL,
  password_utilizador varchar (250) NOT NULL,
  nome_utilizador varchar (250) NOT NULL,
  id_tipo_utilizador int (011) NOT NULL,
  necessidades_especiais char (001) NOT NULL DEFAULT 'N',
  morada_utilizador varchar (250) NOT NULL,
  nif_utilizador int (009) NOT NULL,
  contacto_utilizador int (020) NOT NULL,
  num_funcionario int (011) NOT NULL,
  saldo_utilizador float (015, 2) NOT NULL,
  dh_inclusao_utilizador datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_utilizador datetime NOT NULL DEFAULT NOW(),
  st_utilizador char (001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_utilizador),
  UNIQUE KEY id_utilizador_UNIQUE (id_utilizador),
  UNIQUE KEY email_utilizador_UNIQUE (email_utilizador)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table veiculo
--
CREATE TABLE IF NOT EXISTS projeto_42_db.veiculo (
  id_veiculo int (011) NOT NULL AUTO_INCREMENT,
  matricula_veiculo char(020) NOT NULL,
  id_tipo_veiculo int (011) NOT NULL,
  id_marca_veiculo int (011) NOT NULL,
  id_modelo_veiculo int (011) NOT NULL,
  id_cor_veiculo int (011) NOT NULL,
  dh_inclusao_veiculo datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_veiculo datetime NOT NULL DEFAULT NOW(),
  st_veiculo char(001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_veiculo),
  UNIQUE KEY id_veiculo_UNIQUE (id_veiculo)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table parqueamento
--
CREATE TABLE IF NOT EXISTS projeto_42_db.parqueamento (
  dh_inicio_parqueamento datetime NOT NULL DEFAULT NOW(),
  dh_final_parqueamento datetime NOT NULL DEFAULT NOW(),
  id_zona int (011) NOT NULL,
  id_vaga int (011) NOT NULL,
  id_utilizador int (011) NOT NULL,
  id_veiculo int (011) NOT NULL DEFAULT 0,
  valor_pagar float(015, 2) NOT NULL,
  PRIMARY KEY (dh_inicio_parqueamento),
  UNIQUE KEY all_unique (
    dh_inicio_parqueamento,
    id_zona,
    id_vaga,
    dh_final_parqueamento,
    id_utilizador,
    id_veiculo
  )
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Create table utilizador_veiculo
--
CREATE TABLE IF NOT EXISTS projeto_42_db.utilizador_veiculo (
  id_utilizador int (011) NOT NULL,
  id_veiculo int (011) NOT NULL DEFAULT 0,
  dh_inclusao_utilizador_veiculo datetime NOT NULL DEFAULT NOW(),
  dh_alteracao_utilizador_veiculo datetime NOT NULL DEFAULT NOW(),
  st_utilizador_veiculo char(001) NOT NULL DEFAULT 'P',
  PRIMARY KEY (id_utilizador, id_veiculo),
  UNIQUE KEY id_utilizador_id_veiculo_UNIQUE (id_utilizador, id_veiculo)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Constraints for dumped tables
--
--
-- Limitadores para a tabela vaga
--
ALTER TABLE
  projeto_42_db.vaga
ADD
  CONSTRAINT vaga_zona_fk FOREIGN KEY (id_zona) REFERENCES projeto_42_db.zona (id_zona),
ADD
  CONSTRAINT vaga_tipo_vaga_fk FOREIGN KEY (id_tipo_vaga) REFERENCES projeto_42_db.tipo_vaga (id_tipo_vaga);
--
  -- Limitadores para a tabela sensor_presenca
  --
ALTER TABLE
  projeto_42_db.sensor_presenca
ADD
  CONSTRAINT sensor_presenca_vaga_fk FOREIGN KEY (id_zona, id_vaga) REFERENCES projeto_42_db.vaga (id_zona, id_vaga),
ADD
  CONSTRAINT sensor_presenca_tipo_sensor_fk FOREIGN KEY (id_tipo_sensor) REFERENCES projeto_42_db.tipo_sensor (id_tipo_sensor);
--
  -- Limitadores para a tabela sensor_camara
  --
ALTER TABLE
  projeto_42_db.sensor_camara
ADD
  CONSTRAINT sensor_camara_zona_fk FOREIGN KEY (id_zona) REFERENCES projeto_42_db.zona (id_zona),
ADD
  CONSTRAINT sensor_camara_tipo_sensor_fk FOREIGN KEY (id_tipo_sensor) REFERENCES projeto_42_db.tipo_sensor (id_tipo_sensor);
--
  -- Limitadores para a tabela tipo_utilizador
  --
ALTER TABLE
  projeto_42_db.tipo_utilizador
ADD
  CONSTRAINT tipo_utilizador_nivel_acesso_fk FOREIGN KEY (id_nivel_acesso) REFERENCES projeto_42_db.nivel_acesso (id_nivel_acesso);
--
  -- Limitadores para a tabela utilizador
  --
ALTER TABLE
  projeto_42_db.utilizador
ADD
  CONSTRAINT utilizador_tipo_utilizador_fk FOREIGN KEY (id_tipo_utilizador) REFERENCES projeto_42_db.tipo_utilizador (id_tipo_utilizador);
--
  -- Limitadores para a tabela veiculo
  --
ALTER TABLE
  projeto_42_db.veiculo
ADD
  CONSTRAINT veiculo_tipo_veiculo_fk FOREIGN KEY (id_tipo_veiculo) REFERENCES projeto_42_db.tipo_veiculo (id_tipo_veiculo),
ADD
  CONSTRAINT veiculo_marca_veiculo_fk FOREIGN KEY (id_marca_veiculo) REFERENCES projeto_42_db.marca_veiculo (id_marca_veiculo),
ADD
  CONSTRAINT veiculo_modelo_veiculo_fk FOREIGN KEY (id_modelo_veiculo) REFERENCES projeto_42_db.modelo_veiculo (id_modelo_veiculo),
ADD
  CONSTRAINT veiculo_cor_veiculo_fk FOREIGN KEY (id_cor_veiculo) REFERENCES projeto_42_db.cor_veiculo (id_cor_veiculo);
--
  -- Limitadores para a tabela parqueamento
  --
ALTER TABLE
  projeto_42_db.parqueamento
ADD
  CONSTRAINT parqueamento_vaga_fk FOREIGN KEY (id_zona, id_vaga) REFERENCES projeto_42_db.vaga (id_zona, id_vaga),
ADD
  CONSTRAINT parqueamento_utilizador_fk FOREIGN KEY (id_utilizador) REFERENCES projeto_42_db.utilizador (id_utilizador),
ADD
  CONSTRAINT parqueamento_veiculo_fk FOREIGN KEY (id_veiculo) REFERENCES projeto_42_db.veiculo (id_veiculo);
--
  -- Limitadores para a tabela utilizador_veiculo
  --
ALTER TABLE
  projeto_42_db.utilizador_veiculo
ADD
  CONSTRAINT utilizador_veiculo_utilizador_fk FOREIGN KEY (id_utilizador) REFERENCES projeto_42_db.utilizador (id_utilizador),
ADD
  CONSTRAINT utilizador_veiculo_veiculo_fk FOREIGN KEY (id_veiculo) REFERENCES projeto_42_db.veiculo (id_veiculo);
--
  -- Limitadores para a tabela sensor_camara_vaga
  --
ALTER TABLE
  projeto_42_db.sensor_camara_vaga
ADD
  CONSTRAINT sensor_camara_vaga_zona_fk FOREIGN KEY (id_zona) REFERENCES projeto_42_db.zona (id_zona),
ADD
  CONSTRAINT sensor_camara_vaga_sensor_camara_fk FOREIGN KEY (id_zona, id_sensor_camara) REFERENCES projeto_42_db.sensor_camara (id_zona, id_sensor_camara);
--
  -- Limitadores para a tabela sensor_camara_historico_delta
  --
ALTER TABLE
  projeto_42_db.sensor_camara_historico_delta
ADD
  CONSTRAINT sensor_camara_historico_delta_sensor_camara_fk FOREIGN KEY (id_zona, id_sensor_camara) REFERENCES projeto_42_db.sensor_camara (id_zona, id_sensor_camara);
-- -----------------------------------------------------------------------------------
  --
  -- Initial Insert table nivel_acesso
  --
INSERT INTO
  projeto_42_db.nivel_acesso (descricao_nivel_acesso, st_nivel_acesso)
VALUES
  ('Nunhum acesso', 'A');
INSERT INTO
  projeto_42_db.nivel_acesso (descricao_nivel_acesso, st_nivel_acesso)
VALUES
  ('Acesso básico', 'A');
INSERT INTO
  projeto_42_db.nivel_acesso (descricao_nivel_acesso, st_nivel_acesso)
VALUES
  ('Acesso médio', 'A');
INSERT INTO
  projeto_42_db.nivel_acesso (descricao_nivel_acesso, st_nivel_acesso)
VALUES
  ('Acesso avançado', 'A');
--
  -- Initial Insert table tipo_utilizador
  --
INSERT INTO
  projeto_42_db.tipo_utilizador (
    descricao_tipo_utilizador,
    id_nivel_acesso,
    st_tipo_utilizador
  )
VALUES
  ('Utilizador - inicial (register)', 1, 'A');
INSERT INTO
  projeto_42_db.tipo_utilizador (
    descricao_tipo_utilizador,
    id_nivel_acesso,
    st_tipo_utilizador
  )
VALUES
  ('Utilizador - funcionario - básico', 2, 'A');
INSERT INTO
  projeto_42_db.tipo_utilizador (
    descricao_tipo_utilizador,
    id_nivel_acesso,
    st_tipo_utilizador
  )
VALUES
  ('Utilizador - funcionario - médio', 3, 'A');
INSERT INTO
  projeto_42_db.tipo_utilizador (
    descricao_tipo_utilizador,
    id_nivel_acesso,
    st_tipo_utilizador
  )
VALUES
  ('Utilizador - funcionario - avançado', 4, 'A');
INSERT INTO
  projeto_42_db.tipo_utilizador (
    descricao_tipo_utilizador,
    id_nivel_acesso,
    st_tipo_utilizador
  )
VALUES
  ('Utilizador - cliente - básico', 2, 'A');
INSERT INTO
  projeto_42_db.tipo_utilizador (
    descricao_tipo_utilizador,
    id_nivel_acesso,
    st_tipo_utilizador
  )
VALUES
  ('Utilizador - cliente - médio', 3, 'A');
INSERT INTO
  projeto_42_db.tipo_utilizador (
    descricao_tipo_utilizador,
    id_nivel_acesso,
    st_tipo_utilizador
  )
VALUES
  ('Utilizador - cliente - avançado', 4, 'A');
INSERT INTO
  projeto_42_db.tipo_utilizador (
    descricao_tipo_utilizador,
    id_nivel_acesso,
    st_tipo_utilizador
  )
VALUES
  (
    'Utilizador - cliente - Necessidades especiais',
    1,
    'A'
  );
--
  -- Initial Insert table tipo_sensor
  --
INSERT INTO
  projeto_42_db.tipo_sensor (descricao_tipo_sensor, st_tipo_sensor)
VALUES
  ('Camera IP com RASPBERRY', 'A');
INSERT INTO
  projeto_42_db.tipo_sensor (descricao_tipo_sensor, st_tipo_sensor)
VALUES
  ('Ultrasom com Arduino e LoRa', 'A');
--
  -- Initial Insert table tipo_vaga
  --
INSERT INTO
  projeto_42_db.tipo_vaga (descricao_tipo_vaga, st_tipo_vaga)
VALUES
  ('Normal', 'A');
INSERT INTO
  projeto_42_db.tipo_vaga (descricao_tipo_vaga, st_tipo_vaga)
VALUES
  ('Familia', 'A');
INSERT INTO
  projeto_42_db.tipo_vaga (descricao_tipo_vaga, st_tipo_vaga)
VALUES
  ('Necessidades Especiais', 'A');
INSERT INTO
  projeto_42_db.tipo_vaga (descricao_tipo_vaga, st_tipo_vaga)
VALUES
  ('Electrico', 'A');
INSERT INTO
  projeto_42_db.tipo_vaga (descricao_tipo_vaga, st_tipo_vaga)
VALUES
  ('Gas', 'A');
--
  -- Initial Insert table tipo_veiculo
  --
INSERT INTO
  projeto_42_db.tipo_veiculo (descricao_tipo_veiculo, st_tipo_veiculo)
VALUES
  (
    'Tipo generico - Veiculo ainda não cadastrado',
    'A'
  );
--
  -- Initial Insert table marca_veiculo
  --
INSERT INTO
  projeto_42_db.marca_veiculo (descricao_marca_veiculo, st_marca_veiculo)
VALUES
  (
    'Marca generica - Veiculo ainda não cadastrado',
    'A'
  );
--
  -- Initial Insert table modelo_veiculo
  --
INSERT INTO
  projeto_42_db.modelo_veiculo (descricao_modelo_veiculo, st_modelo_veiculo)
VALUES
  (
    'Modelo generico - Veiculo ainda não cadastrado',
    'A'
  );
--
  -- Initial Insert table cor_veiculo
  --
INSERT INTO
  projeto_42_db.cor_veiculo (descricao_cor_veiculo, st_cor_veiculo)
VALUES
  (
    'Cor generica - Veiculo ainda não cadastrado',
    'A'
  );
--
  -- Initial Insert table veiculo
  --
INSERT INTO
  projeto_42_db.veiculo (
    matricula_veiculo,
    id_tipo_veiculo,
    id_marca_veiculo,
    id_modelo_veiculo,
    id_cor_veiculo,
    dh_inclusao_veiculo,
    dh_alteracao_veiculo,
    st_veiculo
  )
VALUES
  (
    '00-00-00',
    '1',
    '1',
    '1',
    '1',
    '1800-01-01 00:00:00',
    '1800-01-01 00:00:00',
    'A'
  );
--
  -- Initial Insert table utilizador
  --
INSERT INTO
  projeto_42_db.utilizador (
    email_utilizador,
    password_utilizador,
    nome_utilizador,
    id_tipo_utilizador,
    morada_utilizador,
    nif_utilizador,
    contacto_utilizador,
    num_funcionario,
    dh_inclusao_utilizador,
    dh_alteracao_utilizador,
    st_utilizador
  )
VALUES
  (
    'temporario@temporario',
    'N/A',
    'Temporario para criar parqueamentos',
    '1',
    'N/A',
    '111111111',
    '111111111',
    '0',
    '1800-01-01 00:00:00',
    '1800-01-01 00:00:00',
    'X'
  );
