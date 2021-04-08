package com.qa.choonz.service;

import com.qa.choonz.mappers.ArtistMapper;
import com.qa.choonz.persistence.domain.Album;
import com.qa.choonz.persistence.domain.Artist;
import com.qa.choonz.persistence.repository.ArtistRepository;
import com.qa.choonz.rest.dto.ArtistDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ArtistServiceIntegrationTest {

    @Autowired
    private ArtistService artistService;

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private ArtistMapper artistMapper;

    private Album validAlbum;
    private List<Album> albums;

    private List<Artist> artists;
    private List<ArtistDTO> artistDTOs;

    private Artist validArtist;
    private ArtistDTO validArtistDTO;

    @BeforeEach
    public void init() {
        albums = new ArrayList<>();
        validAlbum = new Album();

        validArtist = new Artist("Te4m", albums);

        artists = new ArrayList<>();
        artistDTOs = new ArrayList<>();

        artistRepository.deleteAll();

        validArtist = artistRepository.save(validArtist);
        validArtistDTO = artistMapper.mapToDTO(validArtist);

        artists.add(validArtist);
        artistDTOs.add(validArtistDTO);
    }

    @Test
    public void createTest() {
        Artist createdArtist = new Artist("Team 4");
        ArtistDTO newArtistInDb = artistService.create(createdArtist);
        assertThat(artistMapper.mapToDTO(createdArtist)).isEqualTo(newArtistInDb);
    }

    @Test
    public void readTest() {
        List<ArtistDTO> artistsInDb = artistService.read();
        assertThat(artistDTOs).isEqualTo(artistsInDb);
    }

    @Test
    public void readByIdTest() {
        ArtistDTO artistInDb = artistService.read(validArtist.getId());
        assertThat(validArtistDTO).isEqualTo(artistInDb);
    }

    @Test
    public void updateTest() {
        Artist updatedArtist = new Artist("UpdatedArtist", albums);
        ArtistDTO updatedArtistInDb = artistService.update(updatedArtist, validArtist.getId());
        assertThat(artistMapper.mapToDTO(updatedArtist)).isEqualTo(updatedArtistInDb);
    }

    @Test
    public void deleteTest() {
        Boolean deleteVerifier = artistService.delete(validArtist.getId());
        assertThat(true).isEqualTo(deleteVerifier);
    }

}
