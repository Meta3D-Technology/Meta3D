Feature: Batch Dispose After Defer Dispose
	As a Batch Dispose
	I want to dispose transforms after defer dispose
	So that I can dispose them

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Scenario: disposed transform shouldn't affect other alive ones' data
		Given create two transforms as transform1, transform2
		And set transform1's local position to pos1
		And set transform2's local position to pos2
		And defer dispose transform1
		When dispose transform1
		Then get transform2's local position should return pos2

	Rule: if child is disposed

		Background: prepare transform
			Given create two transforms as transform1, transform2
			And set transform2's parent to transform1

		Scenario: should remove it from childrenMap
			Given defer dispose transform2
			When dispose transform2
			Then get transform1's children should return []

		Scenario: shouldn't affect parent if disposed one has no parent
			Given set transform1's local position to pos1
			And set transform2's local position to pos2
			And defer dispose transform1
			When dispose transform1
			Then get transform2's position should return pos2

		Scenario: shouldn't affect parent if disposed one has parent
			Given create a transform as transform3
			And set transform1's parent to transform3
			And set transform1's local position to pos1
			And set transform2's local position to pos2
			And set transform3's local position to pos3
			And defer dispose transform2
			When dispose transform2
			Then get transform1's position should return pos1 + pos3
			And get transform3's position should return pos3

	Rule: if parent is disposed

		Background: prepare transform
			Given create two transforms as transform1, transform2
			And set transform2's parent to transform1

		Scenario: should remove it from parentMap
			Given set transform1's local position to pos1
			And defer dispose transform1
			When dispose transform1
			Then get transform2's parent should return empty

		Scenario: should affect children
			Given create a transform as transform3
			And set transform1's parent to transform3
			And set transform1's local position to pos1
			And set transform2's local position to pos2
			And set transform3's local position to pos3
			And defer dispose transform3
			When dispose transform3
			Then get transform1's position should return pos1
			And get transform2's position should return pos1 + pos2

	Rule: dispose map data

		Scenario: remove from parentMap, childMap, dirtyMap
			Given create three transforms as transform1, transform2, transform3
			And set transform1's parent to transform2
			And set transform3's parent to transform1
			And defer dispose transform1
			When dispose transform1
			Then should remove transform1 from state.parentMap, state.childrenMap, state.dirtyMap

		Scenario: remove from gameObjectMap, gameObjectTransformMap
			Given create a gameObject
			And create a transform
			And add the transform to the gameObject
			And defer dispose the transform from the gameObject
			When dispose the transform
			Then get the transform's gameObjects should return []
			And get the gameObject's transform should return empty

	Rule: remove from localToWorldMatrices

		Scenario: reset removed one's value in localToWorldMatrices
			Given create two transforms as transform1, transform2
			And set transform1's localToWorld matrix to mat1
			And set transform2's localToWorld matrix to mat2
			And defer dispose transform1
			When dispose transform1
			Then get transform1's localToWorld matrix should return default data
			And get transform2's localToWorld matrix should return mat2

	Rule: remove from localPositions

		Scenario: reset removed one's value in localPositions
			Given create two transforms as transform1, transform2
			And set transform1's local position to pos1
			And set transform2's local position to pos2
			And defer dispose transform1
			When dispose transform1
			Then get transform1's local position should return default data
			And get transform2's local position should return pos2

	Rule: remove from localRotations

		Scenario: reset removed one's value in localRotations
			Given create two transforms as transform1, transform2
			And set transform1's local rotation to rotation1
			And set transform2's local rotation to rotation2
			And defer dispose transform1
			When dispose transform1
			Then get transform1's local rotation should return default data
			And get transform2's local rotation should return rotation2

	Rule: remove from localScales

		Scenario: reset removed one's value in localScales
			Given create two transforms as transform1, transform2
			And set transform1's local scale to scale1
			And set transform2's local scale to scale2
			And defer dispose transform1
			When dispose transform1
			Then get transform1's local scale should return default data
			And get transform2's local scale should return scale2

	Rule: test add new one after dispose old one

		Scenario: if has disposed one, use disposed index as new index
			Given create two transforms as transform1, transform2
			And defer dispose transform1, transform2
			And dispose transform1, transform2
			When create two transforms as transform3, transform4
			Then transform3 should equal to transform2
			And transform4 should equal to transform1

		Scenario: if has disposed one, new one can get default localPosition
			Given create a transform as transform1
			And set transform1's local position to pos1
			And defer dispose transform1
			And dispose transform1
			When create a transform as transform2
			Then get transform2's local position should return default data

		Scenario: else, increase state.index
			Given create two transforms as transform1, transform2
			When create a transform as transform3
			Then transform3 should equal to transform2 + 1

	Rule: fix bug

		Scenario: new one should has default position
			Given create two transforms as transform1, transform2
			And set transform1's local position to pos1
			Then get transform1's position
			And defer dispose transform1
			And dispose transform1
			When create a transform as transform3
			Then get transform3's local position should return default data
			And get transform3's position should return default data

		Scenario: should remove disposed transforms from needDisposedTransforms
			Given create two transforms as transform1, transform2
			And defer dispose transform1
			And defer dispose transform2
			When dispose transform1
			Then get need disposed transforms should return [transform2]
