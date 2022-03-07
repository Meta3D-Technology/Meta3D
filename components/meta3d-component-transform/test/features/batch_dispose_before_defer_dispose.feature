Feature: Batch Dispose After Defer Dispose
	As a Batch Dispose
	I want to batch dispose transforms before defer dispose
	So that should contract error

	Background: get contribute and create a state
		Given I get contribute
		And create a state and open debug

	Scenario: disposed transform shouldn't affect other alive ones' data
		Given create a transform
		When dispose the transform
		Then should contract error: "component should need disposed"