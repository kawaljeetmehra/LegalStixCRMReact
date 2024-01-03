-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: leads_demo
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

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
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `RecordID` int(11) NOT NULL AUTO_INCREMENT,
  `screen` varchar(100) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `last_login` datetime DEFAULT current_timestamp(),
  `action` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`RecordID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (1,'/leads','http://localhost:3000/leads','Kawal','2024-01-03 10:37:15','','{\"latitude\":29.701673,\"longitude\":76.9999134}','::1','2024-01-03 05:07:15'),(2,'/upload','http://localhost:3000/upload','Kawal','2024-01-03 10:37:52','','{\"latitude\":29.701673,\"longitude\":76.9999134}','::1','2024-01-03 05:07:52'),(3,'/users','http://localhost:3000/users','Kawal','2024-01-03 10:37:53','','{\"latitude\":29.701673,\"longitude\":76.9999134}','::1','2024-01-03 05:07:53'),(4,'/logs','http://localhost:3000/logs','Kawal','2024-01-03 10:37:54','','{\"latitude\":29.701673,\"longitude\":76.9999134}','::1','2024-01-03 05:07:54'),(5,'/tasks','http://localhost:3000/tasks','Kawal','2024-01-03 10:37:59','','{\"latitude\":29.701673,\"longitude\":76.9999134}','::1','2024-01-03 05:07:59');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-03 11:25:54
