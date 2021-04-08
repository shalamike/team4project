package com.qa.choonz.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.qa.choonz.persistence.domain.Album;
import com.qa.choonz.rest.dto.AlbumDTO;
import com.qa.choonz.service.AlbumService;

@RestController
@RequestMapping("/albums")
@CrossOrigin
public class AlbumController {

    private AlbumService service;

    public AlbumController(AlbumService service) {
        super();
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<AlbumDTO> create(@RequestBody Album album) {
        return new ResponseEntity<>(this.service.create(album), HttpStatus.CREATED);
    }

    @GetMapping("/read")
    public ResponseEntity<List<AlbumDTO>> read() {
        return new ResponseEntity<>(this.service.read(), HttpStatus.OK);
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<AlbumDTO> read(@PathVariable("id") long id) {
        return new ResponseEntity<>(this.service.read(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AlbumDTO> update(@RequestBody Album album, @PathVariable("id") long id) {
        return new ResponseEntity<>(this.service.update(album, id), HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") long id) {
        return this.service.delete(id) ? new ResponseEntity<>(true, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
