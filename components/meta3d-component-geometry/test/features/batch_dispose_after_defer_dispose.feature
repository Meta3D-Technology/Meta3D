Feature: Batch Dispose After Defer Dispose
	As a Batch Dispose
	I want to dispose geometrys after defer dispose
	So that I can dispose them

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Rule: test if one geometry has more than one gameObject

		Background: prepare
			Given create three gameObjects as g1, g2, g3
			And create a geometry
			And set geometry's vertices to v1
			And add the geometry to g1
			And add the geometry to g2
			And add the geometry to g3

		Scenario: if not dispose geometry from all gameObjects, not dispose geometry's data
			Given defer dispose the geometry from g1
			When dispose the need disposed geometrys
			Then get the geometry's vertices should return v1

		Scenario: else, dispose geometry's data
			Given defer dispose the geometry from g1, g2, g3
			When dispose the need disposed geometrys
			Then get the geometry's vertices should return []

	Rule: dispose map data

		Scenario: remove from gameObjectMap, gameObjectGeometryMap
			Given create a gameObject
			And create a geometry
			And add the geometry to the gameObject
			And defer dispose the geometry from the gameObject
			When dispose the need disposed geometrys
			Then get the geometry's gameObjects should return []
			And get the gameObject's geometry should return empty

	Rule: reset point data's info

		Scenario: reset point data's info instead of reset point data directly
			Given create a gameObject
			And create a geometry
			And add the geometry to the gameObject
			And set the geometry's vertices to v1
			And set the geometry's normals to n1
			And set the geometry's texCoords to t1
			And set the geometry's indices to i1
			And defer dispose the geometry from the gameObject
			When dispose the need disposed geometrys
			Then get the geometry's vertices, normals, texCoords, indices should all return []