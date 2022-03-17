Feature: Clone
	As a Clone
	I want to clone gameObject
	So that I can get cloned one

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Rule: clone gameObject

		Scenario: cloned gameObjects are new gameObjects
			Given create a gameObject
			When clone 2 gameObjects
			Then get 2 cloned gameObjects should return created ones

	Rule: clone gameObject's components

		Scenario: clone transform
			Given prepare sandbox
			And create transform state
			Given create a gameObject as gameObject1
			And create a transforms as transform1
			And add transform1 to gameObject1
			When clone 2 gameObjects
			Then should clone 2 transforms as clonedTransforms
			And get 2 cloned gameObjects' transform should return [clonedTransforms[0], clonedTransforms[1]]

		Scenario: clone pbrMaterial
			Given prepare sandbox
			And create pbrMaterial state
			Given create a gameObject as gameObject1
			And create a pbrMaterials as pbrMaterial1
			And add pbrMaterial1 to gameObject1
			When clone 2 gameObjects
			Then should clone 2 pbrMaterials as clonedPBRMaterials with config
			And get 2 cloned gameObjects' pbrMaterial should return [clonedPBRMaterials[0], clonedPBRMaterials[1]]

		Scenario: clone geometry
			Given prepare sandbox
			And create geometry state
			Given create a gameObject as gameObject1
			And create a geometrys as geometry1
			And add geometry1 to gameObject1
			When clone 2 gameObjects
			Then should clone 2 geometrys as clonedGeometrys
			And get 2 cloned gameObjects' geometry should return [clonedGeometrys[0], clonedGeometrys[1]]

	Rule: clone gameObject's children

		Background: prepare scene and clone
			Given prepare sandbox
			And create two gameObject as gameObject1, gameObject2
			And create two transforms as transform1, transform2
			And add them to gameObjects
			And set transform2's parent to transform1
			When clone 2 gameObjects of gameObject1

		Scenario: get all cloned gameObjects(include cloned children)
			Then get cloned gameObjects should include cloned children gameObjects

		Scenario: clone children's components
			Then should clone 4 transforms as clonedTransforms
			And get 4 cloned gameObjects' transform should return [clonedTransforms[0], clonedTransforms[1], clonedGeometrys[2], [3]]

		Scenario: set parent
			Then set cloned transforms' parent

