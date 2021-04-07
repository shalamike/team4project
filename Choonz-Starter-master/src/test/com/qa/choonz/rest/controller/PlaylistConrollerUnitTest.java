package com.qa.choonz.rest.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import com.qa.choonz.rest.controller.PlaylistController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.qa.choonz.persistence.domain.Artist;
import com.qa.choonz.persistence.domain.Playlist;
import com.qa.choonz.rest.dto.ArtistDTO;
import com.qa.choonz.rest.dto.PlaylistDTO;
import com.qa.choonz.service.PlaylistService;

@SpringBootTest
public class PlaylistConrollerUnitTest {
	
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
		validPlaylist = new Playlist();
		validPlaylistDTO = new PlaylistDTO();
		
		playlists = new ArrayList<Playlist>();
		playlistDTOs = new ArrayList<PlaylistDTO>();
	}
	
	@Test
	public void createPlaylistTest() {
		when(playlistService.create(Mockito.any(Playlist.class))).thenReturn(validPlaylistDTO);
		
		ResponseEntity<PlaylistDTO> response = new ResponseEntity<>(validPlaylistDTO, HttpStatus.CREATED);
		
		assertThat(response).isEqualTo(playlistController.create(validPlaylist));
		verify(playlistService, times(1)).create(Mockito.any(Playlist.class));
		
	}
	
	@Test
	public void readPlaylistById() {
		when(playlistService.read(Mockito.anyInt())).thenReturn(validPlaylistDTO);
		
		ResponseEntity<PlaylistDTO> response = new ResponseEntity<>(validPlaylistDTO, HttpStatus.OK);
		verify(playlistService, times(1)).read(Mockito.anyInt());
	}
	
	 @Test
	 public void updatePlaylistTest() {
		 when(playlistService.update(Mockito.any(Playlist.class), Mockito.anyInt())).thenReturn(validPlaylistDTO);
		 
		 ResponseEntity<PlaylistDTO> response = new ResponseEntity<>(validPlaylistDTO, HttpStatus.OK);
		 
		 assertThat(response).isEqualTo(playlistController.update(validPlaylist, validPlaylist.getId()));
		 
		 verify(playlistService, times(1)).update(Mockito.any(Playlist.class), Mockito.anyInt());
	 }
	 
	 @Test
	 public void deletePlaylistTest() {
		 when(playlistService.delete(Mockito.anyInt())).thenReturn(true);
		 
		 ResponseEntity<Boolean> response = new ResponseEntity<>(true, HttpStatus.OK);
		 
		 assertThat(response).isEqualTo(playlistController.delete(validPlaylist.getId()));
	 }
	 
}
