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
-- Table structure for table `leads`
--

DROP TABLE IF EXISTS `leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leads` (
  `RecordID` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(10) DEFAULT 0,
  `first_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `gender` int(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phoneNo` bigint(20) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `father_phoneNo` bigint(20) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `mother_phoneNo` varchar(20) DEFAULT NULL,
  `aadhar_number` bigint(20) DEFAULT NULL,
  `pan_number` bigint(20) DEFAULT NULL,
  `country_id` bigint(20) DEFAULT NULL,
  `state_id` bigint(20) DEFAULT NULL,
  `city_id` bigint(20) DEFAULT NULL,
  `category_id` bigint(100) DEFAULT NULL,
  `stage` varchar(100) DEFAULT NULL,
  `eligibility` int(10) DEFAULT NULL,
  `book_counselling` int(10) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `remarks` longtext DEFAULT '[" "]',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `created_by` varchar(100) DEFAULT current_timestamp(),
  `updated_by` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `enquiry_date` date DEFAULT NULL,
  `IsIntrested` varchar(45) DEFAULT NULL,
  `follow_up` date DEFAULT NULL,
  PRIMARY KEY (`RecordID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leads`
--

LOCK TABLES `leads` WRITE;
/*!40000 ALTER TABLE `leads` DISABLE KEYS */;
INSERT INTO `leads` VALUES (1,0,'Isha',NULL,NULL,0,'',6200759972,'LLB/4th Year','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Whats App',NULL,'[\"AskedCourse. Detail/For Bihar\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(2,0,'Upasna',NULL,NULL,0,'',8920081995,'BA.LLB 4th Year','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Whats App',NULL,'[\"didn\'t join the zoom class, is busy in exams\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(3,0,'Akshay',NULL,NULL,1,'',9541203360,'llb Hons','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Whats App',NULL,'[\"he is interested in Haryana Judiciary Course , did not attended classes- can join class on weekends../ he will in class sat\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(4,0,'subramanyam',NULL,NULL,1,'',7330628781,'llb 2nd','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'website',NULL,'[\"Live class link is to be send via email\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(5,0,'Ritika',NULL,NULL,0,'',9588770596,'LLB Final','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Whats App',NULL,'[\"Zoom Link Shared /she entered in Live class/asked for Exp, Can join in group\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(6,0,'kamla devi',NULL,NULL,0,'',8295631829,'law graduate','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Whats App',NULL,'[\"is available to join live class after 15th Dec\'23\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(7,0,'shivangi sharma',NULL,NULL,0,'',8295409208,'litigation','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Whats App',NULL,'[\"Clat Pg- Details of the course are shared via whatsapp\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(8,0,'Rishiba',NULL,NULL,0,'',8949657976,'Law','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Whats App',NULL,'[\"MP ,Rajasthan ,Purchased Mock Test\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(9,0,'Walter',NULL,NULL,1,'',9034362767,'','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Whats App',NULL,'[\"Details sent on whatsapp\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(10,0,'Jagjit Baweja',NULL,NULL,1,'',9815021963,'','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Whatsapp',NULL,'[\"Known to Anjali ..She bought\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(11,0,'Ayush judiciary',NULL,NULL,1,'',9302459261,'8th sem ballb','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Rakesh WA',NULL,'[\"sent detsils\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(12,0,'Divya',NULL,NULL,0,'',9871803443,'BA 3rd','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Whats App',NULL,'[\"she will go through the course details\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(13,0,'Dev',NULL,NULL,1,'',9784946490,'ba,llb','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Demo Query',NULL,'[\"live class link sent\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(14,0,'ANKIT KUMAR',NULL,NULL,1,'',8887974950,'','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Demo Query',NULL,'[\"details sent via whatsapp - live class link will be sent\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(15,0,'Chander Dev',NULL,NULL,1,'',9467851286,'practicing Advocate','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Demo Query',NULL,'[\"course regarding drafting- link of website is sent\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(16,0,'Vikas',NULL,NULL,1,'',9560990731,'2nd year llb','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Demo Query',NULL,'[\"details send on whatsap- live class link to be sent tomorrow\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(17,0,'DIVANSHU',NULL,NULL,1,'',6239850218,'','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Website Lead',NULL,'[null]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(18,0,'MAYANK SAGAR',NULL,NULL,1,'',9431377362,'Final Year','',0,'','',0,0,NULL,NULL,NULL,16,'1',2,NULL,'Facebook',NULL,'[\"Push for CLAT PG foundation course\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(19,0,'adv Akshay',NULL,NULL,1,'',8303507101,'','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Facebook',NULL,'[\"Interested For Judiciary\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(20,0,'Shivam Kumar',NULL,NULL,1,'',7310239312,'','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Facebook',NULL,'[\"Interested For Judiciary\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(21,0,'Rajdeep Rana',NULL,NULL,1,'',9548823915,'','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Facebook',NULL,'[\"Interested For Judiciary\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(22,0,'subramanyam',NULL,NULL,1,'',7330628781,'','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Facebook',NULL,'[\"Interested For Judiciary\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(23,0,'gourav choudhary',NULL,NULL,1,'',9424420071,'','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Facebook',NULL,'[\"Interested For Judiciary\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(24,0,'User',NULL,NULL,1,'',9170217694,'','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Facebook',NULL,'[\"Interested For Judiciary\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(25,0,'Akshay Dhage',NULL,NULL,1,'',7517631915,'','',0,'','',0,0,NULL,NULL,NULL,21,'1',2,NULL,'Facebook',NULL,'[\"Interested for Clat PG\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(26,0,'adv dolly',NULL,NULL,0,'',8984009562,'','',0,'','',0,0,NULL,NULL,NULL,21,'1',2,NULL,'Facebook',NULL,'[\"want a live session 1:1 @8:30\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(27,0,'Archana singh',NULL,NULL,0,'',9535985292,'','',0,'','',0,0,NULL,NULL,NULL,16,'1',2,NULL,'Facebook',NULL,'[\"Interested in UG\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(28,0,'Adv Dheera',NULL,NULL,1,'',7753033322,'','',0,'','',0,0,NULL,NULL,NULL,22,'1',2,NULL,'Facebook',NULL,'[\"interested in 1:1 session for contract drafting\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(29,0,'Adv Akash',NULL,NULL,1,'',9936913785,'','',0,'','',0,0,NULL,NULL,NULL,22,'1',2,NULL,'Facebook',NULL,'[\"interested in 1:1 session for contract drafting\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(30,0,'Vinit Jha',NULL,NULL,1,'',9650294097,'','',0,'','',0,0,NULL,NULL,NULL,22,'1',2,NULL,'Facebook',NULL,'[\"interested in 1:1 session for contract drafting\"]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(31,0,'Adv Divanyshu',NULL,NULL,1,'',9986000311,'','',0,'','',0,0,NULL,NULL,NULL,0,'1',2,NULL,'Facebook',NULL,'[null]','2024-01-02 17:16:19','2024-01-02 17:16:19','2024-01-02 17:16:19',NULL,NULL,NULL,'0000-00-00','',NULL),(32,0,'Abhishek',NULL,NULL,1,'',8795274519,'','',0,'','',0,0,NULL,NULL,NULL,0,'1',2,NULL,'Facebook',NULL,'[null]','2024-01-02 17:16:20','2024-01-02 17:16:20','2024-01-02 17:16:20',NULL,NULL,NULL,'0000-00-00','',NULL),(33,0,'Anup Shirvastra',NULL,NULL,1,'',8779424204,'','',0,'','',0,0,NULL,NULL,NULL,0,'1',2,NULL,'Facebook',NULL,'[null]','2024-01-02 17:16:20','2024-01-02 17:16:20','2024-01-02 17:16:20',NULL,NULL,NULL,'0000-00-00','',NULL),(34,0,'Pardeep',NULL,NULL,1,'',9700067807,'','',0,'','',0,0,NULL,NULL,NULL,0,'1',2,NULL,'Facebook',NULL,'[null]','2024-01-02 17:16:20','2024-01-02 17:16:20','2024-01-02 17:16:20',NULL,NULL,NULL,'0000-00-00','',NULL),(35,0,'Pritish Narayan',NULL,NULL,1,'',9953096300,'','',0,'','',0,0,NULL,NULL,NULL,21,'1',2,NULL,'Facebook',NULL,'[null]','2024-01-02 17:16:20','2024-01-02 17:16:20','2024-01-02 17:16:20',NULL,NULL,NULL,'0000-00-00','',NULL),(36,0,'Sana',NULL,NULL,0,'',8196083575,'','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Facebook',NULL,'[null]','2024-01-02 17:16:20','2024-01-02 17:16:20','2024-01-02 17:16:20',NULL,NULL,NULL,'0000-00-00','',NULL),(37,0,'Nadeem',NULL,NULL,1,'',8493955198,'','',0,'','',0,0,NULL,NULL,NULL,15,'1',2,NULL,'Facebook',NULL,'[null]','2024-01-02 17:16:20','2024-01-02 17:16:20','2024-01-02 17:16:20',NULL,NULL,NULL,'0000-00-00','',NULL),(38,0,'Bijay kumaar',NULL,NULL,1,'',8102808241,'','',0,'','',0,0,NULL,NULL,NULL,16,'1',2,NULL,'Facebook',NULL,'[\"CLAT UG course for daughter\"]','2024-01-02 17:16:20','2024-01-02 17:16:20','2024-01-02 17:16:20',NULL,NULL,NULL,'0000-00-00','',NULL),(39,0,'Ashoka bajpai',NULL,NULL,1,'',7905683228,'','',0,'','',0,0,NULL,NULL,NULL,0,'',2,NULL,'',NULL,'[null]','2024-01-02 17:16:20','2024-01-02 17:16:20','2024-01-02 17:16:20',NULL,NULL,NULL,'0000-00-00','',NULL),(40,0,'Disha tyagi',NULL,NULL,1,'',7503220412,'','',0,'','',0,0,NULL,NULL,NULL,0,'',2,NULL,'',NULL,'[null]','2024-01-02 17:16:20','2024-01-02 17:16:20','2024-01-02 17:16:20',NULL,NULL,NULL,'0000-00-00','',NULL);
/*!40000 ALTER TABLE `leads` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-03 11:25:53
