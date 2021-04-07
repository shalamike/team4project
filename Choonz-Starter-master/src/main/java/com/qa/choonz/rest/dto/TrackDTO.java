package com.qa.choonz.rest.dto;

import com.qa.choonz.persistence.domain.Album;
import com.qa.choonz.persistence.domain.Playlist;

import java.util.Objects;

public class TrackDTO {

    private long id;
    private String name;
    private Album album;
    private Playlist playlist;
    private int duration;
    private String lyrics;

    public TrackDTO() {
        super();
    }

    public TrackDTO(long id, String name, Album album, Playlist playlist, int duration, String lyrics) {
        this.id = id;
        this.name = name;
        this.album = album;
        this.playlist = playlist;
        this.duration = duration;
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
