CREATE DATABASE  IF NOT EXISTS `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `groupomania`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `postId` int NOT NULL AUTO_INCREMENT,
  `dateStamp` datetime NOT NULL,
  `gifUrl` varchar(100) NOT NULL,
  `userId` int NOT NULL,
  `title` varchar(100) NOT NULL,
  PRIMARY KEY (`postId`),
  KEY `FK_post_user_idx` (`userId`),
  CONSTRAINT `FK_post_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (17,'2020-09-04 15:22:14','http://localhost:3000/images/imagetest071599312134125.gif',19,'Moi quand je vois un nouveau framework'),(21,'2020-09-04 17:29:49','http://localhost:3000/images/imagetest21599319789642.gif',18,'Le Cobol'),(22,'2020-09-08 20:43:02','http://localhost:3000/images/imagetest51599590581396.gif',19,'Moi quand j\'arrive à centrer une image !'),(24,'2020-09-11 16:49:15','http://localhost:3000/images/imagetest61599922155035.gif',28,'Quand je fais un git push et que j\'ai un message d\'erreur !'),(38,'2020-09-17 07:29:00','http://localhost:3000/images/imagetest1600406940551.gif',18,'L\'origine des REGEX !'),(43,'2020-09-18 16:15:54','http://localhost:3000/images/imagetest31600524954144.gif',29,'Quand mon code marche mais que je ne comprends pas pourquoi'),(44,'2020-09-18 16:18:43','http://localhost:3000/images/imagetest101600525122991.gif',19,'Le weekend approche !'),(45,'2020-09-21 16:19:56','http://localhost:3000/images/imagetest111600525196297.gif',28,'Code HTTP 500'),(46,'2020-09-21 16:24:25','http://localhost:3000/images/imagetest91600525465354.gif',18,'Quand tu montres ton 1er site vitrine à un dev Senior'),(47,'2020-09-22 16:27:38','http://localhost:3000/images/imagetest41600525658383.gif',29,'La 1ère fois que tu vois les promesses'),(48,'2020-09-23 16:29:27','http://localhost:3000/images/imagetest81600525767269.gif',28,'Quand tu cherches une solution en JS vanilla et qu\'on te répond en JQuery');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-19 17:03:31
