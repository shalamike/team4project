package com.qa.choonz.rest.controller;

import com.qa.choonz.persistence.domain.Album;

import com.qa.choonz.rest.dto.AlbumDTO;
import com.qa.choonz.service.AlbumService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@SpringBootTest

public class AlbumControllerUnitTest {

    @Autowired
    private AlbumController albumController;

    @MockBean
    private AlbumService albumService;

    private List<Album> albums;
    private List<AlbumDTO> albumDTOs;

    private Album validAlbum;
    private AlbumDTO validAlbumDTO;

    @BeforeEach
    public void init() {
<<<<<<< HEAD:Choonz-Starter-master/src/test/com/qa/choonz/rest/controller/AlbumControllerUnitTest.java
        validAlbum = new Album("Kiss Land");
        validAlbumDTO = new AlbumDTO(1, "Kiss Land");
=======
        validAlbum = new Album("a name");
        validAlbumDTO = new AlbumDTO(1, "a name");
>>>>>>> dev:Choonz-Starter-master/src/test/java/com/qa/choonz/rest/controller/AlbumControllerUnitTest.java

        albums = new ArrayList<>();
        albumDTOs = new ArrayList<>();

        albums.add(validAlbum);
        albumDTOs.add(validAlbumDTO);
    }

    @Test
    public void createAlbumTest() {
        when(albumService.create(Mockito.any(Album.class))).thenReturn(validAlbumDTO);

        ResponseEntity<AlbumDTO> response = new ResponseEntity<>(validAlbumDTO, HttpStatus.CREATED);

        assertThat(response).isEqualTo(albumController.create(validAlbum));

        verify(albumService, times(1)).create(Mockito.any(Album.class));
    }

    @Test
    public void readAlbumTest() {
        when(albumService.read()).thenReturn(albumDTOs);

        ResponseEntity<List<AlbumDTO>> response = new ResponseEntity<>(albumDTOs, HttpStatus.OK);

        assertThat(response).isEqualTo(albumController.read());
        verify(albumService, times(1)).read();
    }

    @Test
    public void readAlbumByIdTest() {
        when(albumService.read(validAlbum.getId())).thenReturn(validAlbumDTO);

        ResponseEntity<AlbumDTO> response = new ResponseEntity<>(validAlbumDTO, HttpStatus.OK);

        ResponseEntity expected = albumController.read(validAlbum.getId());

        assertThat(response).isEqualTo(expected);
        verify(albumService, times(1)).read(validAlbum.getId());
    }

    @Test
    public void updateAlbumTest() {
        Album newAlbum = new Album("what");
        AlbumDTO updatedAlbum = new AlbumDTO(newAlbum.getId(), "Madness");

<<<<<<< HEAD:Choonz-Starter-master/src/test/com/qa/choonz/rest/controller/AlbumControllerUnitTest.java
        when(albumService.update(newAlbum, newAlbum.getId())).thenReturn(updatedAlbum);

        ResponseEntity<AlbumDTO> response = new ResponseEntity<>(updatedAlbum, HttpStatus.OK);
=======
        ResponseEntity<AlbumDTO> response = new ResponseEntity<>(validAlbumDTO, HttpStatus.ACCEPTED);
>>>>>>> dev:Choonz-Starter-master/src/test/java/com/qa/choonz/rest/controller/AlbumControllerUnitTest.java

        assertThat(response).isEqualTo(albumController.update(newAlbum, newAlbum.getId()));

        verify(albumService, times(1)).update(newAlbum, newAlbum.getId());
    }

    @Test
    public void deleteAlbumTest() {
        when(albumService.delete(validAlbum.getId())).thenReturn(true);

        ResponseEntity<Boolean> response = new ResponseEntity<>(true, HttpStatus.OK);

        assertThat(response).isEqualTo(albumController.delete(validAlbum.getId()));

        verify(albumService, times(1)).delete(validAlbum.getId());
    }

}
