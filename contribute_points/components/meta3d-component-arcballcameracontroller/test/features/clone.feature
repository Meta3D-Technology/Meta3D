Feature: Clone
	As a Clone
	I want to clone arcballCameraController
	So that I can get cloned one

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Scenario: clone specific count of arcballCameraControllers
		Given create a arcballCameraController
		When clone 2 arcballCameraControllers
		Then get 2 cloned arcballCameraControllers

	Scenario: set cloned arcballCameraController's distance by source arcballCameraController's distance
		Given create a arcballCameraController
		And set the arcballCameraController's distance to d1
		When clone 2 arcballCameraControllers
		Then get 2 cloned arcballCameraControllers' distance should return d1, d1

	Scenario: mark cloned arcballCameraController dirty
		Given create a arcballCameraController
		When clone 2 arcballCameraControllers
		Then get 2 cloned arcballCameraControllers' isDirty should return true, true