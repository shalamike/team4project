package com.qa.choonz.mappers;

import com.qa.choonz.persistence.domain.Playlist;
import com.qa.choonz.rest.dto.PlaylistDTO;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlaylistMapper {

    private ModelMapper modelMapper;

    @Autowired
    public PlaylistMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public PlaylistDTO mapToDTO(Playlist playlist) {
        return this.modelMapper.map(playlist, PlaylistDTO.class);
    }

    public Playlist mapToPlaylist(PlaylistDTO playlistDTO) {
        return this.modelMapper.map(playlistDTO, Playlist.class);
    }

}
