-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema REDE_LIBRAS
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema REDE_LIBRAS
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `REDE_LIBRAS` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `REDE_LIBRAS` ;

-- -----------------------------------------------------
-- Table `REDE_LIBRAS`.`USERS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `REDE_LIBRAS`.`USERS` ;

CREATE TABLE IF NOT EXISTS `REDE_LIBRAS`.`USERS` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(250) NOT NULL,
  `USER` VARCHAR(45) NOT NULL,
  `PASSWORD` VARCHAR(250) NOT NULL,
  `MAIL` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `REDE_LIBRAS`.`REGIONS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `REDE_LIBRAS`.`REGIONS` ;

CREATE TABLE IF NOT EXISTS `REDE_LIBRAS`.`REGIONS` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `REDE_LIBRAS`.`SIGNS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `REDE_LIBRAS`.`SIGNS` ;

CREATE TABLE IF NOT EXISTS `REDE_LIBRAS`.`SIGNS` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `SIGN` VARCHAR(250) NOT NULL,
  `EXAMPLE` TEXT NOT NULL,
  `IS_GENERAL` TINYINT NOT NULL,
  `LIKE` BIGINT NOT NULL DEFAULT 0,
  `DISLIKE` BIGINT NOT NULL DEFAULT 0,
  `FILE_NAME` VARCHAR(250) NOT NULL,
  `VIDEO_PATH` VARCHAR(250) NOT NULL,
  `ID_REGION` BIGINT NULL,
  PRIMARY KEY (`ID`),
  INDEX `FK_SIGNS_REGIONS_IDX` (`ID_REGION` ASC) VISIBLE,
  CONSTRAINT `FK_SIGNS_REGIONS`
    FOREIGN KEY (`ID_REGION`)
    REFERENCES `REDE_LIBRAS`.`REGIONS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `REDE_LIBRAS`.`CATEGORIES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `REDE_LIBRAS`.`CATEGORIES` ;

CREATE TABLE IF NOT EXISTS `REDE_LIBRAS`.`CATEGORIES` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(250) NOT NULL,
  `DESCRIPTION` TEXT NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `REDE_LIBRAS`.`SIGNS_CATEGORIES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `REDE_LIBRAS`.`SIGNS_CATEGORIES` ;

CREATE TABLE IF NOT EXISTS `REDE_LIBRAS`.`SIGNS_CATEGORIES` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `ID_SIGN` BIGINT NOT NULL,
  `ID_CATEGORY` BIGINT NOT NULL,
  INDEX `FK_CATEGORY_SIGN_IDX` (`ID_CATEGORY` ASC) VISIBLE,
  INDEX `FK_SIGN_CATEGORY_IDX` (`ID_SIGN` ASC) VISIBLE,
  PRIMARY KEY (`ID`),
  CONSTRAINT `FK_SIGN_CATEGORY`
    FOREIGN KEY (`ID_SIGN`)
    REFERENCES `REDE_LIBRAS`.`SIGNS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_CATEGORY_SIGN`
    FOREIGN KEY (`ID_CATEGORY`)
    REFERENCES `REDE_LIBRAS`.`CATEGORIES` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `REDE_LIBRAS`.`STATES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `REDE_LIBRAS`.`STATES` ;

CREATE TABLE IF NOT EXISTS `REDE_LIBRAS`.`STATES` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(250) NOT NULL,
  `ACRONYM` VARCHAR(2) NOT NULL,
  `ID_REGION` BIGINT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `FK_STATES_REGIONS_IDX` (`ID_REGION` ASC) VISIBLE,
  CONSTRAINT `FK_STATES_REGIONS`
    FOREIGN KEY (`ID_REGION`)
    REFERENCES `REDE_LIBRAS`.`REGIONS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `REDE_LIBRAS`.`SIGNS_STATES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `REDE_LIBRAS`.`SIGNS_STATES` ;

CREATE TABLE IF NOT EXISTS `REDE_LIBRAS`.`SIGNS_STATES` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `ID_STATE` BIGINT NOT NULL,
  `ID_SIGN` BIGINT NOT NULL,
  INDEX `FK_SIGNS_STATES_IDX` (`ID_SIGN` ASC) VISIBLE,
  INDEX `FK_STATES_SIGNS_INDEX` (`ID_STATE` ASC) INVISIBLE,
  PRIMARY KEY (`ID`),
  CONSTRAINT `FK_STATES_SIGNS`
    FOREIGN KEY (`ID_STATE`)
    REFERENCES `REDE_LIBRAS`.`STATES` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_SIGNS_STATES`
    FOREIGN KEY (`ID_SIGN`)
    REFERENCES `REDE_LIBRAS`.`SIGNS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `REDE_LIBRAS`.`USERS`
-- -----------------------------------------------------
START TRANSACTION;
USE `REDE_LIBRAS`;
INSERT INTO `REDE_LIBRAS`.`USERS` (`ID`, `NAME`, `USER`, `PASSWORD`, `MAIL`) VALUES (1, 'Lucas Vieira de Miranda', 'lucasvm', 'e10adc3949ba59abbe56e057f20f883e', 'lucasvieirademiranda@gmail.com');
INSERT INTO `REDE_LIBRAS`.`USERS` (`ID`, `NAME`, `USER`, `PASSWORD`, `MAIL`) VALUES (2, 'Janice Gonçalves Temoteo Marques', 'janicegtm', 'e10adc3949ba59abbe56e057f20f883e', 'janicetemoteo@gmail.com');
INSERT INTO `REDE_LIBRAS`.`USERS` (`ID`, `NAME`, `USER`, `PASSWORD`, `MAIL`) VALUES (3, 'José Mário de Martino', 'josemm', 'e10adc3949ba59abbe56e057f20f883e', 'jmdemartino@gmail.com');
INSERT INTO `REDE_LIBRAS`.`USERS` (`ID`, `NAME`, `USER`, `PASSWORD`, `MAIL`) VALUES (4, 'Ivani Rodrigues Silva', 'ivanirs', 'e10adc3949ba59abbe56e057f20f883e', 'ivani.rodrigues.silva@gmail.com');

COMMIT;


-- -----------------------------------------------------
-- Data for table `REDE_LIBRAS`.`REGIONS`
-- -----------------------------------------------------
START TRANSACTION;
USE `REDE_LIBRAS`;
INSERT INTO `REDE_LIBRAS`.`REGIONS` (`ID`, `NAME`) VALUES (1, 'Centro-Oeste');
INSERT INTO `REDE_LIBRAS`.`REGIONS` (`ID`, `NAME`) VALUES (2, 'Nordeste');
INSERT INTO `REDE_LIBRAS`.`REGIONS` (`ID`, `NAME`) VALUES (3, 'Norte');
INSERT INTO `REDE_LIBRAS`.`REGIONS` (`ID`, `NAME`) VALUES (4, 'Sudeste');
INSERT INTO `REDE_LIBRAS`.`REGIONS` (`ID`, `NAME`) VALUES (5, 'Sul');

COMMIT;


-- -----------------------------------------------------
-- Data for table `REDE_LIBRAS`.`CATEGORIES`
-- -----------------------------------------------------
START TRANSACTION;
USE `REDE_LIBRAS`;
INSERT INTO `REDE_LIBRAS`.`CATEGORIES` (`ID`, `NAME`, `DESCRIPTION`) VALUES (1, 'Especial', 'Busca por imagens');

COMMIT;


-- -----------------------------------------------------
-- Data for table `REDE_LIBRAS`.`STATES`
-- -----------------------------------------------------
START TRANSACTION;
USE `REDE_LIBRAS`;
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (1, 'Acre', 'AC', 3);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (2, 'Alagoas', 'AL', 2);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (3, 'Amapá', 'AP', 3);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (4, 'Amazonas', 'AM', 3);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (5, 'Bahia', 'BA', 2);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (6, 'Ceará', 'CE', 2);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (7, 'Distrito Federal', 'DF', 1);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (8, 'Espírito Santo', 'ES', 4);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (9, 'Goiás', 'GO', 1);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (10, 'Maranhão', 'MA', 2);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (11, 'Mato Grosso', 'MT', 1);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (12, 'Mato Grosso do Sul', 'MS', 1);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (13, 'Minas Gerais', 'MG', 4);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (14, 'Pará', 'PA', 3);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (15, 'Paraíba', 'PB', 2);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (16, 'Paraná', 'PR', 5);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (17, 'Pernambuco', 'PE', 2);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (18, 'Piauí', 'PI', 2);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (19, 'Rio de Janeiro', 'RJ', 4);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (20, 'Rio Grande do Norte', 'RN', 2);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (21, 'Rio Grande do Sul', 'RS', 5);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (22, 'Rondônia', 'RO', 3);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (23, 'Roraima', 'RR', 3);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (24, 'Santa Catarina', 'SC', 5);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (25, 'São Paulo', 'SP', 4);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (26, 'Sergipe', 'SE', 2);
INSERT INTO `REDE_LIBRAS`.`STATES` (`ID`, `NAME`, `ACRONYM`, `ID_REGION`) VALUES (27, 'Tocantins', 'TO', 3);

COMMIT;

