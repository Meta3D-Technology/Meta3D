Feature: Batch Dispose Before Defer Dispose
	As a Batch Dispose
	I want to dispose geometrys before defer dispose
	So that should contract error

	Background: get contribute and create a state
		Given I get contribute
		And create a state and open debug

	Scenario: if dispose before defer dispose, contract error
		Given create a gameObject
		And create a geometry
		And add the geometry to the gameObject
		When dispose the geometry from the gameObject
		Then should contract error: "component should need disposed"