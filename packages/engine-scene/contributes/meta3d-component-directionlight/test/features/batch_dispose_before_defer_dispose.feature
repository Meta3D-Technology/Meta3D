Feature: Batch Dispose Before Defer Dispose
	As a Batch Dispose
	I want to dispose directionLights before defer dispose
	So that should contract error

	Background: get contribute and create a state
		Given I get contribute
		And create a state and open debug

	Scenario: if dispose before defer dispose, contract error
		Given create a directionLight
		When dispose the directionLight
		Then should contract error: "directionLight should need disposed"