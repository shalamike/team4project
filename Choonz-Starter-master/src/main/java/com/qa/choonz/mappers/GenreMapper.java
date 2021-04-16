package com.qa.choonz.mappers;

import com.qa.choonz.persistence.domain.Genre;
import com.qa.choonz.rest.dto.GenreDTO;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GenreMapper {

    private ModelMapper modelMapper;

    @Autowired
    public GenreMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public GenreDTO mapToDTO(Genre genre) {
        return this.modelMapper.map(genre, GenreDTO.class);
    }

    public Genre mapToGenre(GenreDTO genreDTO) {
        return this.modelMapper.map(genreDTO, Genre.class);
    }

}
