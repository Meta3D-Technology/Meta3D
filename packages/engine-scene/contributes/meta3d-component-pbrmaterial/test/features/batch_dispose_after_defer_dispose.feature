Feature: Batch Dispose After Defer Dispose
	As a Batch Dispose
	I want to dispose pbrMaterials after defer dispose
	So that I can dispose them

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Rule: test if one pbrMaterial has more than one gameObject

		Background: prepare
			Given create three gameObjects as g1, g2, g3
			And create a pbrMaterial
			And set pbrMaterial's diffuseColor to d1
			And add the pbrMaterial to g1
			And add the pbrMaterial to g2
			And add the pbrMaterial to g3

		Scenario: if not dispose pbrMaterial from all gameObjects, not dispose pbrMaterial's data
			Given defer dispose the pbrMaterial from g1
			When dispose the need disposed pbrMaterials
			Then get the pbrMaterial's diffuseColor should return d1

		Scenario: else, dispose pbrMaterial's data
			Given defer dispose the pbrMaterial from g1, g2, g3
			When dispose the need disposed pbrMaterials
			Then get the pbrMaterial's diffuseColor should return default data

	Rule: dispose map data

		Scenario: remove from gameObjectMap, gameObjectPBRMaterialMap
			Given create a gameObject
			And create a pbrMaterial
			And add the pbrMaterial to the gameObject
			And defer dispose the pbrMaterial from the gameObject
			When dispose the need disposed pbrMaterials
			Then get the pbrMaterial's gameObjects should return []
			And get the gameObject's pbrMaterial should return empty

	Rule: remove from diffuseColors

		Scenario: reset removed one's value in diffuseColors
			Given create two gameObject as g1, g2
			And create two pbrMaterials as p1, p2
			And add p1 to g1
			And add p2 to g2
			And set p1's diffuseColor to d1
			And set p2's diffuseColor to d2
			And defer dispose p1 from g1
			When dispose the need disposed pbrMaterials
			Then get p1's diffuseColor should return default data
			And get p2's diffuseColor should return d2

	Rule: remove from speculars

		Scenario: reset removed one's value in speculars
			Given create two gameObject as g1, g2
			And create two pbrMaterials as p1, p2
			And add p1 to g1
			And add p2 to g2
			And set p1's specular to s1
			And set p2's specular to s2
			And defer dispose p1 from g1
			When dispose the need disposed pbrMaterials
			Then get p1's specular should return default data
			And get p2's specular should return s2

	Rule: test add new one after dispose old one

		Scenario: if has disposed one, use disposed index as new index
			Given create two pbrMaterials as pbrMaterial1, pbrMaterial2
			And defer dispose pbrMaterial1, pbrMaterial2
			And dispose pbrMaterial1, pbrMaterial2
			When create two pbrMaterials as pbrMaterial3, pbrMaterial4
			Then pbrMaterial3 should equal to pbrMaterial2
			And pbrMaterial4 should equal to pbrMaterial1