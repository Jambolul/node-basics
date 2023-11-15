DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

-- Create tables
CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Likes (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    media_item_id INT,
    timestamp TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (media_item_id) REFERENCES MediaItems(media_id)
);

CREATE TABLE Following (
    following_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    follower_id INT,
    followed_user_id INT,
    timestamp TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES Users(user_id),
    FOREIGN KEY (followed_user_id) REFERENCES Users(user_id)
);


-- add users
INSERT INTO Users 
  VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users
  VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);

-- add media items
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink 1', null, 305, 'image/jpeg', null), 
         ('ffd89.jpg', 887574, 'Favorite drink 5', null, 305, 'image/jpeg', null);

INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
  VALUES ('ffd810.jpg', 75746, 'Favorite drink', null, 305, 'image/jpeg', null),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 260, 'image/jpeg', null),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg', null);

-- add likes
INSERT INTO Likes (user_id, media_item_id, timestamp) 
VALUES (260, 2, '2023-11-08 12:00:00'),
       (305, 1, '2023-11-08 12:30:00'), 
       (305, 3, '2023-11-08 13:15:00');

-- add following
INSERT INTO Following (follower_id, followed_user_id, timestamp) 
VALUES
  (260, 305, '2023-11-08 14:00:00'),  
  (305, 260, '2023-11-08 14:30:00'),  
  (260, 305, '2023-11-08 15:15:00');




-- select filename, title, username from mediaitems, users WHERE users.user_id=mediaitems.user_id;

-- select filename, title, username from mediaitems, users;

-- select media_id, filename, title, description from mediaitems order by media_id asc limit 2;

-- how to dump script to create database:
-- mysqldump -u root -pRommikola77 mediashare
-- mysqldump mediashare > dumped_db.sql
-- mysqldump mediashare < dumped_db.sql
