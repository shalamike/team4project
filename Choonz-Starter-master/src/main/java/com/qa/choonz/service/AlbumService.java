package com.qa.choonz.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.qa.choonz.mappers.AlbumMapper;
import org.springframework.stereotype.Service;

import com.qa.choonz.exception.AlbumNotFoundException;
import com.qa.choonz.persistence.domain.Album;
import com.qa.choonz.persistence.repository.AlbumRepository;
import com.qa.choonz.rest.dto.AlbumDTO;

@Service
public class AlbumService {

    private AlbumRepository repo;
    private AlbumMapper albumMapper;

    public AlbumService(AlbumRepository repo, AlbumMapper albumMapper) {
        super();
        this.repo = repo;
        this.albumMapper = albumMapper;
    }

    public AlbumDTO create(Album album) {
        Album created = this.repo.save(album);
        return albumMapper.mapToDTO(created);
    }

    public List<AlbumDTO> read() {

    	return this.repo.findAll().stream().map(albumMapper::mapToDTO).collect(Collectors.toList());

    }

    public AlbumDTO read(long id) {
        Album found = this.repo.findById(id).orElseThrow(AlbumNotFoundException::new);
        return albumMapper.mapToDTO(found);
    }

    public AlbumDTO update(Album album, long id) {
        Album toUpdate = this.repo.findById(id).orElseThrow(AlbumNotFoundException::new);
        toUpdate.setName(album.getName());
        toUpdate.setTracks(album.getTracks());
        toUpdate.setArtists(album.getArtists());
        toUpdate.setGenre(album.getGenre());
        toUpdate.setCover(album.getCover());
        Album updated = this.repo.save(toUpdate);
        return albumMapper.mapToDTO(updated);
    }

    public boolean delete(long id) {
		if (repo.existsById(id)) {
			repo.deleteById(id);
			
			return true;
		} else {
			throw new AlbumNotFoundException();
		}
    }

}
