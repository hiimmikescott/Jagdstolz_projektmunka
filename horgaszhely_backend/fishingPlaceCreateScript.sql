
CREATE DATABASE IF NOT EXISTS FishingPlace;
USE FishingPlace;


CREATE TABLE IF NOT EXISTS users (
    id MEDIUMINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profilepicture VARCHAR(60),
    validated BOOLEAN DEFAULT FALSE,
    birthdate DATETIME,
    userLevel TINYINT DEFAULT 5,
    FOREIGN KEY (userLevel) REFERENCES userLevels (userLevelId)
);

CREATE TABLE IF NOT EXISTS fishingPlace (
    id MEDIUMINT PRIMARY KEY AUTO_INCREMENT,
    reservable BOOLEAN DEFAULT TRUE,
    pier BOOLEAN DEFAULT TRUE,
    firepit BOOLEAN DEFAULT TRUE,
    shelter BOOLEAN DEFAULT TRUE,
    averageRating TINYINT DEFAULT 5,
    description VARCHAR(400),
    longitude MEDIUMINT NOT NULL,
    latitude MEDIUMINT NOT NULL
);

CREATE TABLE IF NOT EXISTS sockets (
    id MEDIUMINT PRIMARY KEY AUTO_INCREMENT,
    user_id MEDIUMINT NOT NULL,
    place_id MEDIUMINT NOT NULL,
    reservationStart DATETIME NOT NULL,
    reservationEnd DATETIME NOT NULL,
    actualRate TINYINT,
    FOREIGN KEY (placeId) REFERENCES fishingPlace (placeId),
    FOREIGN KEY (userId) REFERENCES users (userId)
);



