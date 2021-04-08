package com.qa.choonz.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.qa.choonz.mappers.GenreMapper;
import com.qa.choonz.persistence.domain.Genre;
import com.qa.choonz.persistence.repository.GenreRepository;
import com.qa.choonz.rest.dto.AlbumDTO;
import com.qa.choonz.rest.dto.GenreDTO;

@SpringBootTest
public class GenreServiceUnitTest {
	@Autowired
	private GenreService genreService;
	
	@MockBean
	private GenreRepository genreRepo;
	
	@MockBean
	private GenreMapper mapper;
	
	private List<Genre> genreList;
	private List <GenreDTO> genreDTOList;
	
	private Genre validGenre;
	private GenreDTO validGenreDTO;
	
	@BeforeEach
	public void init() {
		validGenre = new Genre("cringe", "very cringe stuff");
		validGenreDTO = new GenreDTO(1, "cringe", "very cringe stuff");
		
		genreList = new ArrayList<Genre>();
		genreDTOList = new ArrayList<GenreDTO>();
		
		genreList.add(validGenre);
		genreDTOList.add(validGenreDTO);
		
	}
	
	@Test
	void readAllGenresTest() {
		when(genreRepo.findAll()).thenReturn(genreList);
		when(mapper.mapToDTO(validGenre)).thenReturn(validGenreDTO);
		
		assertThat(genreDTOList).isEqualTo(genreService.read());
		
		verify(genreRepo, times(1)).findAll();
		verify(mapper, times(1)).mapToDTO(validGenre);
	}
	
	@Test 
	void updateGenreTest(){
		Genre updatedGenre = new Genre("more cringe", "even more cringe");
		GenreDTO updatedGenreDTO = new GenreDTO(1, "more cringe", "even more cringe");
		
		when(genreRepo.findById(Mockito.anyLong())).thenReturn(Optional.of(validGenre));
		when(genreRepo.save(Mockito.any(Genre.class))).thenReturn(updatedGenre);
		when(mapper.mapToDTO(Mockito.any(Genre.class))).thenReturn(updatedGenreDTO);
		
		GenreDTO testToDTO = genreService.update(updatedGenre, validGenre.getId());
		
		assertThat(updatedGenreDTO).isEqualTo(testToDTO);
	}
	
	@Test
	void createGenreTest() {
		 when(genreRepo.save(validGenre)).thenReturn(validGenre);
		 when(mapper.mapToDTO(validGenre)).thenReturn(validGenreDTO);
		 assertThat(validGenreDTO).isEqualTo(genreService.create(validGenre));
		 verify(genreRepo, times(1)).save(validGenre);
		 verify(mapper, times(1)).mapToDTO(validGenre);
	}
	
	@Test
	void deleteGenreTest() {
		when(genreRepo.existsById(Mockito.any(Long.class))).thenReturn(true);

        assertThat(false).isEqualTo(genreService.delete(validGenre.getId()));

        verify(genreRepo, times(1)).existsById(Mockito.any(Long.class));
        verify(genreRepo, times(1)).deleteById(Mockito.any(Long.class));
	}
	
	@Test
	void readGenreByIDTest() {
		when(genreRepo.findById(Mockito.anyLong())).thenReturn(Optional.of(validGenre));
		when(mapper.mapToDTO(validGenre)).thenReturn(validGenreDTO);

		assertThat(validGenreDTO).isEqualTo(genreService.read(validGenre.getId()));

		verify(genreRepo, times(1)).findById(Mockito.anyLong());
		verify(mapper, times(1)).mapToDTO(validGenre);
	}
	
}
