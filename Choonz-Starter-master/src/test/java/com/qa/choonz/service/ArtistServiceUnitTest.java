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

import com.qa.choonz.mappers.ArtistMapper;
import com.qa.choonz.persistence.domain.Artist;
import com.qa.choonz.persistence.repository.ArtistRepository;
import com.qa.choonz.rest.dto.ArtistDTO;


@SpringBootTest
public class ArtistServiceUnitTest {

	@Autowired
	private ArtistService artistService;
	
	@MockBean
	private ArtistRepository artistRepo;
	
	@MockBean
	private ArtistMapper mapper;
	
	private List<Artist> artistList;
	private List<ArtistDTO> artistDTOList;
	
	private Artist validArtist;
	private ArtistDTO validArtistDTO;
	
	@BeforeEach
	void init() {
		validArtist = new Artist("Shania");
		validArtistDTO = new ArtistDTO(1, "Shania");
		
		artistList = new ArrayList<Artist>();
		artistDTOList = new ArrayList<ArtistDTO>();
		
		artistList.add(validArtist);
		artistDTOList.add(validArtistDTO);
	}
	
	@Test
	void readAllArtistTest() {
		when(artistRepo.findAll()).thenReturn(artistList);
		when(mapper.mapToDTO(validArtist)).thenReturn(validArtistDTO);
		
		assertThat(artistDTOList).isEqualTo(artistService.read());
		
		verify(artistRepo, times(1)).findAll();
		verify(mapper, times(1)).mapToDTO(validArtist);
	}
	
	@Test
	void updateArtistTest() {
		Artist updatedArtist = new Artist("not Shania");
		ArtistDTO updatedArtistDTO = new ArtistDTO(1, "not Shania");
		
		when(artistRepo.findById(Mockito.anyLong())).thenReturn(Optional.of(validArtist));
		when(artistRepo.save(Mockito.any(Artist.class))).thenReturn(updatedArtist);
		when(mapper.mapToDTO(Mockito.any(Artist.class))).thenReturn(updatedArtistDTO);
		
		ArtistDTO testToDTO = artistService.update(updatedArtist, validArtist.getId());
		
		assertThat(updatedArtistDTO).isEqualTo(testToDTO);
	}
	
	@Test
	void createArtistTest() {
        when(artistRepo.save(validArtist)).thenReturn(validArtist);
        when(mapper.mapToDTO(validArtist)).thenReturn(validArtistDTO);

        assertThat(validArtistDTO).isEqualTo(artistService.create(validArtist));

        verify(artistRepo, times(1)).save(validArtist);
        verify(mapper, times(1)).mapToDTO(validArtist);
	}	
	
	@Test
	void deleteArtistTeset() {
		when(artistRepo.existsById(Mockito.any(Long.class))).thenReturn(true);

        assertThat(false).isEqualTo(artistService.delete(validArtist.getId()));

        verify(artistRepo, times(1)).existsById(Mockito.any(Long.class));
        verify(artistRepo, times(1)).deleteById(Mockito.any(Long.class));
	}
	
	@Test
	void readArtistByIdTest() {
		when(artistRepo.findById(Mockito.anyLong())).thenReturn(Optional.of(validArtist));
        when(mapper.mapToDTO(validArtist)).thenReturn(validArtistDTO);

        assertThat(validArtistDTO).isEqualTo(artistService.read(validArtist.getId()));

        verify(artistRepo, times(1)).findById(Mockito.anyLong());
        verify(mapper, times(1)).mapToDTO(validArtist);
		
	}
}
