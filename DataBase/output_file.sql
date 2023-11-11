-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: workflow
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `node_table`
--

DROP TABLE IF EXISTS `node_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `node_table` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `Content` varchar(500) DEFAULT NULL,
  `Status` varchar(20) NOT NULL,
  `workflow_Id` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `workflow_Id` (`workflow_Id`),
  CONSTRAINT `node_table_ibfk_1` FOREIGN KEY (`workflow_Id`) REFERENCES `workflow_table` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `node_table`
--

LOCK TABLES `node_table` WRITE;
/*!40000 ALTER TABLE `node_table` DISABLE KEYS */;
INSERT INTO `node_table` VALUES (1,'Task1','Create Login And Register','Completed',1),(2,'Task2','Work Flow Page','Pending',1),(3,'Task3','Work Flow Page','Pending',1),(4,'Task4','Work Flow Page','Completed',1),(5,'Task1','Work Flow Page','Completed',4),(6,'Task2','Assignment','Completed',4);
/*!40000 ALTER TABLE `node_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'Ankit Kumar','ankit7860kumar@gmail.com','Ankit@12345'),(6,'kanhaiya','gmail@gmail.com','Kan1234@12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_table`
--

DROP TABLE IF EXISTS `workflow_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workflow_table` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `WorkflowName` varchar(30) NOT NULL,
  `Status` varchar(30) DEFAULT NULL,
  `user_Id` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `user_Id` (`user_Id`),
  CONSTRAINT `workflow_table_ibfk_1` FOREIGN KEY (`user_Id`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_table`
--

LOCK TABLES `workflow_table` WRITE;
/*!40000 ALTER TABLE `workflow_table` DISABLE KEYS */;
INSERT INTO `workflow_table` VALUES (1,'WORKFLOW1','Pending',5),(3,'WORKFLOW3','Completed',5),(4,'Programming','Pending',6),(5,'WORKFLOW4','Completed',5),(6,'WORKFLOW5','Completed',5),(7,'WORKFLOW6','Pending',5);
/*!40000 ALTER TABLE `workflow_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-11 21:09:03
