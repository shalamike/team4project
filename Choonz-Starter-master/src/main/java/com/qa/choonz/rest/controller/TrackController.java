package com.qa.choonz.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.rest.dto.TrackDTO;
import com.qa.choonz.service.TrackService;

@RestController
@RequestMapping("/tracks")
@CrossOrigin
public class TrackController {

    private TrackService service;

    public TrackController(TrackService service) {
        super();
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<TrackDTO> create(@RequestBody Track track) {
        return new ResponseEntity<>(this.service.create(track), HttpStatus.CREATED);
    }

    @GetMapping("/read")
    public ResponseEntity<List<TrackDTO>> read() {
        return new ResponseEntity<>(this.service.read(), HttpStatus.OK);
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<TrackDTO> read(@PathVariable long id) {
        return new ResponseEntity<>(this.service.read(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TrackDTO> update(@RequestBody Track track, @PathVariable long id) {
        return new ResponseEntity<>(this.service.update(track, id), HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable long id) {
        return this.service.delete(id) ? new ResponseEntity<>(true, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
