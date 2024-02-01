Feature: Clone
	As a Clone
	I want to clone script
	So that I can get cloned one

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Scenario: clone specific count of scripts
		Given create a script
		And set the script's default data
		When clone 2 scripts
		Then get 2 cloned scripts

	Scenario: set cloned script's attribute by source script's attribute
		Given create a script
		And set the script's default data
		And set the script's attribute to n1
		When clone 2 scripts
		Then get 2 cloned scripts' attribute should return n1, n1