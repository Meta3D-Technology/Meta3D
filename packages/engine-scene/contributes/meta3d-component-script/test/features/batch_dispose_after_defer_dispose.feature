Feature: Batch Dispose After Defer Dispose
	As a Batch Dispose
	I want to dispose scripts after defer dispose
	So that I can dispose them

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Rule: dispose map data

		Scenario: remove from attributeMap, allAssetDataMap
			Given create three scripts as script1, script2, script3
			And set script1's attribute, allAssetData
			And defer dispose script1
			When dispose the need disposed scripts
			Then should remove script1 from attributeMap, allAssetDataMap

		Scenario: remove from gameObjectMap, gameObjectScriptMap
			Given create a gameObject
			And create a script
			And add the script to the gameObject
			And defer dispose the script from the gameObject
			When dispose the need disposed scripts
			Then get the script's gameObjects should return []
			And get the gameObject's script should return empty

	Rule: test add new one after dispose old one

		Scenario: if has disposed one, use disposed index as new index
			Given create two scripts as script1, script2
			And defer dispose script1, script2
			And dispose script1, script2
			When create two scripts as script3, script4
			Then script3 should equal to script2
			And script4 should equal to script1