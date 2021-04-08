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

import com.qa.choonz.mappers.AlbumMapper;
import com.qa.choonz.persistence.domain.Album;
import com.qa.choonz.persistence.repository.AlbumRepository;
import com.qa.choonz.rest.dto.AlbumDTO;


@SpringBootTest
public class AlbumServiceUnitTest {
	
	@Autowired
	private AlbumService albumService;
	
	@MockBean
	private AlbumRepository albumRepo;
	
	@MockBean
	private AlbumMapper mapper;
	
	private List<Album> albumList;
	private List<AlbumDTO> albumDTOList;
	
	private Album validAlbum;
	private AlbumDTO validAlbumDTO;
	
	
	@BeforeEach
	public void init() {
		validAlbum = new Album("Come On Over");
		validAlbumDTO = new AlbumDTO(1, "Come On Over");
		
		albumList = new ArrayList<Album>();
		albumDTOList = new ArrayList<AlbumDTO>();
		
		albumList.add(validAlbum);
		albumDTOList.add(validAlbumDTO);
	}
	
	@Test
	public void readAllAlbumsTest() {
		when(albumRepo.findAll()).thenReturn(albumList);
		when(mapper.mapToDTO(validAlbum)).thenReturn(validAlbumDTO);
		
		assertThat(albumDTOList).isEqualTo(albumService.read());
		
		verify(albumRepo, times(1)).findAll();
		verify(mapper, times(1)).mapToDTO(validAlbum);
	}
	
	@Test
	public void updateAlbumTest() {
		Album updatedAlbum = new Album("The Woman In Me");
		AlbumDTO updatedAlbumDTO = new AlbumDTO(1, "The Woman In Me");
		
		when(albumRepo.findById(Mockito.anyLong())).thenReturn(Optional.of(validAlbum));
		when(albumRepo.save(Mockito.any(Album.class))).thenReturn(updatedAlbum);
		when(mapper.mapToDTO(Mockito.any(Album.class))).thenReturn(updatedAlbumDTO);
		
		AlbumDTO testToDTO = albumService.update(updatedAlbum, validAlbum.getId());
		
		assertThat(updatedAlbumDTO).isEqualTo(testToDTO);
	}
	
	@Test
    void createAlbumTest() {
        when(albumRepo.save(validAlbum)).thenReturn(validAlbum);
        when(mapper.mapToDTO(validAlbum)).thenReturn(validAlbumDTO);

        assertThat(validAlbumDTO).isEqualTo(albumService.create(validAlbum));

        verify(albumRepo, times(1)).save(validAlbum);
        verify(mapper, times(1)).mapToDTO(validAlbum);
    }
	
	@Test
    void deleteAlbumTest() {
        when(albumRepo.existsById(Mockito.any(Long.class))).thenReturn(true);

        assertThat(false).isEqualTo(albumService.delete(validAlbum.getId()));

        verify(albumRepo, times(1)).existsById(Mockito.any(Long.class));
        verify(albumRepo, times(1)).deleteById(Mockito.any(Long.class));

    }
	
	 @Test
	 void readAlbumByIdTest(){
			when(albumRepo.findById(Mockito.anyLong())).thenReturn(Optional.of(validAlbum));
	        when(mapper.mapToDTO(validAlbum)).thenReturn(validAlbumDTO);

	        assertThat(validAlbumDTO).isEqualTo(albumService.read(validAlbum.getId()));

	        verify(albumRepo, times(1)).findById(Mockito.anyLong());
	        verify(mapper, times(1)).mapToDTO(validAlbum);
	}
}
