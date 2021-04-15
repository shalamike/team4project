DROP TABLE IF EXISTS album CASCADE;
DROP TABLE IF EXISTS artists CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS playlists CASCADE;
DROP TABLE IF EXISTS tracks CASCADE;

CREATE TABLE artists(
    id long NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE playlists(
    id long NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    description varchar(255),
    artwork varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE genres(
    id long NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    description varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE albums(
    id long NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    artist_id long,
    genre_id long,
    cover varchar(100),
    PRIMARY KEY (id),
    FOREIGN KEY (artist_id) REFERENCES artists(id),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE tracks(
    id long NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    album_id long,
    playlist_id long,
    duration int,
    lyrics varchar(255),
    PRIMARY KEY (id),
    FOREIGN KEY (album_id) REFERENCES albums(id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(id)
);