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

import com.qa.choonz.persistence.domain.Playlist;
import com.qa.choonz.rest.dto.PlaylistDTO;
import com.qa.choonz.service.PlaylistService;

@SpringBootTest
public class PlaylistControllerUnitTest {

    @Autowired
    PlaylistController playlistController;

    @MockBean
    PlaylistService playlistService;

    private List<Playlist> playlists;
    private List<PlaylistDTO> playlistDTOs;

    private Playlist validPlaylist;
    private PlaylistDTO validPlaylistDTO;

    @BeforeEach
    public void init() {
        validPlaylist = new Playlist("Name", "Description", "Artwork");
        validPlaylistDTO = new PlaylistDTO(1, "Name", "Description", "Artwork");

        playlists = new ArrayList<>();
        playlistDTOs = new ArrayList<>();
    }

    @Test
    public void createPlaylistTest() {
        when(playlistService.create(Mockito.any(Playlist.class))).thenReturn(validPlaylistDTO);

        ResponseEntity<PlaylistDTO> response = new ResponseEntity<>(validPlaylistDTO, HttpStatus.CREATED);

        assertThat(response).isEqualTo(playlistController.create(validPlaylist));

        verify(playlistService, times(1)).create(Mockito.any(Playlist.class));
    }

	@Test
	public void readPlaylistTest() {
		when(playlistService.read()).thenReturn(playlistDTOs);

		ResponseEntity<List<PlaylistDTO>> response = new ResponseEntity<>(playlistDTOs, HttpStatus.OK);

		assertThat(response).isEqualTo(playlistController.read());

		verify(playlistService, times(1)).read();
	}

    @Test
    public void readPlaylistByIdTest() {
        when(playlistService.read(validPlaylist.getId())).thenReturn(validPlaylistDTO);

        ResponseEntity<PlaylistDTO> response = new ResponseEntity<>(validPlaylistDTO, HttpStatus.OK);

        assertThat(response).isEqualTo(playlistController.read(validPlaylist.getId()));

        verify(playlistService, times(1)).read(validPlaylist.getId());
    }

    @Test
    public void updatePlaylistTest() {
    	Playlist newPlaylist = new Playlist("pName", "pDesc", "pArt");
    	PlaylistDTO updatePlaylist = new PlaylistDTO(newPlaylist.getId(), "uName", "uDesc", "uArt");

        when(playlistService.update(newPlaylist, newPlaylist.getId())).thenReturn(updatePlaylist);

        ResponseEntity<PlaylistDTO> response = new ResponseEntity<>(updatePlaylist, HttpStatus.OK);

        assertThat(response).isEqualTo(playlistController.update(newPlaylist, newPlaylist.getId()));

        verify(playlistService, times(1)).update(newPlaylist, newPlaylist.getId());
    }

    @Test
    public void deletePlaylistTest() {
        when(playlistService.delete(validPlaylist.getId())).thenReturn(true);

        ResponseEntity<Boolean> response = new ResponseEntity<>(true, HttpStatus.OK);

        assertThat(response).isEqualTo(playlistController.delete(validPlaylist.getId()));

        verify(playlistService, times(1)).delete(validPlaylist.getId());
    }

}
