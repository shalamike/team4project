package com.qa.choonz.rest.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.qa.choonz.persistence.domain.Genre;
import com.qa.choonz.rest.dto.GenreDTO;
import com.qa.choonz.service.GenreService;

@SpringBootTest
public class GenreControllerUnitTest {

    @Autowired
    GenreController genreController;

    @MockBean
    GenreService genreService;

    private List<Genre> genres;
    private List<GenreDTO> genreDTOs;

    private Genre validGenre;
    private GenreDTO validGenreDTO;

    @BeforeEach
    public void init() {
        validGenre = new Genre();
        validGenreDTO = new GenreDTO();

        genres = new ArrayList<>();
        genreDTOs = new ArrayList<>();

        genres.add(validGenre);
        genreDTOs.add(validGenreDTO);
    }

    @Test
    public void createGenreTest() {
        when(genreService.create(Mockito.any(Genre.class))).thenReturn(validGenreDTO);

        ResponseEntity<GenreDTO> response = new ResponseEntity<>(validGenreDTO, HttpStatus.CREATED);

        assertThat(response).isEqualTo(genreController.create(validGenre));
        verify(genreService, times(1)).create(Mockito.any(Genre.class));
    }

    @Test
    public void readGenreTest() {
        when(genreService.read()).thenReturn(genreDTOs);
        ResponseEntity<List<GenreDTO>> response = new ResponseEntity<>(genreDTOs, HttpStatus.OK);

        assertThat(response).isEqualTo(genreController.read());
        verify(genreService, times(1)).read();
    }

    @Test
    public void readGenreByIdTest() {
        when(genreService.read(validGenre.getId())).thenReturn(validGenreDTO);

        ResponseEntity<GenreDTO> response = new ResponseEntity<>(validGenreDTO, HttpStatus.OK);

        assertThat(response).isEqualTo(genreController.read(validGenre.getId()));

        verify(genreService, times(1)).read(validGenre.getId());
    }

    @Test
    public void updateGenreTest() {
        Genre newGenre = new Genre("genreName", "genreDescription");
        GenreDTO updatedGenre = new GenreDTO(newGenre.getId(), "updatedName", "updatedDescription");

        when(genreService.update(newGenre, newGenre.getId())).thenReturn(updatedGenre);

        ResponseEntity<GenreDTO> response = new ResponseEntity<>(updatedGenre, HttpStatus.OK);

        assertThat(response).isEqualTo(genreController.update(newGenre, newGenre.getId()));

        verify(genreService, times(1)).update(newGenre, newGenre.getId());
    }

    @Test
    public void deleteGenreTest() {
        when(genreService.delete(validGenre.getId())).thenReturn(true);

        ResponseEntity<Boolean> response = new ResponseEntity<>(true, HttpStatus.OK);

        assertThat(response).isEqualTo(genreController.delete(validGenre.getId()));

        verify(genreService, times(1)).delete(validGenre.getId());
    }
}
