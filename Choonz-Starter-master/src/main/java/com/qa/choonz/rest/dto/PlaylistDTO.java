package com.qa.choonz.rest.dto;

import java.util.List;
import java.util.Objects;

public class PlaylistDTO {

    private long id;
    private String name;
    private String description;
    private String artwork;
    private List<TrackDTO> tracks;

    public PlaylistDTO() {
        super();
    }

    public PlaylistDTO(long id, String name, String description, String artwork) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.artwork = artwork;
    }

    public PlaylistDTO(long id, String name, String description, String artwork, List<TrackDTO> tracks) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.artwork = artwork;
        this.tracks = tracks;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getArtwork() {
        return artwork;
    }

    public void setArtwork(String artwork) {
        this.artwork = artwork;
    }

    public List<TrackDTO> getTracks() {
        return tracks;
    }

    public void setTracks(List<TrackDTO> tracks) {
        this.tracks = tracks;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("PlaylistDTO [id=").append(id).append(", name=").append(name).append(", description=")
                .append(description).append(", artwork=").append(artwork).append(", tracks=").append(tracks)
                .append("]");
        return builder.toString();
    }

    @Override
    public int hashCode() {
        return Objects.hash(artwork, description, id, name, tracks);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof PlaylistDTO)) {
            return false;
        }
        PlaylistDTO other = (PlaylistDTO) obj;
        return Objects.equals(artwork, other.artwork) && Objects.equals(description, other.description)
                && id == other.id && Objects.equals(name, other.name) && Objects.equals(tracks, other.tracks);
    }

}
