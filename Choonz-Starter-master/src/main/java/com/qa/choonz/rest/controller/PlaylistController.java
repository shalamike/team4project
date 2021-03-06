package com.qa.choonz.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.qa.choonz.persistence.domain.Playlist;
import com.qa.choonz.rest.dto.PlaylistDTO;
import com.qa.choonz.service.PlaylistService;

@RestController
@RequestMapping("/playlists")
@CrossOrigin
public class PlaylistController {

    private PlaylistService service;

    public PlaylistController(PlaylistService service) {
        super();
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<PlaylistDTO> create(@RequestBody Playlist playlist) {
        return new ResponseEntity<>(this.service.create(playlist), HttpStatus.CREATED);
    }

    @GetMapping("/read")
    public ResponseEntity<List<PlaylistDTO>> read() {
        return new ResponseEntity<>(this.service.read(), HttpStatus.OK);
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<PlaylistDTO> read(@PathVariable long id) {
        return new ResponseEntity<>(this.service.read(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PlaylistDTO> update(@RequestBody Playlist playlist, @PathVariable long id) {
        return new ResponseEntity<>(this.service.update(playlist, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable long id) {
        return this.service.delete(id) ? new ResponseEntity<>(true, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
