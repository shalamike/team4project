package com.qa.choonz.rest.controller;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.request;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
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
import com.qa.choonz.mappers.TrackMapper;
import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.rest.dto.TrackDTO;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(scripts = {"classpath:test-schema.sql", "classpath:test-data.sql"},
				executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
public class TrackControllerIntegrationTest {
	
	@Autowired
	private MockMvc mock;
	
	@Autowired
	private TrackMapper trackMapper;
	
	@Autowired
	private ObjectMapper mapper;
	
	private final Track TEST_TRACK_FROM_DB = new Track(1L, "Track");
	
	@Test
	void createTest() throws Exception {
		final Track NEW_TRACK = new Track("NewTrack");
		MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.request(HttpMethod.POST, "/tracks/create");
		mockRequest.contentType(MediaType.APPLICATION_JSON);
		mockRequest.content(this.mapper.writeValueAsString(NEW_TRACK));
		mockRequest.accept(MediaType.APPLICATION_JSON);
		
		final Track SAVED_TRACK = new Track(2L, NEW_TRACK.getName());
		
		ResultMatcher statusMatcher = MockMvcResultMatchers.status().isCreated();
		ResultMatcher contentMatcher = MockMvcResultMatchers.content()
				.json(this.mapper.writeValueAsString(trackMapper.mapToDTO(SAVED_TRACK)));
		this.mock.perform(mockRequest).andExpect(statusMatcher).andExpect(contentMatcher);
	}
	
	@Test
	void readTest() throws Exception {
		List<TrackDTO> trackList = new ArrayList<>();
		trackList.add(trackMapper.mapToDTO(TEST_TRACK_FROM_DB));

		String content = this.mock.perform(request(HttpMethod.GET, "/tracks/read").accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

		assertEquals(this.mapper.writeValueAsString(trackList), content);
	}
	
	@Test
	void updateTest() throws Exception {
		TrackDTO newTrack = new TrackDTO(1L, "newTrack");
		TrackDTO updatedTrack = new TrackDTO(this.TEST_TRACK_FROM_DB.getId(), this.TEST_TRACK_FROM_DB.getName());

		String result = this.mock
				.perform(request(HttpMethod.PUT, "/tracks/update/" + this.TEST_TRACK_FROM_DB.getId())
						.accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)
						.content(this.mapper.writeValueAsString(newTrack)))
				.andExpect(status().isAccepted()).andReturn().getResponse().getContentAsString();

		assertEquals(this.mapper.writeValueAsString(updatedTrack), result);
	}
	
	@Test
	void deleteTest() throws Exception {
		this.mock.perform(request(HttpMethod.DELETE, "/tracks/delete/" + this.TEST_TRACK_FROM_DB.getId()))
				.andExpect(status().isNoContent());
	}
}
