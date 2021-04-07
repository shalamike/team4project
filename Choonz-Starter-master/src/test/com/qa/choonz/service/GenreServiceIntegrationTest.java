package com.qa.choonz.service;

import com.qa.choonz.mappers.GenreMapper;
import com.qa.choonz.persistence.domain.Album;
import com.qa.choonz.persistence.domain.Genre;
import com.qa.choonz.persistence.repository.GenreRepository;
import com.qa.choonz.rest.dto.AlbumDTO;
import com.qa.choonz.rest.dto.GenreDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class GenreServiceIntegrationTest {

    @Autowired
    private GenreService genreService;

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private GenreMapper genreMapper;

    private Album validAlbum;
    private List<Album> albums;

    private List<Genre> genres;
    private List<GenreDTO> genreDTOs;

    private Genre validGenre;
    private GenreDTO validGenreDTO;

    @BeforeEach
    public void init() {
        albums = new ArrayList<>();
        validAlbum = new Album();

        validGenre = new Genre("Genre", "Very good genre clap", albums);

        genres = new ArrayList<>();
        genreDTOs = new ArrayList<>();

        genreRepository.deleteAll();

        validGenre = genreRepository.save(validGenre);
        validGenreDTO = genreMapper.mapToDTO(validGenre);

        genres.add(validGenre);
        genreDTOs.add(validGenreDTO);
    }

    @Test
    public void createTest() {
        Genre createdGenre = new Genre("Hippity hop", "Very cool, Kanye");
        GenreDTO newGenreInDb = genreService.create(createdGenre);
        assertThat(genreMapper.mapToDTO(createdGenre)).isEqualTo(newGenreInDb);
    }

    @Test
    public void readTest() {
        List<GenreDTO> genresInDb = genreService.read();
        assertThat(genreDTOs).isEqualTo(genresInDb);
    }

    @Test
    public void readByIdTest() {
        GenreDTO genreInDb = genreService.read(validGenre.getId());
        assertThat(validGenreDTO).isEqualTo(genreInDb);
    }

    @Test
    public void updateTest() {
        Genre updatedGenre = new Genre(2, "NewGenre", "Description2", albums);
        GenreDTO updatedGenreInDb = genreService.update(updatedGenre, validGenre.getId());
        assertThat(genreMapper.mapToDTO(updatedGenre)).isEqualTo(updatedGenreInDb);
    }

    @Test
    public void deleteTest() {
        Boolean deleteVerifier = genreService.delete(validGenre.getId());
        assertThat(true).isEqualTo(deleteVerifier);
    }

}
