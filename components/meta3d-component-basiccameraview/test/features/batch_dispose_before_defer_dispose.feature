Feature: Batch Dispose Before Defer Dispose
	As a Batch Dispose
	I want to dispose basicCameraViews before defer dispose
	So that should contract error

	Background: get contribute and create a state
		Given I get contribute
		And create a state and open debug

	Scenario: if dispose before defer dispose, contract error
		Given create a basicCameraView
		When dispose the basicCameraView
		Then should contract error: "basicCameraView should need disposed"