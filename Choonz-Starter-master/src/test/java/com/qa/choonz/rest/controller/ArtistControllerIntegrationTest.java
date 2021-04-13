package com.qa.choonz.rest.controller;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.choonz.persistence.domain.Artist;
import com.qa.choonz.rest.dto.ArtistDTO;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(scripts = { "classpath:test-schema.sql", "classpath:test-data.sql" },
        executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
public class ArtistControllerIntegrationTest {
	
    @Autowired
    private MockMvc mvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    private Artist validArtist = new Artist("Test");
    private ArtistDTO validArtistDTO = new ArtistDTO(1, "Test");
    
    private List<ArtistDTO> validArtistDTOs = List.of(validArtistDTO);
	
    @Test
    public void createTest() throws Exception {
        Artist artistToSave = new Artist("New Artist");
        ArtistDTO expectedArtist = new ArtistDTO(1, "New Artist");

        MockHttpServletRequestBuilder mockRequest =
                MockMvcRequestBuilders.request(HttpMethod.POST, "/artists/create");

        mockRequest.contentType(MediaType.APPLICATION_JSON);
        mockRequest.content(objectMapper.writeValueAsString(artistToSave));
        mockRequest.accept(MediaType.APPLICATION_JSON);

        ResultMatcher statusMatcher = MockMvcResultMatchers.status().isCreated();

        ResultMatcher contentMatcher = MockMvcResultMatchers.content()
                .json(objectMapper.writeValueAsString(expectedArtist));

        mvc.perform(mockRequest)
                .andExpect(statusMatcher)
                .andExpect(contentMatcher);
    }
    
    @Test
    public void readTest() throws Exception {
        MockHttpServletRequestBuilder mockRequest =
                MockMvcRequestBuilders.request(HttpMethod.GET, "/artists/read");
        mockRequest.accept(MediaType.APPLICATION_JSON);

        ResultMatcher statusMatcher = MockMvcResultMatchers.status().isOk();
        ResultMatcher contentMatcher = MockMvcResultMatchers.content()
                .json(objectMapper.writeValueAsString(validArtistDTOs));

        mvc.perform(mockRequest)
                .andExpect(statusMatcher)
                .andExpect(contentMatcher);
    }
    
    @Test
    public void readTestById() throws Exception {
        MockHttpServletRequestBuilder mockRequest =
                MockMvcRequestBuilders.request(HttpMethod.GET, "/artists/read/1");
        mockRequest.accept(MediaType.APPLICATION_JSON);

        ResultMatcher statusMatcher = MockMvcResultMatchers.status().isOk();
        ResultMatcher contentMatcher = MockMvcResultMatchers.content()
                .json(objectMapper.writeValueAsString(validArtistDTO));

        mvc.perform(mockRequest)
                .andExpect(statusMatcher)
                .andExpect(contentMatcher);
    }
    
    @Test
    public void updateTest() throws Exception {
        Artist updatedArtist = new Artist("UpdatedName");
        ArtistDTO expectedArtist = new ArtistDTO(1, "UpdatedName");

        MockHttpServletRequestBuilder mockRequest =
                MockMvcRequestBuilders.request(HttpMethod.PUT, "/artists/update/1");

        mockRequest.contentType(MediaType.APPLICATION_JSON);
        mockRequest.content(objectMapper.writeValueAsString(updatedArtist));

        mockRequest.accept(MediaType.APPLICATION_JSON);

        ResultMatcher statusMatcher = MockMvcResultMatchers.status().isOk();

        ResultMatcher contentMatcher = MockMvcResultMatchers.content()
                .json(objectMapper.writeValueAsString(expectedArtist));

        mvc.perform(mockRequest)
                .andExpect(statusMatcher)
                .andExpect(contentMatcher);
    }
    
    @Test
    public void deleteTest() throws Exception {
        MockHttpServletRequestBuilder mockRequest =
                MockMvcRequestBuilders.request(HttpMethod.DELETE, "/artists/delete/1");
        mockRequest.accept(MediaType.APPLICATION_JSON);

        ResultMatcher statusMatcher = MockMvcResultMatchers.status().isOk();
        ResultMatcher contentMatcher = MockMvcResultMatchers.content().string("true");

        mvc.perform(mockRequest)
                .andExpect(statusMatcher)
                .andExpect(contentMatcher);
    }
    
}
