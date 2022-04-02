Feature: Batch Dispose After Defer Dispose
	As a Batch Dispose
	I want to dispose perspectiveCameraProjections after defer dispose
	So that I can dispose them

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Rule: dispose map data

		Scenario: remove from nearMap, farMap, fovyMap, aspectMap, pMatrixMap, dirtyMap
			Given create three perspectiveCameraProjections as perspectiveCameraProjection1, perspectiveCameraProjection2, perspectiveCameraProjection3
			And set perspectiveCameraProjection1's near, far, fovy, aspect, pMatrix
			And defer dispose perspectiveCameraProjection1
			When dispose the need disposed perspectiveCameraProjections
			Then should remove perspectiveCameraProjection1 from nearMap, farMap, fovyMap, aspectMap, pMatrixMap, dirtyMap

		Scenario: remove from gameObjectMap, gameObjectPerspectiveCameraProjectionMap
			Given create a gameObject
			And create a perspectiveCameraProjection
			And add the perspectiveCameraProjection to the gameObject
			And defer dispose the perspectiveCameraProjection from the gameObject
			When dispose the need disposed perspectiveCameraProjections
			Then get the perspectiveCameraProjection's gameObjects should return []
			And get the gameObject's perspectiveCameraProjection should return empty

	Rule: test add new one after dispose old one

		Scenario: if has disposed one, use disposed index as new index
			Given create two perspectiveCameraProjections as perspectiveCameraProjection1, perspectiveCameraProjection2
			And defer dispose perspectiveCameraProjection1, perspectiveCameraProjection2
			And dispose perspectiveCameraProjection1, perspectiveCameraProjection2
			When create two perspectiveCameraProjections as perspectiveCameraProjection3, perspectiveCameraProjection4
			Then perspectiveCameraProjection3 should equal to perspectiveCameraProjection2
			And perspectiveCameraProjection4 should equal to perspectiveCameraProjection1