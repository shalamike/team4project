DROP TABLE IF EXISTS albums CASCADE;
DROP TABLE IF EXISTS artists CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS playlists CASCADE;
DROP TABLE IF EXISTS tracks CASCADE;

CREATE TABLE artists(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE playlists(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    description varchar(255),
    artwork varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE genres(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    description varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE albums(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    artist_id int,
    genre_id int,
    cover varchar(100),
    PRIMARY KEY (id),
    FOREIGN KEY (artist_id) REFERENCES artists(id),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE tracks(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    album_id int,
    playlist_id int,
    duration int,
    lyrics varchar(255),
    PRIMARY KEY (id),
    FOREIGN KEY (album_id) REFERENCES albums(id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(id)
);