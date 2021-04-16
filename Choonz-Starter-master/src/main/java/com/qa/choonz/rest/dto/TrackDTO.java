package com.qa.choonz.rest.dto;

import java.util.Objects;

public class TrackDTO {

    private long id;
    private String name;

    private int duration;
    private String lyrics;

    public TrackDTO() {
        super();
    }

    public TrackDTO(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public TrackDTO(long id, String name, int duration, String lyrics) {
        this.id = id;
        this.name = name;
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
                Objects.equals(lyrics, trackDTO.lyrics);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, duration, lyrics);
    }
}
