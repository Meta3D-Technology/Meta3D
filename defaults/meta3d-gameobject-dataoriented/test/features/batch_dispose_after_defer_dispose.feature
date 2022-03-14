Feature: Batch Dispose After Defer Dispose
	As a Batch Dispose
	I want to dispose transforms after defer dispose
	So that I can dispose them

	Background: get contribute and create a state
		Given I get contribute
		And create a state

	Rule: dispose gameObject's all components

		Scenario: dispose transform
			Given prepare sandbox
			And create transform state
			And create two gameObjects as gameObject1, gameObject2
			And create two transforms as transform1, transform2
			And add transform1 to gameObject1
			And add transform2 to gameObject2
			And defer dispose gameObject1
			And defer dispose gameObject2
			When dispose [gameObject1, gameObject2]
			Then should dispose [transform1, transform2]

		Scenario: dispose pbrMaterial which has one gameObject
			Given prepare sandbox
			And create pbrMaterial state
			And create two gameObjects as gameObject1, gameObject2
			And create two pbrMaterials as pbrMaterial1, pbrMaterial2
			And add pbrMaterial1 to gameObject1
			And add pbrMaterial2 to gameObject2
			And defer dispose gameObject1
			And defer dispose gameObject2
			When dispose [gameObject1, gameObject2]
			Then should dispose [[pbrMaterial1, gameObject1], [pbrMaterial2, gameObject2]]

		Scenario: dispose pbrMaterial which has two gameObjects with its all gameObjects 
			Given prepare sandbox
			And create pbrMaterial state
			And create three gameObjects as gameObject1, gameObject2, gameObject3
			And create two pbrMaterials as pbrMaterial1, pbrMaterial2
			And add pbrMaterial1 to gameObject1
			And add pbrMaterial2 to gameObject2
			And add pbrMaterial2 to gameObject3
			And defer dispose gameObject1
			And defer dispose gameObject2
			And defer dispose gameObject3
			When dispose [gameObject1, gameObject2, gameObject3]
			Then should dispose [[pbrMaterial1, gameObject1], [pbrMaterial2, gameObject2, gameObject3]]

		Scenario: dispose pbrMaterial which has two gameObjects not with its all gameObjects 
			Given prepare sandbox
			And create pbrMaterial state
			And create three gameObjects as gameObject1, gameObject2, gameObject3
			And create two pbrMaterials as pbrMaterial1, pbrMaterial2
			And add pbrMaterial1 to gameObject1
			And add pbrMaterial2 to gameObject2
			And add pbrMaterial2 to gameObject3
			And defer dispose gameObject1
			And defer dispose gameObject2
			When dispose [gameObject1, gameObject2]
			Then should dispose [[pbrMaterial1, gameObject1], [pbrMaterial2, gameObject2]]

	Rule: dispose gameObject

		Scenario: should remove disposed gameObjects from needDisposedGameObjects
			Given prepare sandbox
			And create transform state
			And create two gameObjects as gameObject1, gameObject2
			And defer dispose gameObject1
			And defer dispose gameObject2
			When dispose gameObject1
			Then get need disposed gameObjects should return [gameObject2]