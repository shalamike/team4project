package com.qa.choonz.persistence.domain;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Album {

    @Id
    @Column(name = "album_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Size(max = 100)
    @Column(unique = true)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id")
    private List<Track> tracks;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "Artist_Album",
		joinColumns = @JoinColumn(name = "album_id", referencedColumnName = "album_id"),
	    inverseJoinColumns = @JoinColumn(name = "artist_id", referencedColumnName = "artist_id"))
    private List<Artist> artists;

    @ManyToOne
    private Genre genre;

    private String cover;

    public Album() {
        super();
    }

    public Album(@NotNull @Size(max = 100) String name) {
        super();
        this.name = name;
    }

    public Album(@NotNull @Size(max = 100) String name, List<Track> tracks) {
        super();
        this.name = name;
        this.tracks = tracks;
    }

    public Album(long id, @NotNull @Size(max = 100) String name, List<Track> tracks, List<Artist> artists, Genre genre,
            String cover) {
        super();
        this.id = id;
        this.name = name;
        this.tracks = tracks;
        this.artists = artists;
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

    public List<Track> getTracks() {
        return tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }

    public List<Artist> getArtists() {
        return artists;
    }
    
    public void setArtists(List<Artist> artists) {
    	this.artists = artists;
    }

    public void addArtist(Artist artist) {
        artists.add(artist);
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
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
        builder.append("Album [id=").append(id).append(", name=").append(name).append(", tracks=").append(tracks)
                .append(", artist=").append(artists).append(", genre=").append(genre).append(", cover=").append(cover)
                .append("]");
        return builder.toString();
    }

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((artists == null) ? 0 : artists.hashCode());
		result = prime * result + ((cover == null) ? 0 : cover.hashCode());
		result = prime * result + ((genre == null) ? 0 : genre.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((tracks == null) ? 0 : tracks.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Album other = (Album) obj;
		if (artists == null) {
			if (other.artists != null)
				return false;
		} else if (!artists.equals(other.artists))
			return false;
		if (cover == null) {
			if (other.cover != null)
				return false;
		} else if (!cover.equals(other.cover))
			return false;
		if (genre == null) {
			if (other.genre != null)
				return false;
		} else if (!genre.equals(other.genre))
			return false;
		if (id != other.id)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (tracks == null) {
			if (other.tracks != null)
				return false;
		} else if (!tracks.equals(other.tracks))
			return false;
		return true;
	}


    
}
