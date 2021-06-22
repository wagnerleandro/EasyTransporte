SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db` DEFAULT CHARACTER SET utf8 ;
USE `db` ;

-- -----------------------------------------------------
-- Table `db`.`Veiculo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`Veiculo` (
  `idVeiculo` INT NOT NULL AUTO_INCREMENT,
  `placa` VARCHAR(7) NOT NULL,
  `chassi` INT NOT NULL,
  `modelo` VARCHAR(45) NOT NULL,
  `kmAtual` VARCHAR(45) NOT NULL,
  `combustivel` VARCHAR(45) NOT NULL,
  `cor` VARCHAR(45) NOT NULL,
  `ano` DATE NOT NULL,
  `dataAquisicao` DATE NOT NULL,
  `renavam` VARCHAR(45) NOT NULL,
  `status` CHAR(1) NULL,
  `capacidade` DECIMAL NOT NULL,
  PRIMARY KEY (`idVeiculo`, `placa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`Motorista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`Motorista` (
  `idCadastro` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `rg` VARCHAR(9) NOT NULL,
  `cnh` VARCHAR(11) NOT NULL,
  `status` CHAR(1) NULL,
  PRIMARY KEY (`idCadastro`, `cpf`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  UNIQUE INDEX `idCadastro_UNIQUE` (`idCadastro` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`ClienteFisica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`ClienteFisica` (
  `nome` VARCHAR(45) NOT NULL,
  `rg` VARCHAR(9) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`cpf`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`ClienteJuridica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`ClienteJuridica` (
  `nome` VARCHAR(45) NOT NULL,
  `razaoSocial` VARCHAR(45) NOT NULL,
  `cnpj` VARCHAR(14) NOT NULL,
  `inscricao` VARCHAR(20) NULL,
  PRIMARY KEY (`cnpj`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`Cliente` (
  `idCliente` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `tipo` CHAR(1) NOT NULL,
  `PessoaFisica_cpf` VARCHAR(11) NOT NULL,
  `PessoaJuridica_cnpj` VARCHAR(11) NOT NULL,
  `status` CHAR(1) NULL,
  `dataCadastro` DATE NOT NULL,
  PRIMARY KEY (`idCliente`, `PessoaFisica_cpf`, `PessoaJuridica_cnpj`),
  INDEX `fk_Cliente_PessoaFisica1_idx` (`PessoaFisica_cpf` ASC) VISIBLE,
  INDEX `fk_Cliente_PessoaJuridica1_idx` (`PessoaJuridica_cnpj` ASC) VISIBLE,
  CONSTRAINT `fk_Cliente_PessoaFisica1`
    FOREIGN KEY (`PessoaFisica_cpf`)
    REFERENCES `db`.`ClienteFisica` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cliente_PessoaJuridica1`
    FOREIGN KEY (`PessoaJuridica_cnpj`)
    REFERENCES `db`.`ClienteJuridica` (`cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`table1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`table1` (
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`Endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`Endereco` (
  `idEndereco` INT NOT NULL,
  `rua` VARCHAR(45) NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `cep` VARCHAR(9) NOT NULL,
  `complemento` VARCHAR(45) NULL,
  `Cliente_idCliente` INT NOT NULL,
  `uf` VARCHAR(2) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEndereco`, `Cliente_idCliente`),
  INDEX `fk_Endereco_Cliente1_idx` (`Cliente_idCliente` ASC) VISIBLE,
  CONSTRAINT `fk_Endereco_Cliente1`
    FOREIGN KEY (`Cliente_idCliente`)
    REFERENCES `db`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`Usuario` (
  `idUsuario` INT NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `status` CHAR(1) NULL,
  `nivel` INT(1) NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`Contato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`Contato` (
  `Telefone` VARCHAR(10) NULL,
  `Celular` VARCHAR(11) NULL,
  `email` VARCHAR(45) NULL,
  `Cliente_idCliente` INT NOT NULL,
  `Cliente_PessoaFisica_cpf` VARCHAR(11) NOT NULL,
  `Cliente_PessoaJuridica_cnpj` VARCHAR(11) NOT NULL,
  INDEX `fk_Contato_Cliente1_idx` (`Cliente_idCliente` ASC, `Cliente_PessoaFisica_cpf` ASC, `Cliente_PessoaJuridica_cnpj` ASC) VISIBLE,
  CONSTRAINT `fk_Contato_Cliente1`
    FOREIGN KEY (`Cliente_idCliente` , `Cliente_PessoaFisica_cpf` , `Cliente_PessoaJuridica_cnpj`)
    REFERENCES `db`.`Cliente` (`idCliente` , `PessoaFisica_cpf` , `PessoaJuridica_cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`Pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`Pedido` (
  `idPedido` INT NOT NULL,
  `status` CHAR(1) NULL,
  `numero` INT NOT NULL,
  `Veiculo_idVeiculo` INT NOT NULL,
  `Veiculo_placa` VARCHAR(7) NOT NULL,
  `Veiculo_idVeiculo1` INT NOT NULL,
  `Veiculo_placa1` VARCHAR(7) NOT NULL,
  `dataCancelamento` DATE NULL,
  `valorTotal` FLOAT NULL,
  `dataEmissao` DATE NULL,
  `dataAgendamento` DATE NULL,
  `situacaoPedido` VARCHAR(45) NULL,
  `Motorista_idCadastro` INT NOT NULL,
  `Motorista_cpf` VARCHAR(11) NOT NULL,
  `comprovante` LONGBLOB NULL,
  PRIMARY KEY (`idPedido`, `Veiculo_idVeiculo`, `Veiculo_placa`, `Veiculo_idVeiculo1`, `Veiculo_placa1`, `Motorista_idCadastro`, `Motorista_cpf`),
  INDEX `fk_Pedido_Veiculo1_idx` (`Veiculo_idVeiculo1` ASC, `Veiculo_placa1` ASC) VISIBLE,
  INDEX `fk_Pedido_Motorista1_idx` (`Motorista_idCadastro` ASC, `Motorista_cpf` ASC) VISIBLE,
  CONSTRAINT `fk_Pedido_Veiculo1`
    FOREIGN KEY (`Veiculo_idVeiculo1` , `Veiculo_placa1`)
    REFERENCES `db`.`Veiculo` (`idVeiculo` , `placa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pedido_Motorista1`
    FOREIGN KEY (`Motorista_idCadastro` , `Motorista_cpf`)
    REFERENCES `db`.`Motorista` (`idCadastro` , `cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`ItensPedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`ItensPedido` (
  `Pedido_idPedido` INT NOT NULL,
  `Pedido_Veiculo_idVeiculo` INT NOT NULL,
  `Pedido_Veiculo_placa` VARCHAR(7) NOT NULL,
  `Cliente_idCliente` INT NOT NULL,
  `Cliente_PessoaFisica_cpf` VARCHAR(11) NOT NULL,
  `Cliente_PessoaJuridica_cnpj` VARCHAR(11) NOT NULL,
  `volumes` INT NOT NULL,
  `peso` FLOAT NOT NULL,
  `valorTotal` FLOAT NULL,
  PRIMARY KEY (`Pedido_idPedido`, `Pedido_Veiculo_idVeiculo`, `Pedido_Veiculo_placa`, `Cliente_idCliente`, `Cliente_PessoaFisica_cpf`, `Cliente_PessoaJuridica_cnpj`),
  INDEX `fk_Pedido_has_Cliente_Cliente1_idx` (`Cliente_idCliente` ASC, `Cliente_PessoaFisica_cpf` ASC, `Cliente_PessoaJuridica_cnpj` ASC) VISIBLE,
  INDEX `fk_Pedido_has_Cliente_Pedido1_idx` (`Pedido_idPedido` ASC, `Pedido_Veiculo_idVeiculo` ASC, `Pedido_Veiculo_placa` ASC) VISIBLE,
  CONSTRAINT `fk_Pedido_has_Cliente_Pedido1`
    FOREIGN KEY (`Pedido_idPedido` , `Pedido_Veiculo_idVeiculo` , `Pedido_Veiculo_placa`)
    REFERENCES `db`.`Pedido` (`idPedido` , `Veiculo_idVeiculo` , `Veiculo_placa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pedido_has_Cliente_Cliente1`
    FOREIGN KEY (`Cliente_idCliente` , `Cliente_PessoaFisica_cpf` , `Cliente_PessoaJuridica_cnpj`)
    REFERENCES `db`.`Cliente` (`idCliente` , `PessoaFisica_cpf` , `PessoaJuridica_cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`Origem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`Origem` (
  `idOrigem` INT NOT NULL,
  `rua` VARCHAR(45) NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `cep` VARCHAR(9) NOT NULL,
  `complemento` VARCHAR(45) NULL,
  `Pedido_idPedido` INT NOT NULL,
  `Pedido_Veiculo_idVeiculo` INT NOT NULL,
  `Pedido_Veiculo_placa` VARCHAR(7) NOT NULL,
  `Pedido_Veiculo_idVeiculo1` INT NOT NULL,
  `Pedido_Veiculo_placa1` VARCHAR(7) NOT NULL,
  `Pedido_Motorista_idCadastro` INT NOT NULL,
  `Pedido_Motorista_cpf` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`idOrigem`, `Pedido_idPedido`, `Pedido_Veiculo_idVeiculo`, `Pedido_Veiculo_placa`, `Pedido_Veiculo_idVeiculo1`, `Pedido_Veiculo_placa1`, `Pedido_Motorista_idCadastro`, `Pedido_Motorista_cpf`),
  INDEX `fk_PedidoOrigem_Pedido1_idx` (`Pedido_idPedido` ASC, `Pedido_Veiculo_idVeiculo` ASC, `Pedido_Veiculo_placa` ASC, `Pedido_Veiculo_idVeiculo1` ASC, `Pedido_Veiculo_placa1` ASC, `Pedido_Motorista_idCadastro` ASC, `Pedido_Motorista_cpf` ASC) VISIBLE,
  CONSTRAINT `fk_PedidoOrigem_Pedido1`
    FOREIGN KEY (`Pedido_idPedido` , `Pedido_Veiculo_idVeiculo` , `Pedido_Veiculo_placa` , `Pedido_Veiculo_idVeiculo1` , `Pedido_Veiculo_placa1` , `Pedido_Motorista_idCadastro` , `Pedido_Motorista_cpf`)
    REFERENCES `db`.`Pedido` (`idPedido` , `Veiculo_idVeiculo` , `Veiculo_placa` , `Veiculo_idVeiculo1` , `Veiculo_placa1` , `Motorista_idCadastro` , `Motorista_cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`Destino`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`Destino` (
  `idDestino` INT NOT NULL,
  `rua` VARCHAR(45) NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `cep` VARCHAR(9) NOT NULL,
  `complemento` VARCHAR(45) NULL,
  `Pedido_idPedido` INT NOT NULL,
  `Pedido_Veiculo_idVeiculo` INT NOT NULL,
  `Pedido_Veiculo_placa` VARCHAR(7) NOT NULL,
  `Pedido_Veiculo_idVeiculo1` INT NOT NULL,
  `Pedido_Veiculo_placa1` VARCHAR(7) NOT NULL,
  `Pedido_Motorista_idCadastro` INT NOT NULL,
  `Pedido_Motorista_cpf` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`idDestino`, `Pedido_idPedido`, `Pedido_Veiculo_idVeiculo`, `Pedido_Veiculo_placa`, `Pedido_Veiculo_idVeiculo1`, `Pedido_Veiculo_placa1`, `Pedido_Motorista_idCadastro`, `Pedido_Motorista_cpf`),
  INDEX `fk_Destino_Pedido1_idx` (`Pedido_idPedido` ASC, `Pedido_Veiculo_idVeiculo` ASC, `Pedido_Veiculo_placa` ASC, `Pedido_Veiculo_idVeiculo1` ASC, `Pedido_Veiculo_placa1` ASC, `Pedido_Motorista_idCadastro` ASC, `Pedido_Motorista_cpf` ASC) VISIBLE,
  CONSTRAINT `fk_Destino_Pedido1`
    FOREIGN KEY (`Pedido_idPedido` , `Pedido_Veiculo_idVeiculo` , `Pedido_Veiculo_placa` , `Pedido_Veiculo_idVeiculo1` , `Pedido_Veiculo_placa1` , `Pedido_Motorista_idCadastro` , `Pedido_Motorista_cpf`)
    REFERENCES `db`.`Pedido` (`idPedido` , `Veiculo_idVeiculo` , `Veiculo_placa` , `Veiculo_idVeiculo1` , `Veiculo_placa1` , `Motorista_idCadastro` , `Motorista_cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
