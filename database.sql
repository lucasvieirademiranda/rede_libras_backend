-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema FN468_LIBRAS
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema FN468_LIBRAS
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `FN468_LIBRAS` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `FN468_LIBRAS` ;

-- -----------------------------------------------------
-- Table `FN468_LIBRAS`.`USERS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FN468_LIBRAS`.`USERS` ;

CREATE TABLE IF NOT EXISTS `FN468_LIBRAS`.`USERS` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(250) NOT NULL,
  `USER` VARCHAR(45) NOT NULL,
  `PASSWORD` VARCHAR(250) NOT NULL,
  `MAIL` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FN468_LIBRAS`.`SIGNS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FN468_LIBRAS`.`SIGNS` ;

CREATE TABLE IF NOT EXISTS `FN468_LIBRAS`.`SIGNS` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `SIGN` VARCHAR(250) NOT NULL,
  `COMMENTS` TEXT NOT NULL,
  `FILE_NAME` VARCHAR(250) NOT NULL,
  `VIDEO_PATH` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FN468_LIBRAS`.`CATEGORIES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FN468_LIBRAS`.`CATEGORIES` ;

CREATE TABLE IF NOT EXISTS `FN468_LIBRAS`.`CATEGORIES` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(250) NOT NULL,
  `DESCRIPTION` TEXT NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FN468_LIBRAS`.`SIGNS_CATEGORIES`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FN468_LIBRAS`.`SIGNS_CATEGORIES` ;

CREATE TABLE IF NOT EXISTS `FN468_LIBRAS`.`SIGNS_CATEGORIES` (
  `ID` BIGINT NOT NULL,
  `ID_SIGN` BIGINT NOT NULL,
  `ID_CATEGORY` BIGINT NOT NULL,
  INDEX `FK_CATEGORY_SIGN_IDX` (`ID_CATEGORY` ASC) VISIBLE,
  INDEX `FK_SIGN_CATEGORY_IDX` (`ID_SIGN` ASC) VISIBLE,
  PRIMARY KEY (`ID`),
  CONSTRAINT `FK_SIGN_CATEGORY`
    FOREIGN KEY (`ID_SIGN`)
    REFERENCES `FN468_LIBRAS`.`SIGNS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_CATEGORY_SIGN`
    FOREIGN KEY (`ID_CATEGORY`)
    REFERENCES `FN468_LIBRAS`.`CATEGORIES` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `FN468_LIBRAS`.`USERS`
-- -----------------------------------------------------
START TRANSACTION;
USE `FN468_LIBRAS`;
INSERT INTO `FN468_LIBRAS`.`USERS` (`ID`, `NAME`, `USER`, `PASSWORD`, `MAIL`) VALUES (1, 'Lucas Vieira de Miranda', 'lucasvm', 'e10adc3949ba59abbe56e057f20f883e', 'lucasvieirademiranda@gmail.com');
INSERT INTO `FN468_LIBRAS`.`USERS` (`ID`, `NAME`, `USER`, `PASSWORD`, `MAIL`) VALUES (2, 'Janice Gonçalves Temoteo Marques', 'janicegtm', 'e10adc3949ba59abbe56e057f20f883e', 'janicetemoteo@gmail.com');

COMMIT;

