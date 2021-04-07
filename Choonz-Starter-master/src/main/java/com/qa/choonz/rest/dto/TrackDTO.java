package com.qa.choonz.rest.dto;

import java.util.Objects;

public class TrackDTO {

    private long id;
    private String name;
    private AlbumDTO album;
    private PlaylistDTO playlist;
    private int duration;
    private String lyrics;

    public TrackDTO() {
        super();
    }

    public TrackDTO(long id, String name, AlbumDTO album, PlaylistDTO playlist, int duration, String lyrics) {
        this.id = id;
        this.name = name;
        this.album = album;
        this.playlist = playlist;
        this.duration = duration;
        this.lyrics = lyrics;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AlbumDTO getAlbum() {
        return album;
    }

    public void setAlbum(AlbumDTO album) {
        this.album = album;
    }

    public PlaylistDTO getPlaylist() {
        return playlist;
    }

    public void setPlaylist(PlaylistDTO playlist) {
        this.playlist = playlist;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    @Override
    public String toString() {
        return "TrackDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", album=" + album +
                ", playlist=" + playlist +
                ", duration=" + duration +
                ", lyrics='" + lyrics + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TrackDTO trackDTO = (TrackDTO) o;
        return id == trackDTO.id &&
                duration == trackDTO.duration &&
                Objects.equals(name, trackDTO.name) &&
                Objects.equals(album, trackDTO.album) &&
                Objects.equals(playlist, trackDTO.playlist) &&
                Objects.equals(lyrics, trackDTO.lyrics);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, album, playlist, duration, lyrics);
    }
}
