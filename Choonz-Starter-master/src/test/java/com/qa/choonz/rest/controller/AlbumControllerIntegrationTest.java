package com.qa.choonz.rest.controller;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.choonz.mappers.AlbumMapper;
import com.qa.choonz.persistence.domain.Album;
import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.rest.dto.AlbumDTO;
import com.qa.choonz.rest.dto.TrackDTO;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@AutoConfigureMockMvc
@Sql(scripts = {"classpath:test-data.sql"},
        executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "classpath:test-teardown.sql", executionPhase = ExecutionPhase.AFTER_TEST_METHOD)
public class AlbumControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;
    
    @Autowired
    private ObjectMapper objectMapper;

    private AlbumDTO validAlbumDTO = new AlbumDTO(1, "issa", new ArrayList<TrackDTO>());
    private List<AlbumDTO> validAlbumDTOs = List.of(validAlbumDTO);

    @Test
    public void createTest() throws Exception {
        Album albumToSave = new Album("not issa");
        AlbumDTO expectedAlbum = new AlbumDTO(2, "not issa");

        MockHttpServletRequestBuilder mockRequest =
                MockMvcRequestBuilders.request(HttpMethod.POST, "/albums/create");

        mockRequest.contentType(MediaType.APPLICATION_JSON);
        mockRequest.content(objectMapper.writeValueAsString(albumToSave));
        mockRequest.accept(MediaType.APPLICATION_JSON);

        ResultMatcher statusMatcher = MockMvcResultMatchers.status().isCreated();

        ResultMatcher contentMatcher = MockMvcResultMatchers.content()
                .json(objectMapper.writeValueAsString(expectedAlbum));

        mvc.perform(mockRequest)
                .andExpect(statusMatcher)
                .andExpect(contentMatcher);
    }

    @Test
    public void readTest() throws Exception {
        MockHttpServletRequestBuilder mockRequest =
                MockMvcRequestBuilders.request(HttpMethod.GET, "/albums/read");
        mockRequest.accept(MediaType.APPLICATION_JSON);

        ResultMatcher statusMatcher = MockMvcResultMatchers.status().isOk();
        ResultMatcher contentMatcher = MockMvcResultMatchers.content()
                .json(objectMapper.writeValueAsString(validAlbumDTOs));

        mvc.perform(mockRequest)
                .andExpect(statusMatcher)
                .andExpect(contentMatcher);
    }

    @Test
    public void readTestById() throws Exception {
        MockHttpServletRequestBuilder mockRequest =
                MockMvcRequestBuilders.request(HttpMethod.GET, "/albums/read/1");
        mockRequest.accept(MediaType.APPLICATION_JSON);

        ResultMatcher statusMatcher = MockMvcResultMatchers.status().isOk();
        ResultMatcher contentMatcher = MockMvcResultMatchers.content()
                .json(objectMapper.writeValueAsString(validAlbumDTO));

        mvc.perform(mockRequest)
                .andExpect(statusMatcher)
                .andExpect(contentMatcher);
    }

    @Test
    public void updateTest() throws Exception {
        Album updatedAlbum = new Album("UpdatedName");
        AlbumDTO expectedAlbum = new AlbumDTO(1, "UpdatedName");

        MockHttpServletRequestBuilder mockRequest =
                MockMvcRequestBuilders.request(HttpMethod.PUT, "/albums/update/1");

        mockRequest.contentType(MediaType.APPLICATION_JSON);
        mockRequest.content(objectMapper.writeValueAsString(updatedAlbum));

        mockRequest.accept(MediaType.APPLICATION_JSON);

        ResultMatcher statusMatcher = MockMvcResultMatchers.status().isOk();

        ResultMatcher contentMatcher = MockMvcResultMatchers.content()
                .json(objectMapper.writeValueAsString(expectedAlbum));

        mvc.perform(mockRequest)
                .andExpect(statusMatcher)
                .andExpect(contentMatcher);
    }

    @Test
    public void deleteTest() throws Exception {
        MockHttpServletRequestBuilder mockRequest =
                MockMvcRequestBuilders.request(HttpMethod.DELETE, "/albums/delete/1");
        mockRequest.accept(MediaType.APPLICATION_JSON);

        ResultMatcher statusMatcher = MockMvcResultMatchers.status().isOk();
        ResultMatcher contentMatcher = MockMvcResultMatchers.content().string("true");

        mvc.perform(mockRequest)
                .andExpect(statusMatcher)
                .andExpect(contentMatcher);
    }
    
}
