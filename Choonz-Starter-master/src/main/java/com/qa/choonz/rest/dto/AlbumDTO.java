package com.qa.choonz.rest.dto;

import java.util.List;
import java.util.Objects;

public class AlbumDTO {

    private long id;
    private String name;
    private List<TrackDTO> tracks;
    private String cover;

    public AlbumDTO() {
        super();
    }

    public AlbumDTO(long id, String name) {
        super();
        this.id = id;
        this.name = name;
    }
    
    public AlbumDTO(long id, String name, List<TrackDTO> tracks) {
        super();
        this.id = id;
        this.name = name;
        this.tracks = tracks;
    }

    public AlbumDTO(long id, String name, List<TrackDTO> tracks, String cover) {
        super();
        this.id = id;
        this.name = name;
        this.tracks = tracks;

        this.cover = cover;
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

    public List<TrackDTO> getTracks() {
        return tracks;
    }

    public void setTracks(List<TrackDTO> tracks) {
        this.tracks = tracks;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("AlbumDTO [id=").append(id).append(", name=").append(name).append(", tracks=").append(tracks)
                .append("]");
        return builder.toString();
    }

    @Override
    public int hashCode() {
        return Objects.hash(cover, id, name, tracks);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof AlbumDTO)) {
            return false;
        }
        AlbumDTO other = (AlbumDTO) obj;
        return Objects.equals(cover, other.cover) && id == other.id && Objects.equals(name, other.name)
                && Objects.equals(tracks, other.tracks);
    }

}
