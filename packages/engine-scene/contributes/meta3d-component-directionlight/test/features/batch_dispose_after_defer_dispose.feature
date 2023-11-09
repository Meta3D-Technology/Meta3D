Feature: Batch Dispose After Defer Dispose
	As a Batch Dispose
	I want to dispose directionLights after defer dispose
	So that I can dispose them

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Rule: dispose map data

		Scenario: remove from gameObjectMap, gameObjectDirectionLightMap
			Given create a gameObject
			And create a directionLight
			And add the directionLight to the gameObject
			And defer dispose the directionLight from the gameObject
			When dispose the need disposed directionLights
			Then get the directionLight's gameObjects should return []
			And get the gameObject's directionLight should return empty

	Rule: remove from colors

		Scenario: reset removed one's value in colors
			Given create two directionLights as directionLight1, directionLight2
			And set directionLight1's color to c1
			And set directionLight2's color to c2
			And defer dispose directionLight1
			When dispose the need disposed directionLights
			Then get directionLight1's color should return default data
			And get directionLight2's color should return c2

	Rule: remove from intensities

		Scenario: reset removed one's value in intensities
			Given create two directionLights as directionLight1, directionLight2
			And set directionLight1's intensity to i1
			And set directionLight2's intensity to i2
			And defer dispose directionLight1
			When dispose the need disposed directionLights
			Then get directionLight1's intensity should return default data
			And get directionLight2's intensity should return i2

	Rule: test add new one after dispose old one

		Scenario: if has disposed one, use disposed index as new index
			Given create two directionLights as directionLight1, directionLight2
			And defer dispose directionLight1, directionLight2
			And dispose directionLight1, directionLight2
			When create two directionLights as directionLight3, directionLight4
			Then directionLight3 should equal to directionLight2
			And directionLight4 should equal to directionLight1