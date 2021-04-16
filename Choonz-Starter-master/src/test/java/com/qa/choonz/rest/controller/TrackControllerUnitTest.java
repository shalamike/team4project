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

import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.rest.dto.TrackDTO;
import com.qa.choonz.service.TrackService;

@SpringBootTest
public class TrackControllerUnitTest {
	
	@Autowired
	TrackController trackController;
	
	@MockBean
	TrackService trackService;
	
	private List<Track> tracks;
	private List<TrackDTO> trackDTOs;
	
	private Track validTrack;
	private TrackDTO validTrackDTO;
	
	@BeforeEach
	public void init() {
		validTrack = new Track();
		validTrackDTO = new TrackDTO();
		
		tracks = new ArrayList<>();
		trackDTOs = new ArrayList<>();
		
		tracks.add(validTrack);
		trackDTOs.add(validTrackDTO);	
	}
	
	@Test
	public void createTrackTest() {
		when(trackService.create(Mockito.any(Track.class))).thenReturn(validTrackDTO);

		ResponseEntity<TrackDTO> response = new ResponseEntity<>(validTrackDTO, HttpStatus.CREATED);

		assertThat(response).isEqualTo(trackController.create(validTrack));

		verify(trackService, times(1)).create(Mockito.any(Track.class));
	}
	
	@Test
	public void readTrackTest() {
		when(trackService.read()).thenReturn(trackDTOs);

		ResponseEntity<List<TrackDTO>> response = new ResponseEntity<>(trackDTOs, HttpStatus.OK);
		 
		assertThat(response).isEqualTo(trackController.read());

		verify(trackService, times(1)).read();
	}
	
	 @Test
	 public void readTrackByIdTest() {
		 when(trackService.read(validTrack.getId())).thenReturn(validTrackDTO);
		 
		 ResponseEntity<TrackDTO> response = new ResponseEntity<>(validTrackDTO, HttpStatus.OK);
		 
		 assertThat(response).isEqualTo(trackController.read(validTrack.getId()));

		 verify(trackService, times(1)).read(validTrack.getId());
	 }

	@Test
	public void updateTrackTest() {
		Track newTrack = new Track("what");
		TrackDTO updatedTrack = new TrackDTO(newTrack.getId(), "Madness");

		when(trackService.update(newTrack, newTrack.getId())).thenReturn(updatedTrack);

		ResponseEntity<TrackDTO> response = new ResponseEntity<>(updatedTrack, HttpStatus.OK);

		assertThat(response).isEqualTo(trackController.update(newTrack, newTrack.getId()));

		verify(trackService, times(1)).update(newTrack, newTrack.getId());
	}

	@Test
	public void deleteTrackTest() {
		when(trackService.delete(validTrack.getId())).thenReturn(true);

		ResponseEntity<Boolean> response = new ResponseEntity<>(true, HttpStatus.OK);

		assertThat(response).isEqualTo(trackController.delete(validTrack.getId()));

		verify(trackService, times(1)).delete(validTrack.getId());
	}

}
