package com.qa.choonz.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.qa.choonz.persistence.domain.Genre;
import com.qa.choonz.rest.dto.GenreDTO;
import com.qa.choonz.service.GenreService;

@RestController
@RequestMapping("/genres")
@CrossOrigin
public class GenreController {

    private GenreService service;

    public GenreController(GenreService service) {
        super();
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<GenreDTO> create(@RequestBody Genre genre) {
        return new ResponseEntity<GenreDTO>(this.service.create(genre), HttpStatus.CREATED);
    }

    @GetMapping("/read")
    public ResponseEntity<List<GenreDTO>> read() {
        return new ResponseEntity<List<GenreDTO>>(this.service.read(), HttpStatus.OK);
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<GenreDTO> read(@PathVariable long id) {
        return new ResponseEntity<GenreDTO>(this.service.read(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<GenreDTO> update(@RequestBody Genre genre, @PathVariable long id) {
        return new ResponseEntity<GenreDTO>(this.service.update(genre, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GenreDTO> delete(@PathVariable long id) {
        return this.service.delete(id) ? new ResponseEntity<GenreDTO>(HttpStatus.OK)
                : new ResponseEntity<GenreDTO>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
