package com.qa.choonz.rest.dto;

import java.util.List;
import java.util.Objects;

public class ArtistDTO {

    private long id;
    private String name;
    private List<AlbumDTO> albums;

    public ArtistDTO() {
        super();
    }

    public ArtistDTO(long id, String name) {
        super();
        this.id = id;
        this.name = name;
    }

    public ArtistDTO(long id, String name, List<AlbumDTO> albums) {
        super();
        this.id = id;
        this.name = name;
        this.albums = albums;
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

    public List<AlbumDTO> getAlbums() {
        return albums;
    }

    public void setAlbums(List<AlbumDTO> albums) {
        this.albums = albums;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("ArtistDTO [id=").append(id).append(", name=").append(name).append(", albums=").append(albums)
                .append("]");
        return builder.toString();
    }

    @Override
    public int hashCode() {
        return Objects.hash(albums, id, name);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof ArtistDTO)) {
            return false;
        }
        ArtistDTO other = (ArtistDTO) obj;
        return Objects.equals(albums, other.albums) && id == other.id && Objects.equals(name, other.name);
    }

}
