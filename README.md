# team4project - Choonz

This project contains a front end and back end, where the back end is an API, that can perform all CRUD functionalities in Postman. This back end is also connected to a front end,
which is a website with links, and buttons to submit forms on the website. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
See deployment for notes on how to deploy the project on a live system.

### Prerequisites
## BackEnd

Java Eclipse IDE,
Maven,
Spring Boot,
Selenium,
Cucumber,
Gherikin,
SonarQube

## Front-end
Visual Studio Code

### Installing
1. Clone repository to any folder you like in your device from branch: master
2. Open Eclipse IDE
3. Go to File ---> Open projects from File System, find To-Do-List and click into it, 
   and click finish (this will import the project into your Eclipse IDE so you can edit it as you wish)
4. Run 'mvn package' to compile the project in the command line from the To-Do-List folder. 
5. Run 'mvn Spring-boot:run' to actually run the project
6. You can then run use 'Open with live server' to run the website, which will use the API functions (make sure the API is running in the background)
7. All Set!

### Running the tests
The testing has unit tests and integration tests, user-acceptance tests and non functional tests which cover the majority of the code with passing tests. 
To run the tests, in Eclipse, right click on the project folder, and click 'coverage as' and choose 'JUnit Tests'
This will then run all the tests and produce a coverage, and show how much of each class has been covered.

### Running user acceptance tests
As above, except run the Cucumber_Example_One-main project in eclipse.

### Running the non-functional tests
To run the non functional tests, in the command line from the bin folder of jmeter, runt he command 
jmeter -n -t [pathing of where your files are saved to the 'JMeterTests' folder]\[name of the test you want to run] -l [pathing of where your files are saved to the 'JMeterTests' folder]\[where you want to save the reports]/[name of the report]
-e -o [pathing of where your files are saved to the 'JMeterTests' folder]\[new folder name for html reports]

P.S There is already a folder containing hemlt reports for each specific non-functional test

## Deployment
Once mvn package has been run in the command line (from the Choonz folder itself) there will be a target folder in the Choonz folder, which you then want to run the command line from inside here.
Once you are in the command line in this folder, run the command 'java -jar ims-0.0.1-jar-with-dependencies.jar file.
This will then open the project as in the command line as if you are running the project in the console in Eclipse.
(If you want to run it in eclipse, find the runner.java file in the com.qa.ims package as a java application and it will have the same effect)

## Built With
Maven - Dependency Management
Spring Boot - Auto Configuration
Selenium/Cucumber/Gherkin - Auto Front end Testing
JMeter - non functional testing

## Versioning
We use git for versioning.

## Acknowledgments
* Hat tip to Edward Reynolds and Morgan Walsh for the support!

