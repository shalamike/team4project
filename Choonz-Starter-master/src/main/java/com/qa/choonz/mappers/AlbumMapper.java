package com.qa.choonz.mappers;


import com.qa.choonz.persistence.domain.Album;
import com.qa.choonz.rest.dto.AlbumDTO;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AlbumMapper {

    private ModelMapper modelMapper;

    @Autowired
    public AlbumMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public AlbumDTO mapToDTO(Album album) {
        return this.modelMapper.map(album, AlbumDTO.class);
    }

    public Album mapToAlbum(AlbumDTO albumDTO) {
        return this.modelMapper.map(albumDTO, Album.class);
    }

}
