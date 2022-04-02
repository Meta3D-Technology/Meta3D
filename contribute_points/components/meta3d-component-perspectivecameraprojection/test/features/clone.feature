Feature: Clone
	As a Clone
	I want to clone perspectiveCameraProjection
	So that I can get cloned one

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Scenario: clone specific count of perspectiveCameraProjections
		Given create a perspectiveCameraProjection
		And set the perspectiveCameraProjection's default data
		When clone 2 perspectiveCameraProjections
		Then get 2 cloned perspectiveCameraProjections

	Scenario: set cloned perspectiveCameraProjection's near by source perspectiveCameraProjection's near
		Given create a perspectiveCameraProjection
		And set the perspectiveCameraProjection's default data
		And set the perspectiveCameraProjection's near to n1
		When clone 2 perspectiveCameraProjections
		Then get 2 cloned perspectiveCameraProjections' near should return n1, n1

	Scenario: if source perspectiveCameraProjection not has aspect, not set cloned perspectiveCameraProjection's aspect
		Given create a perspectiveCameraProjection
		And set the perspectiveCameraProjection's default data
		When clone 2 perspectiveCameraProjections
		Then get 2 cloned perspectiveCameraProjections' aspect should return empty

	Scenario: mark cloned perspectiveCameraProjection dirty
		Given create a perspectiveCameraProjection
		And set the perspectiveCameraProjection's default data
		When clone 2 perspectiveCameraProjections
		Then get 2 cloned perspectiveCameraProjections' isDirty should return true, true