package com.qa.choonz.mappers;

import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.rest.dto.TrackDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TrackMapper {

    private ModelMapper modelMapper;

    @Autowired
    public TrackMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public TrackDTO mapToDTO(Track track) {
        return this.modelMapper.map(track, TrackDTO.class);
    }

    public Track mapToTrack(TrackDTO trackDTO) {
        return this.modelMapper.map(trackDTO, Track.class);
    }

}
