package com.qa.choonz.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.qa.choonz.persistence.domain.Artist;
import com.qa.choonz.rest.dto.ArtistDTO;
import com.qa.choonz.service.ArtistService;

@RestController
@RequestMapping("/artists")
@CrossOrigin
public class ArtistController {

    private ArtistService service;

    public ArtistController(ArtistService service) {
        super();
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<ArtistDTO> create(@RequestBody Artist artist) {
        return new ResponseEntity<>(this.service.create(artist), HttpStatus.CREATED);
    }

    @GetMapping("/read")
    public ResponseEntity<List<ArtistDTO>> read() {
        return new ResponseEntity<>(this.service.read(), HttpStatus.OK);
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<ArtistDTO> read(@PathVariable long id) {
        return new ResponseEntity<>(this.service.read(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ArtistDTO> update(@RequestBody Artist artist, @PathVariable long id) {
        return new ResponseEntity<>(this.service.update(artist, id), HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable long id) {
        return this.service.delete(id) ? new ResponseEntity<>(true, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
