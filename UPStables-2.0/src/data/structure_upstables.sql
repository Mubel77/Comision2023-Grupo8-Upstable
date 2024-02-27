-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: upstables
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
-- Table structure for table `carritos_compras`
--

DROP TABLE IF EXISTS `carritos_compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos_compras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  UNIQUE KEY `producto_id` (`producto_id`),
  CONSTRAINT `carritos_compras_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `carritos_compras_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos_compras`
--

LOCK TABLES `carritos_compras` WRITE;
/*!40000 ALTER TABLE `carritos_compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos_compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'ups','2024-02-25 16:02:24','2024-02-25 16:02:24'),(2,'estabilizadores','2024-02-25 16:02:24','2024-02-25 16:02:24');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones`
--

DROP TABLE IF EXISTS `direcciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_calle` varchar(100) NOT NULL,
  `numero_calle` int NOT NULL,
  `codigo_postal` int DEFAULT NULL,
  `localidad` varchar(100) DEFAULT NULL,
  `provincia` varchar(100) DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `direcciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
INSERT INTO `direcciones` VALUES (1,'Mendoza',212,NULL,'Alejandro Korn','Buenos Aires',1,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(2,'Salta',313,NULL,'Lanus','Buenos Aires',2,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(3,'Santiago del Estero',3000,1663,'San Miguel','Buenos Aires',3,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(4,'Jujuy',2300,NULL,'Guaymallen','Mendoza',4,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(5,'Rio Cuarto',850,NULL,'Parana','Entre Rios',5,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(6,'Mariano Moreno',1030,NULL,'ParanPachecoa','Buenos Aires',5,'2024-02-25 16:02:24','2024-02-25 16:02:24');
/*!40000 ALTER TABLE `direcciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  `id_producto` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (1,'Upstable-imagen1703818680750.webp','/images/products',1,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(2,'Upstable-imagen1703818680751.webp','/images/products',1,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(3,'Upstable-imagen1703821420749.jpg','/images/products',2,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(4,'Upstable-imagen1703819713305.jpg','/images/products',4,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(5,'Upstable-imagen1703822241352.jpg','/images/products',5,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(6,'Upstable-imagen1703822738920.webp','/images/products',6,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(7,'Upstable-imagen1703822738922.webp','/images/products',6,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(8,'Upstable-imagen1703822738922.webp','/images/products',6,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(9,'Upstable-imagen1703823083944.webp','/images/products',7,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(10,'Upstable-imagen1703823083946.webp','/images/products',7,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(11,'Upstable-imagen1703823083946.webp','/images/products',7,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(12,'Upstable-imagen1703823429436.webp','/images/products',8,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(13,'Upstable-imagen1703823429437.webp','/images/products',8,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(14,'Upstable-imagen1703823429437.webp','/images/products',8,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(15,'Upstable-imagen1703823712053.webp','/images/products',9,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(16,'Upstable-imagen1703823712054.webp','/images/products',9,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(17,'Upstable-imagen1703823712055.webp','/images/products',9,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(18,'Upstable-imagen1703824081383.webp','/images/products',10,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(19,'Upstable-imagen1703824081384.webp','/images/products',10,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(20,'Upstable-imagen1703824529019.webp','/images/products',11,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(21,'Upstable-imagen1703824529020.webp','/images/products',11,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(22,'Upstable-imagen1703825258170.webp','/images/products',12,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(23,'Upstable-imagen1703825258171.webp','/images/products',12,'2024-02-25 16:02:24','2024-02-25 16:02:24');
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Lyonn','2024-02-25 16:02:24','2024-02-25 16:02:24'),(2,'APC','2024-02-25 16:02:24','2024-02-25 16:02:24'),(3,'Eaton','2024-02-25 16:02:24','2024-02-25 16:02:24'),(4,'Athom','2024-02-25 16:02:24','2024-02-25 16:02:24'),(5,'TRV','2024-02-25 16:02:24','2024-02-25 16:02:24'),(6,'Forza','2024-02-25 16:02:24','2024-02-25 16:02:24'),(7,'TRV','2024-02-25 16:02:24','2024-02-25 16:02:24');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `modelo` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `descuento` decimal(10,0) DEFAULT NULL,
  `stock` int NOT NULL,
  `potencia` int NOT NULL,
  `tomas` int NOT NULL,
  `id_marcas` int NOT NULL,
  `id_categorias` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_marcas` (`id_marcas`),
  KEY `id_categorias` (`id_categorias`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_marcas`) REFERENCES `marcas` (`id`),
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_categorias`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Ctb-800','Un estabilizador que garantiza un suministro de energía constante y seguro. Visor LCD para monitorear fácilmente el estado del equipo y el voltaje en tiempo real. Su diseño compacto y moderno se adapta a cualquier espacio de trabajo o hogar.',50000,9,5,500,4,1,1,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(2,'SRV-1KI-AR','Un estabilizador que garantiza un suministro de energía constante y seguro. Visor LCD para monitorear fácilmente el estado del equipo y el voltaje en tiempo real. Su diseño compacto y moderno se adapta a cualquier espacio de trabajo o hogar.',115900,15,10,1000,8,2,1,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(3,'Kaise','Un estabilizador que garantiza un suministro de energía constante y seguro. Visor LCD para monitorear fácilmente el estado del equipo y el voltaje en tiempo real. Su diseño compacto y moderno se adapta a cualquier espacio de trabajo o hogar.',80000,NULL,8,1000,6,2,1,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(4,'CTB-500','Un estabilizador que garantiza un suministro de energía constante y seguro. Visor LCD para monitorear fácilmente el estado del equipo y el voltaje en tiempo real. Su diseño compacto y moderno se adapta a cualquier espacio de trabajo o hogar.',65000,NULL,5,500,3,1,1,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(5,'Kaise','Un estabilizador que garantiza un suministro de energía constante y seguro. Visor LCD para monitorear fácilmente el estado del equipo y el voltaje en tiempo real. Su diseño compacto y moderno se adapta a cualquier espacio de trabajo o hogar.',155000,5,15,1500,6,3,1,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(6,'TCA-2000NV','Gracias a este aparato, la protección contra daños o pérdida de información estará garantizada. Su función principal consiste en corregir las variaciones de voltaje existentes en la línea eléctrica.',6500000,6,8,2000,8,1,2,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(7,'R1000@','Gracias a este aparato, la protección contra daños o pérdida de información estará garantizada. Su función principal consiste en corregir las variaciones de voltaje existentes en la línea eléctrica.',63200,12,5,1000,4,4,2,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(8,'Powersafe-USB','Gracias a este aparato, la protección contra daños o pérdida de información estará garantizada. Su función principal consiste en corregir las variaciones de voltaje existentes en la línea eléctrica.',60000,10,10,2000,6,5,2,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(9,'Microvolt H 2000','Gracias a este aparato, la protección contra daños o pérdida de información estará garantizada. Su función principal consiste en corregir las variaciones de voltaje existentes en la línea eléctrica.',50000,15,5,2000,8,5,2,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(10,'Sl-802UL-A-Smart','Gracias a este aparato, la protección contra daños o pérdida de información estará garantizada. Su función principal consiste en corregir las variaciones de voltaje existentes en la línea eléctrica.',193000,12,10,1000,4,6,2,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(11,'H1000@','Gracias a este aparato, la protección contra daños o pérdida de información estará garantizada. Su función principal consiste en corregir las variaciones de voltaje existentes en la línea eléctrica.',55500,5,10,1000,4,4,2,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(12,'SRC-1KI-AR','Un estabilizador que garantiza un suministro de energía constante y seguro. Visor LCD para monitorear fácilmente el estado del equipo y el voltaje en tiempo real. Su diseño compacto y moderno se adapta a cualquier espacio de trabajo o hogar.',850000,12,3,1000,4,2,1,'2024-02-25 16:02:24','2024-02-25 16:02:24');
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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'cliente','2024-02-25 16:02:24','2024-02-25 16:02:24'),(2,'supervisor','2024-02-25 16:02:24','2024-02-25 16:02:24'),(3,'vendedor','2024-02-25 16:02:24','2024-02-25 16:02:24'),(4,'proveedor','2024-02-25 16:02:24','2024-02-25 16:02:24'),(5,'distribuidor','2024-02-25 16:02:24','2024-02-25 16:02:24');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20240217210611-create-rol.js'),('20240217210612-create-usuario.js'),('20240217210613-create-direcciones.js'),('20240217210614-create-telefonos.js'),('20240217210615-create-categoria.js'),('20240217210616-create-marca.js'),('20240217210619-create-producto.js'),('20240217210620-create-imagen.js'),('20240217210621-create-carrito-compra.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefonos`
--

DROP TABLE IF EXISTS `telefonos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefonos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prefijo` int DEFAULT NULL,
  `numero` int DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `telefonos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefonos`
--

LOCK TABLES `telefonos` WRITE;
/*!40000 ALTER TABLE `telefonos` DISABLE KEYS */;
INSERT INTO `telefonos` VALUES (1,11,12345678,2,'2024-02-25 16:02:24','2024-02-25 16:02:24'),(2,11,87654321,3,'2024-02-25 16:02:24','2024-02-25 16:02:24');
/*!40000 ALTER TABLE `telefonos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rol_id` int NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fecha_nacimiento` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Mauricio','Cuellar','mau@cuellar.com','Casa-123',2,'/images/users/no-user-img.jpg','2024-02-25 16:02:24','2024-02-25 16:02:24','1995-01-03 03:00:00'),(2,'Santiago','Barrios','santi@barrios.com','Casa-123',3,'/images/users/no-user-img.jpg','2024-02-25 16:02:24','2024-02-25 16:02:24','1990-01-02 02:00:00'),(3,'Emiliano','Ferreyra','emi@ferreyra.com','Casa-123',3,'/images/users/no-user-img.jpg','2024-02-25 16:02:24','2024-02-25 16:02:24','1989-11-15 02:00:00'),(4,'Jose','Perez','jose@perez.com','Casa-123',1,'/images/users/no-user-img.jpg','2024-02-25 16:02:24','2024-02-25 16:02:24','2000-01-06 03:00:00'),(5,'Maria','Solis','maru@solis.com','Casa-123',1,'/images/users/no-user-img.jpg','2024-02-25 16:02:24','2024-02-25 16:02:24','2005-01-08 03:00:00');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-25 16:25:22
