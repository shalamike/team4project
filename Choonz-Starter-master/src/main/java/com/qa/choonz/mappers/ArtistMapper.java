package com.qa.choonz.mappers;

import com.qa.choonz.persistence.domain.Artist;
import com.qa.choonz.rest.dto.ArtistDTO;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ArtistMapper {

    private ModelMapper modelMapper;

    @Autowired
    private ArtistMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ArtistDTO mapToDTO(Artist artist) {
        return this.modelMapper.map(artist, ArtistDTO.class);
    }

    public Artist mapToArtist(ArtistDTO artistDTO) {
        return this.modelMapper.map(artistDTO, Artist.class);
    }

}
