Feature: NavigateOnChoonz

Background: 
Given I can access Choonz

Scenario: Navigating using the header
# artists page
    When user clicks on the artists tab
    
    Then user accecesses artists
#albums page
	When user clicks on albums tab
	
	Then user accecesses albums
	
#Playlists page
	When User clicks on playlists page
	
	Then user accesses playlists

#tracks page
	When user clicsk on tracks page
	
	Then user accesses tracks
	
#Genres page
	When user clicks on genres page
	
	Then user accesses genres page

Scenario: entering data

	Given user goes to artists page
	
	When user clicks on create Artist
	
	Then user clicks read artists
	
	When user updates artist
	
	Then user clicks read artists again
	
	When user deletes artist
	
	Then user clicks read artist for the last time

	
	