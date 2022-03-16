Feature: Batch Dispose Before Defer Dispose
	As a Batch Dispose
	I want to dispose pbrMaterials before defer dispose
	So that should contract error

	Background: get contribute and create a state
		Given I get contribute
		And create a state and open debug

	Scenario: if dispose before defer dispose, contract error
		Given create a gameObject
		And create a pbrMaterial
		And add the pbrMaterial to the gameObject
		When dispose the pbrMaterial from the gameObject
		Then should contract error: "material should need disposed"