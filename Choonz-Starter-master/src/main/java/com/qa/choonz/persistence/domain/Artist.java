package com.qa.choonz.persistence.domain;

import java.util.List;
import java.util.Objects;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Artist {

    @Id
    @Column(name = "artist_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Size(max = 100)
    @Column(unique = true)
    private String name;
    
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "Artist_Album",
	    joinColumns = @JoinColumn(name = "artist_id", referencedColumnName = "artist_id"),
	    inverseJoinColumns = @JoinColumn(name = "album_id", referencedColumnName = "album_id"))
    private List<Album> albums;

    public Artist() {
        super();
    }

    public Artist(@NotNull @Size(max = 100) String name) {
        super();
        this.name = name;
    }

    public Artist(@NotNull @Size(max = 100) String name, List<Album> albums) {
        super();
        this.name = name;
        this.albums = albums;
    }

    public Artist(long id, @NotNull @Size(max = 100) String name, List<Album> albums) {
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

    public List<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(List<Album> albums) {
        this.albums = albums;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Artist [id=").append(id).append(", name=").append(name).append(", albums=").append(albums)
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
        if (!(obj instanceof Artist)) {
            return false;
        }
        Artist other = (Artist) obj;
        return Objects.equals(albums, other.albums) && id == other.id && Objects.equals(name, other.name);
    }

}
