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

import com.qa.choonz.persistence.domain.Artist;
import com.qa.choonz.rest.dto.ArtistDTO;
import com.qa.choonz.service.ArtistService;

@SpringBootTest
public class ArtistControllerUnitTest {
	
	@Autowired
	ArtistController artistController;
	
	@MockBean
	ArtistService artistService;
	
	 private List<Artist> artists;
	 private List<ArtistDTO> artistDTOs;

	 private Artist validArtist;
	 private ArtistDTO validArtistDTO;
	 
	 
	 @BeforeEach
	 public void init() {
		 validArtist = new Artist();
		 validArtistDTO = new ArtistDTO();
		 
		 artists = new ArrayList<Artist>();
		 artistDTOs = new ArrayList<ArtistDTO>();
		 
		 artists.add(validArtist);
		 artistDTOs.add(validArtistDTO);
		 
	 }
	 
	 @Test
	 public void createArtistTest() {
		 when(artistService.create(Mockito.any(Artist.class))).thenReturn(validArtistDTO);
		 
		 ResponseEntity<ArtistDTO> response = new ResponseEntity<>(validArtistDTO, HttpStatus.CREATED);
		 
		 assertThat(response).isEqualTo(artistController.create(validArtist));
		 verify(artistService, times(1)).create(Mockito.any(Artist.class));
	 }
	 
	 @Test
	 public void readArtistTest() {
		 when(artistService.read()).thenReturn(artistDTOs);
		 ResponseEntity<List<ArtistDTO>> response = new ResponseEntity<>(artistDTOs, HttpStatus.OK);
		 
		 assertThat(response).isEqualTo(artistController.read());
		 verify(artistService, times(1)).read();
	 }
	 
	 @Test
	 public void readArtistTestByID() {
		 when(artistService.read(Mockito.anyInt())).thenReturn(validArtistDTO);
		 
		 ResponseEntity<ArtistDTO> response = new ResponseEntity<>(validArtistDTO, HttpStatus.OK);
		 
		 assertThat(response).isEqualTo(artistController.read(validArtist.getId()));
		 verify(artistService, times(1)).read(Mockito.anyInt());
	 }
	 
	 @Test
	 public void updateArtistTest() {
		 when(artistService.update(Mockito.any(Artist.class), Mockito.anyInt())).thenReturn(validArtistDTO);
		 
		 ResponseEntity<ArtistDTO> response = new ResponseEntity<>(validArtistDTO, HttpStatus.OK);
		 
		 assertThat(response).isEqualTo(artistController.update(validArtist, validArtist.getId()));
		 
		 verify(artistService, times(1)).update(Mockito.any(Artist.class), Mockito.anyInt());
	 }
	 
	 @Test
	 public void deleteArtist() {
		 when(artistService.delete(Mockito.anyInt())).thenReturn(true);
		 
		 ResponseEntity<Boolean> response = new ResponseEntity<>(true, HttpStatus.OK);
		 
		 assertThat(response).isEqualTo(artistController.delete(validArtist.getId()));
	 }
}
