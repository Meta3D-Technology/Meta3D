Feature: Clone
	As a Clone
	I want to clone basicCameraView
	So that I can get cloned one

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Scenario: clone specific count of basicCameraViews
		Given create a basicCameraView
		When clone 2 basicCameraViews
		Then get 2 cloned basicCameraViews

	Scenario: set cloned basicCameraView's isActive to false
		Given create a basicCameraView
		And set the basicCameraView's isActive to true
		When clone 2 basicCameraViews
		Then get 2 cloned basicCameraViews' isActive should return false, false