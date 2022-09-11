Feature: Batch Dispose After Defer Dispose
	As a Batch Dispose
	I want to dispose basicCameraViews after defer dispose
	So that I can dispose them

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Rule: dispose map data

		Scenario: remove from isActiveMap
			Given create three basicCameraViews as basicCameraView1, basicCameraView2, basicCameraView3
			And set basicCameraView1's isActive
			And defer dispose basicCameraView1
			When dispose the need disposed basicCameraViews
			Then should remove basicCameraView1 from isActiveMap

		Scenario: remove from gameObjectMap, gameObjectBasicCameraViewMap
			Given create a gameObject
			And create a basicCameraView
			And add the basicCameraView to the gameObject
			And defer dispose the basicCameraView from the gameObject
			When dispose the need disposed basicCameraViews
			Then get the basicCameraView's gameObjects should return []
			And get the gameObject's basicCameraView should return empty

	Rule: test add new one after dispose old one

		Scenario: if has disposed one, use disposed index as new index
			Given create two basicCameraViews as basicCameraView1, basicCameraView2
			And defer dispose basicCameraView1, basicCameraView2
			And dispose basicCameraView1, basicCameraView2
			When create two basicCameraViews as basicCameraView3, basicCameraView4
			Then basicCameraView3 should equal to basicCameraView2
			And basicCameraView4 should equal to basicCameraView1