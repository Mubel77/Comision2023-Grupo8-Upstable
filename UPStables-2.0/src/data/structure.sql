-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: upstables_db
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones`
--

DROP TABLE IF EXISTS `direcciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre_calle` varchar(100) NOT NULL,
  `numero_calle` int NOT NULL,
  `codigo_postal` int DEFAULT NULL,
  `localidad` varchar(100) DEFAULT NULL,
  `provincia` varchar(100) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL,
  `fecha_actualizacion` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `direcciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones_has_usuarios`
--

DROP TABLE IF EXISTS `direcciones_has_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones_has_usuarios` (
  `clientes_id_cliente` int unsigned NOT NULL,
  `direcciones_id_direccion` int unsigned NOT NULL,
  UNIQUE KEY `clientes_id_cliente_UNIQUE` (`clientes_id_cliente`),
  UNIQUE KEY `direcciones_id_direccion_UNIQUE` (`direcciones_id_direccion`),
  KEY `fk_direcciones_has_clientes_clientes1_idx` (`clientes_id_cliente`),
  KEY `fk_direcciones_has_clientes_direcciones1_idx` (`direcciones_id_direccion`),
  CONSTRAINT `fk_direcciones_has_clientes_clientes1` FOREIGN KEY (`clientes_id_cliente`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_direcciones_has_clientes_direcciones1` FOREIGN KEY (`direcciones_id_direccion`) REFERENCES `direcciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones_has_usuarios`
--

LOCK TABLES `direcciones_has_usuarios` WRITE;
/*!40000 ALTER TABLE `direcciones_has_usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `direcciones_has_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturas` (
  `id` int NOT NULL,
  `numero` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha_emision` timestamp NOT NULL,
  `monto_total` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nro_orden_venta_UNIQUE` (`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  `productos_idproductos` int unsigned NOT NULL,
  `fecha_registro` timestamp NOT NULL,
  `fecha_actualizacion` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `productos_idproductos_UNIQUE` (`productos_idproductos`),
  KEY `fk_imagenes_productos1_idx` (`productos_idproductos`),
  CONSTRAINT `fk_imagenes_productos1` FOREIGN KEY (`productos_idproductos`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idmarcas_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `potencias`
--

DROP TABLE IF EXISTS `potencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `potencias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `potencia` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_potencia_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `potencias`
--

LOCK TABLES `potencias` WRITE;
/*!40000 ALTER TABLE `potencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `potencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int unsigned NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `precio` decimal(8,2) unsigned NOT NULL,
  `descuento` decimal(2,1) unsigned DEFAULT NULL,
  `stock` int NOT NULL,
  `id_potencia` int unsigned NOT NULL,
  `id_tomas` int unsigned NOT NULL,
  `id_marcas` int unsigned NOT NULL,
  `id_categorias` int unsigned NOT NULL,
  `fecha_registro` timestamp NOT NULL,
  `fecha_actualizacion` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idproductos_UNIQUE` (`id`),
  UNIQUE KEY `id_potencia_UNIQUE` (`id_potencia`),
  UNIQUE KEY `id_tomas_UNIQUE` (`id_tomas`),
  UNIQUE KEY `id_marcas_UNIQUE` (`id_marcas`),
  UNIQUE KEY `id_categorias_UNIQUE` (`id_categorias`),
  KEY `fk_productos_potencias1_idx` (`id_potencia`),
  KEY `fk_productos_tomas1_idx` (`id_tomas`),
  KEY `fk_productos_marcas1_idx` (`id_marcas`),
  KEY `fk_productos_categorias1_idx` (`id_categorias`),
  CONSTRAINT `fk_productos_categorias1` FOREIGN KEY (`id_categorias`) REFERENCES `categorias` (`id`),
  CONSTRAINT `fk_productos_marcas1` FOREIGN KEY (`id_marcas`) REFERENCES `marcas` (`id`),
  CONSTRAINT `fk_productos_potencias1` FOREIGN KEY (`id_potencia`) REFERENCES `potencias` (`id`),
  CONSTRAINT `fk_productos_tomas1` FOREIGN KEY (`id_tomas`) REFERENCES `tomas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefonos`
--

DROP TABLE IF EXISTS `telefonos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefonos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `prefijo` int unsigned NOT NULL,
  `numero` int unsigned NOT NULL,
  `fecha_creacion` timestamp NOT NULL,
  `fecha_actualizacion` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_telefonos_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefonos`
--

LOCK TABLES `telefonos` WRITE;
/*!40000 ALTER TABLE `telefonos` DISABLE KEYS */;
/*!40000 ALTER TABLE `telefonos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tomas`
--

DROP TABLE IF EXISTS `tomas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tomas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `cantidad` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_tomas_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tomas`
--

LOCK TABLES `tomas` WRITE;
/*!40000 ALTER TABLE `tomas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tomas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `apellido` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` int unsigned NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `imagenes_id` int unsigned NOT NULL,
  `roles_id` int NOT NULL,
  `fecha_registro` timestamp NOT NULL,
  `actualizacion_registro` timestamp NOT NULL,
  `domicilio` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_cliente_UNIQUE` (`email`),
  UNIQUE KEY `telefono_UNIQUE` (`telefono`),
  UNIQUE KEY `imagenes_id_UNIQUE` (`imagenes_id`),
  UNIQUE KEY `roles_id_UNIQUE` (`roles_id`),
  UNIQUE KEY `domicilio_UNIQUE` (`domicilio`),
  KEY `fk_usuarios_imagenes1_idx` (`imagenes_id`),
  KEY `fk_usuarios_roles1_idx` (`roles_id`),
  KEY `fk_usuarios_telefonos_idx` (`telefono`),
  KEY `fk_usuarios_domicilios_idx` (`domicilio`),
  CONSTRAINT `fk_usuarios_domicilios` FOREIGN KEY (`domicilio`) REFERENCES `direcciones` (`id`),
  CONSTRAINT `fk_usuarios_imagenes1` FOREIGN KEY (`imagenes_id`) REFERENCES `imagenes` (`id`),
  CONSTRAINT `fk_usuarios_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `fk_usuarios_telefonos` FOREIGN KEY (`telefono`) REFERENCES `telefonos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_has_telefonos`
--

DROP TABLE IF EXISTS `usuarios_has_telefonos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_has_telefonos` (
  `usuarios_id` int unsigned NOT NULL,
  `telefonos_id` int unsigned NOT NULL,
  UNIQUE KEY `telefonos_id_UNIQUE` (`telefonos_id`),
  UNIQUE KEY `usuarios_id_UNIQUE` (`usuarios_id`),
  KEY `fk_clientes_has_telefonos_usuarios1_idx` (`usuarios_id`),
  KEY `fk_clientes_has_telefonos_telefonos1_idx` (`telefonos_id`),
  CONSTRAINT `fk_clientes_has_telefonos_telefonos1` FOREIGN KEY (`telefonos_id`) REFERENCES `telefonos` (`id`),
  CONSTRAINT `fk_clientes_has_telefonos_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_has_telefonos`
--

LOCK TABLES `usuarios_has_telefonos` WRITE;
/*!40000 ALTER TABLE `usuarios_has_telefonos` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios_has_telefonos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 21:43:49
