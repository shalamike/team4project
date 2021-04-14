#Author: your.email@your.domain.com
#Keywords Summary :
#Feature: List of scenarios.
#Scenario: Business rule through list of steps with arguments.
#Given: Some precondition step
#When: Some key actions
#Then: To observe outcomes or validation
#And,But: To enumerate more Given,When,Then steps
#Scenario Outline: List of steps for data-driven as an Examples and <placeholder>
#Examples: Container for s table
#Background: List of steps run before each of the scenarios
#""" (Doc Strings)
#| (Data Tables)
#@ (Tags/Labels):To group Scenarios
#<> (placeholder)
#""
## (Comments)
#Sample Feature Definition Template
#@tag

Feature: Navigating the page

  
  Scenario: navigating from the home page to the Albums page
    Given the website has just been opened
    
    When user clicks on the Albums tag
    
    Then Web page navigates to the Albums page
    
  Scenario: navigating from the home page to the Artists page
    Given the website has just been opened
    
    When user clicks on the artists tag
    
    Then Web page navigates to the artists page
    
  Scenario: navigating from the home page to the Tracks page
    Given the website has just been opened
    
    When user clicks on the artists tag
    
    Then Web page navigates to the Tracks page
    
	Scenario: navigating from the home page to the Playlists page
    Given the website has just been opened
    
    When user clicks on the Playlists tag
    
    Then Web page navigates to the Playlists page

	Scenario: navigating from the home page to the Genres page
    Given the website has just been opened
    
    When user clicks on the Genre tag
    
    Then Web page navigates to the genre page
