package com.qa.choonz.service;

import com.qa.choonz.mappers.PlaylistMapper;
import com.qa.choonz.persistence.domain.Playlist;
import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.persistence.repository.PlaylistRepository;
import com.qa.choonz.rest.dto.PlaylistDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class PlaylistServiceIntegrationTest {
    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private PlaylistMapper playlistMapper;

    private Track validTrack;
    private List<Track> tracks;

    private List<Playlist> playlists;
    private List<PlaylistDTO> playlistDTOs;

    private Playlist validPlaylist;
    private PlaylistDTO validPlaylistDTO;

    @BeforeEach
    public void init() {
        tracks = new ArrayList<>();
        validTrack = new Track();

        validPlaylist = new Playlist("Name", "Description", "Artwork", tracks);

        playlists = new ArrayList<>();
        playlistDTOs = new ArrayList<>();

        playlistRepository.deleteAll();

        validPlaylist = playlistRepository.save(validPlaylist);
        validPlaylistDTO = playlistMapper.mapToDTO(validPlaylist);

        playlists.add(validPlaylist);
        playlistDTOs.add(validPlaylistDTO);
    }

    @Test
    public void createTest() {
        Playlist createdPlaylist = new Playlist( "Slappers2", "a mix of average vibes","sad");
        PlaylistDTO newPlaylistInDb = playlistService.create(createdPlaylist);
        assertThat(playlistMapper.mapToDTO(createdPlaylist)).isEqualTo(newPlaylistInDb);
    }

    @Test
    public void readTest() {
        List<PlaylistDTO> playlistInDb = playlistService.read();
        assertThat(playlistDTOs).isEqualTo(playlistInDb);
    }

    @Test
    public void readByIdTest() {
        PlaylistDTO playlistInDb = playlistService.read(validPlaylist.getId());
        assertThat(validPlaylistDTO).isEqualTo(playlistInDb);
    }

    @Test
    public void updateTest() {
        Playlist updatedPlaylist = new Playlist("Name 2", "Description 2", "Artwork 2" , tracks);
        PlaylistDTO updatedPlaylistInDb = playlistService.update(updatedPlaylist, validPlaylist.getId());
        assertThat(playlistMapper.mapToDTO(updatedPlaylist)).isEqualTo(updatedPlaylistInDb);
    }

    @Test
    public void deleteTest() {
        Boolean deleteVerifier = playlistService.delete(validPlaylist.getId());
        assertThat(true).isEqualTo(deleteVerifier);
    }

}
