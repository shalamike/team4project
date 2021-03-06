package com.qa.choonz.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.qa.choonz.mappers.ArtistMapper;
import org.springframework.stereotype.Service;

import com.qa.choonz.exception.ArtistNotFoundException;
import com.qa.choonz.persistence.domain.Artist;
import com.qa.choonz.persistence.repository.ArtistRepository;
import com.qa.choonz.rest.dto.ArtistDTO;

@Service
public class ArtistService {

    private ArtistRepository repo;
    private ArtistMapper artistMapper;

    public ArtistService(ArtistRepository repo, ArtistMapper artistMapper) {
        super();
        this.repo = repo;
        this.artistMapper = artistMapper;
    }

    public ArtistDTO create(Artist artist) {
        Artist created = this.repo.save(artist);
        return artistMapper.mapToDTO(created);
    }

    public List<ArtistDTO> read() {
        Stream<ArtistDTO> test = this.repo.findAll().stream().map(artistMapper::mapToDTO);
        return	test.collect(Collectors.toList());
    }

    public ArtistDTO read(long id) {
        Artist found = this.repo.findById(id).orElseThrow(ArtistNotFoundException::new);
        return artistMapper.mapToDTO(found);
    }

    public ArtistDTO update(Artist artist, long id) {
        Artist toUpdate = this.repo.findById(id).orElseThrow(ArtistNotFoundException::new);
        toUpdate.setName(artist.getName());
        toUpdate.setAlbums(artist.getAlbums());
        Artist updated = this.repo.save(toUpdate);
        return artistMapper.mapToDTO(updated);
    }

    public boolean delete(long id) {
		if (repo.existsById(id)) {
			repo.deleteById(id);
			return true;
		} else {
			throw new ArtistNotFoundException();
		}
    }
}
