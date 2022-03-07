Feature: Batch Dispose After Defer Dispose
	As a Batch Dispose
	I want to batch dispose transforms after defer dispose
	So that I can batch dispose them

	Background: get contribute and create a state
		When I get contribute
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


	# Rule: dispose map data

	# 	Scenario: remove from parentMap, childMap,  dirtyMap, gameObjectMap

	# Rule: remove from type array

	# 	Scenario: remove from localToWorldMatrices

	# 	Scenario: remove from localPositions

	# 	Scenario: remove from localRotations

	# 	Scenario: remove from localScales

	# Rule: test add new one after dispose old one

	# 	Scenario: if has disposed one, use disposed index(transform) as new index

	# 	Scenario: if has disposed one, new one can get default localPosition

	# 	Scenario: else, increase state.index

	# Rule: fix bug

	# 	Scenario: new one should has default position