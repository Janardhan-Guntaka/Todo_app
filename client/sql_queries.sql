create database todoapp;

CREATE DATABASE

create table todos(
 id VARCHAR(255) PRIMARY KEY,
 user_email VARCHAR(255),
 title VARCHAR(30),
 progress INT,
 date DATE NOT NULL DEFAULT CURRENT_DATE
);

create table users(
email VARCHAR(255) PRIMARY KEY,
 hashed_password VARCHAR(255));

