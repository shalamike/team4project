package com.qa.choonz.service;

import java.util.List;
import java.util.stream.Collectors;

import com.qa.choonz.mappers.PlaylistMapper;
import org.springframework.stereotype.Service;

import com.qa.choonz.exception.PlaylistNotFoundException;
import com.qa.choonz.persistence.domain.Playlist;
import com.qa.choonz.persistence.repository.PlaylistRepository;
import com.qa.choonz.rest.dto.PlaylistDTO;

@Service
public class PlaylistService {

    private PlaylistRepository repo;
    private PlaylistMapper playlistMapper;

    public PlaylistService(PlaylistRepository repo, PlaylistMapper playlistMapper) {
        super();
        this.repo = repo;
        this.playlistMapper = playlistMapper;
    }

    public PlaylistDTO create(Playlist playlist) {
        Playlist created = this.repo.save(playlist);
        return playlistMapper.mapToDTO(created);
    }

    public List<PlaylistDTO> read() {
        return this.repo.findAll().stream().map(playlistMapper::mapToDTO).collect(Collectors.toList());
    }

    public PlaylistDTO read(long id) {
        Playlist found = this.repo.findById(id).orElseThrow(PlaylistNotFoundException::new);
        return playlistMapper.mapToDTO(found);
    }

    public PlaylistDTO update(Playlist playlist, long id) {
        Playlist toUpdate = this.repo.findById(id).orElseThrow(PlaylistNotFoundException::new);
        toUpdate.setName(playlist.getName());
        toUpdate.setDescription(playlist.getDescription());
        toUpdate.setArtwork(playlist.getArtwork());
        toUpdate.setTracks(playlist.getTracks());
        Playlist updated = this.repo.save(toUpdate);
        return playlistMapper.mapToDTO(updated);
    }

    public boolean delete(long id) {
        this.repo.deleteById(id);
        return !this.repo.existsById(id);
    }

}
