Feature: Batch Dispose After Defer Dispose
	As a Batch Dispose
	I want to dispose transforms before defer dispose
	So that should contract error

	Background: get contribute and create a state
		Given I get contribute
		And create a state and open debug

	Scenario: if dispose before defer dispose, contract error
		Given create a gameObject
		When dispose the gameObject
		Then should contract error: "gameObject should need disposed"