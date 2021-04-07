package com.qa.choonz.rest.dto;

import java.util.List;
import java.util.Objects;

public class AlbumDTO {

    private long id;
    private String name;
    private List<TrackDTO> tracks;
    private ArtistDTO artist;
    private GenreDTO genre;
    private String cover;

    public AlbumDTO() {
        super();
    }

    public AlbumDTO(long id, String name) {
        super();
        this.id = id;
        this.name = name;
    }

    public AlbumDTO(long id, String name, List<TrackDTO> tracks, ArtistDTO artist, GenreDTO genre, String cover) {
        super();
        this.id = id;
        this.name = name;
        this.tracks = tracks;
        this.artist = artist;
        this.genre = genre;
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

    public ArtistDTO getArtist() {
        return artist;
    }

    public void setArtist(ArtistDTO artist) {
        this.artist = artist;
    }

    public GenreDTO getGenre() {
        return genre;
    }

    public void setGenre(GenreDTO genre) {
        this.genre = genre;
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
                .append(", artist=").append(artist).append(", genre=").append(genre).append(", cover=").append(cover)
                .append("]");
        return builder.toString();
    }

    @Override
    public int hashCode() {
        return Objects.hash(artist, cover, genre, id, name, tracks);
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
        return Objects.equals(artist, other.artist) && Objects.equals(cover, other.cover)
                && Objects.equals(genre, other.genre) && id == other.id && Objects.equals(name, other.name)
                && Objects.equals(tracks, other.tracks);
    }

}
