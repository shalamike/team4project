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

import com.qa.choonz.mappers.PlaylistMapper;
import com.qa.choonz.persistence.domain.Playlist;
import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.persistence.repository.PlaylistRepository;
import com.qa.choonz.rest.dto.PlaylistDTO;
import com.qa.choonz.rest.dto.TrackDTO;

@SpringBootTest
public class PlaylistServiceUnitTest {

	@Autowired
	private PlaylistService playlistService;
	
	@MockBean
	private PlaylistRepository playlistRepo;
	
	@MockBean
	private PlaylistMapper mapper;
	
	private List<Playlist> playlists;
	private List<PlaylistDTO> playlistDTOs;
	
	private Playlist validPlaylist;
	private PlaylistDTO validPlaylistDTO;
	
	@BeforeEach
	public void init() {
		validPlaylist = new Playlist("Vibez", "Great mood music", "COOL PIC");
		validPlaylistDTO = new PlaylistDTO();
		
		playlists = new ArrayList<Playlist>();
		playlistDTOs = new ArrayList<PlaylistDTO>();
		
		playlists.add(validPlaylist);
		playlistDTOs.add(validPlaylistDTO);
	}
	
	@Test
	public void readAllPlaylistsTest() {
		when(playlistRepo.findAll()).thenReturn(playlists);
		when(mapper.mapToDTO(validPlaylist)).thenReturn(validPlaylistDTO);
		
		assertThat(playlistDTOs).isEqualTo(playlistService.read());
		
		verify(playlistRepo, times(1)).findAll();
		verify(mapper, times(1)).mapToDTO(validPlaylist);
	}
	
	@Test
	public void updatePlaylistTest() {
		Playlist updatedPlaylist = new Playlist("Rock", "music", "VERY COOL PIC");
		PlaylistDTO updatedPlaylistDTO = new PlaylistDTO(1, "Rock", "music", "VERY COOL PIC");
		
		when(playlistRepo.findById(Mockito.anyLong())).thenReturn(Optional.of(validPlaylist));
		when(playlistRepo.save(Mockito.any(Playlist.class))).thenReturn(updatedPlaylist);
		when(mapper.mapToDTO(Mockito.any(Playlist.class))).thenReturn(updatedPlaylistDTO);
		
		PlaylistDTO testToDTO = playlistService.update(updatedPlaylist, validPlaylist.getId());
		
		assertThat(updatedPlaylistDTO).isEqualTo(testToDTO);
	}
	
	@Test
	public void createPlaylistTest() {
		when(playlistRepo.save(validPlaylist)).thenReturn(validPlaylist);
        when(mapper.mapToDTO(validPlaylist)).thenReturn(validPlaylistDTO);

        assertThat(validPlaylistDTO).isEqualTo(playlistService.create(validPlaylist));

        verify(playlistRepo, times(1)).save(validPlaylist);
        verify(mapper, times(1)).mapToDTO(validPlaylist);
	}
	
	@Test
	public void deletePlaylistTest() {
		when(playlistRepo.existsById(Mockito.any(Long.class))).thenReturn(true);

        assertThat(true).isEqualTo(playlistService.delete(validPlaylist.getId()));

        verify(playlistRepo, times(1)).existsById(Mockito.any(Long.class));
        verify(playlistRepo, times(1)).deleteById(Mockito.any(Long.class));
	}
	
	@Test
	public void readPlaylistByIdTest() {
		when(playlistRepo.findById(Mockito.anyLong())).thenReturn(Optional.of(validPlaylist));
        when(mapper.mapToDTO(validPlaylist)).thenReturn(validPlaylistDTO);

        assertThat(validPlaylistDTO).isEqualTo(playlistService.read(validPlaylist.getId()));

        verify(playlistRepo, times(1)).findById(Mockito.anyLong());
        verify(mapper, times(1)).mapToDTO(validPlaylist);
	}
}
