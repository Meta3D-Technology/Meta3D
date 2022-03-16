Feature: Clone
	As a Clone
	I want to clone pbrMaterial
	So that I can get cloned one

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Rule: test clone shared material

		Scenario: cloned one is source one
			Given create a pbrMaterial
			When clone 2 shared pbrMaterials
			Then get 2 cloned pbrMaterials should equal to source one

	Rule: test clone not shared material

		Scenario: cloned one is new created one
			Given create a pbrMaterial
			When clone 2 not shared pbrMaterials
			Then get 2 cloned pbrMaterials should return created ones

		Scenario: set cloned pbrMaterial's diffuse color by source pbrMaterial's diffuse color
			Given create a pbrMaterial
			And set the pbrMaterial's diffuse color to d1
			When clone 2 not shared pbrMaterials
			Then get 2 cloned pbrMaterials' diffuse color should return d1, d1

		Scenario: set cloned pbrMaterial's specular by source pbrMaterial's specular
			Given create a pbrMaterial
			And set the pbrMaterial's specular to s1
			When clone 2 not shared pbrMaterials
			Then get 2 cloned pbrMaterials' specular should return s1, s1
