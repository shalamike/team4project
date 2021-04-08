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

import com.qa.choonz.mappers.TrackMapper;
import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.persistence.repository.TrackRepository;
import com.qa.choonz.rest.dto.TrackDTO;

@SpringBootTest
public class TrackServiceUnitTest {
	
	@Autowired
	private TrackService trackService;
	
	@MockBean
	private TrackRepository trackRepo;
	
	@MockBean
	private TrackMapper mapper;
	
	private List<Track> trackList;
	private List<TrackDTO> trackDTOList;
	
	private Track validTrack;
	private TrackDTO validTrackDTO;
	
	
	@BeforeEach
	public void init() {
		validTrack = new Track("Come On Over");
		validTrackDTO = new TrackDTO(1, "Come On Over");
		
		trackList = new ArrayList<Track>();
		trackDTOList = new ArrayList<TrackDTO>();
		
		trackList.add(validTrack);
		trackDTOList.add(validTrackDTO);
	}
	
	@Test
	public void readAllTracksTest() {
		when(trackRepo.findAll()).thenReturn(trackList);
		when(mapper.mapToDTO(validTrack)).thenReturn(validTrackDTO);
		
		assertThat(trackDTOList).isEqualTo(trackService.read());
		
		verify(trackRepo, times(1)).findAll();
		verify(mapper, times(1)).mapToDTO(validTrack);
	}
	
	@Test
	public void updateTrackTest() {
		Track updatedTrack = new Track("The Woman In Me");
		TrackDTO updatedTrackDTO = new TrackDTO(1, "The Woman In Me");
		
		when(trackRepo.findById(Mockito.anyLong())).thenReturn(Optional.of(validTrack));
		when(trackRepo.save(Mockito.any(Track.class))).thenReturn(updatedTrack);
		when(mapper.mapToDTO(Mockito.any(Track.class))).thenReturn(updatedTrackDTO);
		
		TrackDTO testToDTO = trackService.update(updatedTrack, validTrack.getId());
		
		assertThat(updatedTrackDTO).isEqualTo(testToDTO);
	}
	
	@Test
    void createTrackTest() {
        when(trackRepo.save(validTrack)).thenReturn(validTrack);
        when(mapper.mapToDTO(validTrack)).thenReturn(validTrackDTO);

        assertThat(validTrackDTO).isEqualTo(trackService.create(validTrack));

        verify(trackRepo, times(1)).save(validTrack);
        verify(mapper, times(1)).mapToDTO(validTrack);
    }
	
	@Test
    void deleteTrackTest() {
        when(trackRepo.existsById(Mockito.any(Long.class))).thenReturn(true);

        assertThat(false).isEqualTo(trackService.delete(validTrack.getId()));

        verify(trackRepo, times(1)).existsById(Mockito.any(Long.class));
        verify(trackRepo, times(1)).deleteById(Mockito.any(Long.class));

    }
	
	 @Test
	 void readTrackByIdTest(){
			when(trackRepo.findById(Mockito.anyLong())).thenReturn(Optional.of(validTrack));
	        when(mapper.mapToDTO(validTrack)).thenReturn(validTrackDTO);

	        assertThat(validTrackDTO).isEqualTo(trackService.read(validTrack.getId()));

	        verify(trackRepo, times(1)).findById(Mockito.anyLong());
	        verify(mapper, times(1)).mapToDTO(validTrack);
	}
}
