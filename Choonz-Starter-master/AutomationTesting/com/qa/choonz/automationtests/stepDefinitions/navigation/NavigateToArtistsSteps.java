package com.qa.choonz.automationtests.stepDefinitions.navigation;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class NavigateToArtistsSteps {
	
	@Given("^the website has just been opened$")
	public void the_website_has_just_been_opened() throws Throwable{
		//test open webpage
		System.out.println("accessed website through the web browser");
	}
	
	@When("^user clicks on the artists tag$")
	public void user_clicks_on_the_artists_tag() throws Throwable{
		System.out.println("clicked on the artissts tab");
	}
	
	@Then("^Web page navigates to the artists page$")
	public void web_page_navigates_to_the_artists_page() throws Throwable{
		System.out.println("should navigate to the artists page");
	}
}
