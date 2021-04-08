package com.qa.choonz.service;

import com.qa.choonz.mappers.AlbumMapper;
import com.qa.choonz.persistence.domain.Album;
import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.persistence.repository.AlbumRepository;
import com.qa.choonz.rest.dto.AlbumDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class AlbumServiceIntegrationTest {

    @Autowired
    private AlbumService albumService;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private AlbumMapper albumMapper;

    private Track validTrack;
    private List<Track> tracks;

    private List<Album> albums;
    private List<AlbumDTO> albumDTOs;

    private Album validAlbum;
    private AlbumDTO validAlbumDTO;

    @BeforeEach
    public void init() {
        tracks = new ArrayList<>();
        validTrack = new Track();

        validAlbum = new Album("Choonz", tracks);

        albums = new ArrayList<>();
        albumDTOs = new ArrayList<>();

        albumRepository.deleteAll();

        validAlbum = albumRepository.save(validAlbum);
        validAlbumDTO = albumMapper.mapToDTO(validAlbum);

        albums.add(validAlbum);
        albumDTOs.add(validAlbumDTO);
    }

    @Test
    public void createTest() {
        Album createdAlbum = new Album( "Tunes");
        AlbumDTO newAlbumInDb = albumService.create(createdAlbum);
        assertThat(albumMapper.mapToDTO(createdAlbum)).isEqualTo(newAlbumInDb);
    }

    @Test
    public void readTest() {
        List<AlbumDTO> albumsInDb = albumService.read();
        assertThat(albumDTOs).isEqualTo(albumsInDb);
    }

    @Test
    public void readByIdTest() {
        AlbumDTO albumInDb = albumService.read(validAlbum.getId());
        assertThat(validAlbumDTO).isEqualTo(albumInDb);
    }

    @Test
    public void updateTest() {
        Album updatedAlbum = new Album(2, "UpdatedChoonz", tracks,
                validAlbum.getArtist(), validAlbum.getGenre(), "Cover");
        AlbumDTO updatedAlbumInDb = albumService.update(updatedAlbum, validAlbum.getId());
        assertThat(albumMapper.mapToDTO(updatedAlbum)).isEqualTo(updatedAlbumInDb);
    }

    @Test
    public void deleteTest() {
        Boolean deleteVerifier = albumService.delete(validAlbum.getId());
        assertThat(true).isEqualTo(deleteVerifier);
    }

}
