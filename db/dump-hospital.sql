-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: hospital
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `PER_CEDULA` bigint NOT NULL,
  `HOS_NOMBRE` varchar(50) DEFAULT NULL,
  `ADM_USUARIO` varchar(25) NOT NULL,
  `ADM_CONTRASENA` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ADM_CARGO` varchar(15) NOT NULL,
  PRIMARY KEY (`PER_CEDULA`),
  KEY `TRABAJA_FK` (`HOS_NOMBRE`),
  CONSTRAINT `FK_ADMINIST_ES2_PERSONA` FOREIGN KEY (`PER_CEDULA`) REFERENCES `persona` (`PER_CEDULA`),
  CONSTRAINT `FK_ADMINIST_TRABAJA_HOPITAL` FOREIGN KEY (`HOS_NOMBRE`) REFERENCES `hospital` (`HOS_NOMBRE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1717171717,'HOSPITAL','Jose','jose','ADMIN'),(1724591902,'ANDRADE MARIN','Dalton','dalton','ADMIN'),(1726252453,'HOSPITAL','Martin','mamedina13','GESTOR');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cama`
--

DROP TABLE IF EXISTS `cama`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cama` (
  `ID_CAMA` varchar(100) NOT NULL,
  `ESPE_NOMBRE` varchar(50) DEFAULT NULL,
  `HOS_NOMBRE` varchar(50) DEFAULT NULL,
  `CAM_ESTADO` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_CAMA`),
  KEY `TIENE_FK` (`ESPE_NOMBRE`),
  KEY `TIENE4_FK` (`HOS_NOMBRE`),
  CONSTRAINT `FK_CAMA_TIENE4_HOPITAL` FOREIGN KEY (`HOS_NOMBRE`) REFERENCES `hospital` (`HOS_NOMBRE`),
  CONSTRAINT `FK_CAMA_TIENE_ESPECIAL` FOREIGN KEY (`ESPE_NOMBRE`) REFERENCES `especialidad` (`ESPE_NOMBRE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cama`
--

LOCK TABLES `cama` WRITE;
/*!40000 ALTER TABLE `cama` DISABLE KEYS */;
INSERT INTO `cama` VALUES ('CAM1EMER','Emergencia','HOSPITAL','Ocupada');
/*!40000 ALTER TABLE `cama` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `derivan`
--

DROP TABLE IF EXISTS `derivan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `derivan` (
  `DEV_FECHA_ENTRADA` date DEFAULT NULL,
  `DEV_FECHA_SALIDA` date DEFAULT NULL,
  `DEV_ESTADO` text,
  `ID_CAMA` varchar(100) NOT NULL,
  `PER_CEDULA` bigint NOT NULL,
  PRIMARY KEY (`PER_CEDULA`,`ID_CAMA`),
  KEY `DERIVAN2_FK` (`PER_CEDULA`),
  KEY `DERIVAN_FK` (`ID_CAMA`),
  CONSTRAINT `FK_DERIVAN_DERIVAN2_PACIENTE` FOREIGN KEY (`PER_CEDULA`) REFERENCES `paciente` (`PER_CEDULA`),
  CONSTRAINT `FK_DERIVAN_DERIVAN_CAMA` FOREIGN KEY (`ID_CAMA`) REFERENCES `cama` (`ID_CAMA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `derivan`
--

LOCK TABLES `derivan` WRITE;
/*!40000 ALTER TABLE `derivan` DISABLE KEYS */;
INSERT INTO `derivan` VALUES ('2023-06-01',NULL,'Ta malito','CAM1EMER',1234567890),('2024-06-25','2024-06-25','Ta malito','CAM1EMER',1726252453);
/*!40000 ALTER TABLE `derivan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `ESPE_NOMBRE` varchar(50) NOT NULL,
  `ESPE_DESCRIPCION` varchar(50) NOT NULL,
  PRIMARY KEY (`ESPE_NOMBRE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES ('Emergencia','Sala de emergencia');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital`
--

DROP TABLE IF EXISTS `hospital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital` (
  `ID_ZONA` varchar(20) NOT NULL,
  `HOS_NOMBRE` varchar(50) NOT NULL,
  `HOS_TELEFONO` bigint NOT NULL,
  `HOS_CORREO` varchar(50) DEFAULT NULL,
  `HOS_SITIO_WEB` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`HOS_NOMBRE`),
  KEY `SITUA2_FK` (`ID_ZONA`),
  CONSTRAINT `FK_HOPITAL_SITUA2_ZONA` FOREIGN KEY (`ID_ZONA`) REFERENCES `zona` (`ID_ZONA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital`
--

LOCK TABLES `hospital` WRITE;
/*!40000 ALTER TABLE `hospital` DISABLE KEYS */;
INSERT INTO `hospital` VALUES ('MARINCENTRAL','ANDRADE MARIN',981473015,'andrademarin@gmail.com','www.andrademarin.com'),('ZON0','HOSPITAL',981473015,'hospital@gmail.com','www.hospital.com');
/*!40000 ALTER TABLE `hospital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `PER_CEDULA` bigint NOT NULL,
  `ID_ZONA` varchar(20) DEFAULT NULL,
  `PAC_HISTORIAL` text NOT NULL,
  PRIMARY KEY (`PER_CEDULA`),
  KEY `PROVIENE_FK` (`ID_ZONA`),
  CONSTRAINT `FK_PACIENTE_ES_PERSONA` FOREIGN KEY (`PER_CEDULA`) REFERENCES `persona` (`PER_CEDULA`),
  CONSTRAINT `FK_PACIENTE_PROVIENE_ZONA` FOREIGN KEY (`ID_ZONA`) REFERENCES `zona` (`ID_ZONA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (1234567890,'MARINCENTRAL','ta muy malito'),(1726252453,'MARINCENTRAL','ta malito');
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `PER_CEDULA` bigint NOT NULL,
  `PER_NOMBRES` varchar(50) NOT NULL,
  `PER_APELLIDOS` varchar(50) NOT NULL,
  `PER_TELEFONO` bigint DEFAULT NULL,
  `PER_CORREO` varchar(25) DEFAULT NULL,
  `PER_GENERO` varchar(9) NOT NULL,
  PRIMARY KEY (`PER_CEDULA`),
  CONSTRAINT `CKC_PER_GENERO_PERSONA` CHECK ((`PER_GENERO` in (_utf8mb4'Masculino',_utf8mb4'Femenino')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1234567890,'Lola','Lola',123456789,'lola@gmail.com','Masculino'),(1717171717,'Jose','Perez',981473030,'joseperez@espe.edu.ec','Masculino'),(1724591902,'Dalton','Arevalo',981473030,'djarevalo13@espe.edu.ec','Masculino'),(1726252453,'Martin','Medina',981473015,'mamedina13@espe.edu.ec','Masculino');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zona`
--

DROP TABLE IF EXISTS `zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zona` (
  `ID_ZONA` varchar(20) NOT NULL,
  `ZONA_CALLE_PRINCIPAL` varchar(50) NOT NULL,
  `ZONA_CALLE_SECUNDARIA` varchar(50) DEFAULT NULL,
  `ZONA_REFERENCIA` varchar(50) NOT NULL,
  `ZONA_PARROQUIA` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_ZONA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zona`
--

LOCK TABLES `zona` WRITE;
/*!40000 ALTER TABLE `zona` DISABLE KEYS */;
INSERT INTO `zona` VALUES ('MARINCENTRAL','Av. America','Calle 2','A 20 minutos de la U Central','Marin'),('ZON0','CALLE1','CALLE2','ZONA','PARROQUIA');
/*!40000 ALTER TABLE `zona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hospital'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-17 11:24:55
