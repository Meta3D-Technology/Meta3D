Feature: Clone
	As a Clone
	I want to clone transform
	So that I can get cloned one

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Scenario: clone specific count of transforms
		Given create a transform
		When clone 2 transforms
		Then get 2 cloned transforms

	Scenario: set cloned transform's localPosition by source transform's localPosition
		Given create a transform
		And set the transform's local position to pos1
		When clone 2 transforms
		Then get 2 cloned transforms' local position should return pos1, pos1

	Scenario: set cloned transform's localRotation by source transform's localRotation
		Given create a transform
		And set the transform's local rotation to rotation1
		When clone 2 transforms
		Then get 2 cloned transforms' local rotation should return rotation1, rotation1

	Scenario: set cloned transform's localScale by source transform's localScale
		Given create a transform
		And set the transform's local scale to scale1
		When clone 2 transforms
		Then get 2 cloned transforms' local scale should return scale1, scale1

	Scenario: mark cloned transform dirty
		Given create a transform
		When clone 2 transforms
		Then get 2 cloned transforms' isDirty should return true, true

	Rule: fix bug

		Scenario: source transform and cloned transforms shouldn't affect each other
			Given create a transform as t1
			And set t1's local position to pos1
			When clone 2 transforms as c1, c2
			And set c2's local position to pos2
			Then get t1's local position should return pos1
			And get c1's local position should return pos1
			And get c2's local position should return pos2

