Feature: Batch Dispose After Defer Dispose
	As a Batch Dispose
	I want to dispose arcballCameraControllers after defer dispose
	So that I can dispose them

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Rule: dispose map data

		Scenario: remove from distanceMap, minDistanceMap, phiMap, thetaMap, thetaMarginMap, targetMap, moveSpeedXMap, moveSpeedYMap, rotateSpeedMap, wheelSpeedMap, dirtyMap
			Given create three arcballCameraControllers as arcballCameraController1, arcballCameraController2, arcballCameraController3
			And defer dispose arcballCameraController1
			When dispose the need disposed arcballCameraControllers
			Then should remove arcballCameraController1 from distanceMap, minDistanceMap, phiMap, thetaMap, thetaMarginMap, targetMap, moveSpeedXMap, moveSpeedYMap, rotateSpeedMap, wheelSpeedMap, dirtyMap

		Scenario: remove from gameObjectMap, gameObjectArcballCameraControllerMap
			Given create a gameObject
			And create a arcballCameraController
			And add the arcballCameraController to the gameObject
			And defer dispose the arcballCameraController from the gameObject
			When dispose the need disposed arcballCameraControllers
			Then get the arcballCameraController's gameObjects should return []
			And get the gameObject's arcballCameraController should return empty

	Rule: test add new one after dispose old one

		Scenario: if has disposed one, use disposed index as new index
			Given create two arcballCameraControllers as arcballCameraController1, arcballCameraController2
			And defer dispose arcballCameraController1, arcballCameraController2
			And dispose arcballCameraController1, arcballCameraController2
			When create two arcballCameraControllers as arcballCameraController3, arcballCameraController4
			Then arcballCameraController3 should equal to arcballCameraController2
			And arcballCameraController4 should equal to arcballCameraController1