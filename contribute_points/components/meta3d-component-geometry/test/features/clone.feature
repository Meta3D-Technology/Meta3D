Feature: Clone
	As a Clone
	I want to clone geometry
	So that I can get cloned one

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Scenario: cloned one is source one
		Given create a geometry
		When clone 2 geometrys
		Then get 2 cloned geometrys should be source one
