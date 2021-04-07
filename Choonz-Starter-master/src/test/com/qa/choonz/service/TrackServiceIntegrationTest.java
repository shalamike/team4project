package com.qa.choonz.service;

import com.qa.choonz.mappers.TrackMapper;
import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.persistence.repository.TrackRepository;
import com.qa.choonz.rest.dto.TrackDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class TrackServiceIntegrationTest {

    @Autowired
    private TrackService trackService;

    @Autowired
    private TrackRepository trackRepository;

    @Autowired
    private TrackMapper trackMapper;

    private List<Track> tracks;
    private List<TrackDTO> trackDTOs;

    private Track validTrack;
    private TrackDTO validTrackDTO;

    @BeforeEach
    public void init() {
        tracks = new ArrayList<>();
        validTrack = new Track();

        validTrack = new Track("bigboytune");

        tracks = new ArrayList<>();
        trackDTOs = new ArrayList<>();

        trackRepository.deleteAll();

        validTrack = trackRepository.save(validTrack);
        validTrackDTO = trackMapper.mapToDTO(validTrack);

        tracks.add(validTrack);
        trackDTOs.add(validTrackDTO);
    }

    @Test
    public void createTest() {
        Track createdTrack = new Track( "banger of the year");
        TrackDTO newTrackInDb = trackService.create(createdTrack);
        assertThat(trackMapper.mapToDTO(createdTrack)).isEqualTo(newTrackInDb);
    }

    @Test
    public void readTest() {
        List<TrackDTO> tracksInDb = trackService.read();
        assertThat(trackDTOs).isEqualTo(tracksInDb);
    }

    @Test
    public void readByIdTest() {
        TrackDTO trackInDb = trackService.read(validTrack.getId());
        assertThat(validTrackDTO).isEqualTo(trackInDb);
    }

    @Test
    public void updateTest() {
        Track updatedTrack = new Track("UpdatedChoon");
        TrackDTO updatedTrackInDb = trackService.update(updatedTrack, validTrack.getId());
        assertThat(trackMapper.mapToDTO(updatedTrack)).isEqualTo(updatedTrackInDb);
    }

    @Test
    public void deleteTest() {
        Boolean deleteVerifier = trackService.delete(validTrack.getId());
        assertThat(true).isEqualTo(deleteVerifier);
    }

}
