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

		Scenario: dispose geometry which has one gameObject
			Given prepare sandbox
			And create geometry state
			And create two gameObjects as gameObject1, gameObject2
			And create two geometrys as geometry1, geometry2
			And add geometry1 to gameObject1
			And add geometry2 to gameObject2
			And defer dispose gameObject1
			And defer dispose gameObject2
			When dispose [gameObject1, gameObject2]
			Then should dispose [[geometry1, gameObject1], [geometry2, gameObject2]]

		Scenario: dispose geometry which has two gameObjects with its all gameObjects
			Given prepare sandbox
			And create geometry state
			And create three gameObjects as gameObject1, gameObject2, gameObject3
			And create two geometrys as geometry1, geometry2
			And add geometry1 to gameObject1
			And add geometry2 to gameObject2
			And add geometry2 to gameObject3
			And defer dispose gameObject1
			And defer dispose gameObject2
			And defer dispose gameObject3
			When dispose [gameObject1, gameObject2, gameObject3]
			Then should dispose [[geometry1, gameObject1], [geometry2, gameObject2, gameObject3]]

		Scenario: dispose geometry which has two gameObjects not with its all gameObjects
			Given prepare sandbox
			And create geometry state
			And create three gameObjects as gameObject1, gameObject2, gameObject3
			And create two geometrys as geometry1, geometry2
			And add geometry1 to gameObject1
			And add geometry2 to gameObject2
			And add geometry2 to gameObject3
			And defer dispose gameObject1
			And defer dispose gameObject2
			When dispose [gameObject1, gameObject2]
			Then should dispose [[geometry1, gameObject1], [geometry2, gameObject2]]

		Scenario: dispose directionLight
			Given prepare sandbox
			And create directionLight state
			And create two gameObjects as gameObject1, gameObject2
			And create two directionLights as directionLight1, directionLight2
			And add directionLight1 to gameObject1
			And add directionLight2 to gameObject2
			And defer dispose gameObject1
			And defer dispose gameObject2
			When dispose [gameObject1, gameObject2]
			Then should dispose [directionLight1, directionLight2]

		Scenario: dispose arcballCameraController
			Given prepare sandbox
			And create arcballCameraController state
			And create two gameObjects as gameObject1, gameObject2
			And create two arcballCameraControllers as arcballCameraController1, arcballCameraController2
			And add arcballCameraController1 to gameObject1
			And add arcballCameraController2 to gameObject2
			And defer dispose gameObject1
			And defer dispose gameObject2
			When dispose [gameObject1, gameObject2]
			Then should dispose [arcballCameraController1, arcballCameraController2]

		Scenario: dispose basicCameraView
			Given prepare sandbox
			And create basicCameraView state
			And create two gameObjects as gameObject1, gameObject2
			And create two basicCameraViews as basicCameraView1, basicCameraView2
			And add basicCameraView1 to gameObject1
			And add basicCameraView2 to gameObject2
			And defer dispose gameObject1
			And defer dispose gameObject2
			When dispose [gameObject1, gameObject2]
			Then should dispose [basicCameraView1, basicCameraView2]

		Scenario: dispose perspectiveCameraProjection
			Given prepare sandbox
			And create perspectiveCameraProjection state
			And create two gameObjects as gameObject1, gameObject2
			And create two perspectiveCameraProjections as perspectiveCameraProjection1, perspectiveCameraProjection2
			And add perspectiveCameraProjection1 to gameObject1
			And add perspectiveCameraProjection2 to gameObject2
			And defer dispose gameObject1
			And defer dispose gameObject2
			When dispose [gameObject1, gameObject2]
			Then should dispose [perspectiveCameraProjection1, perspectiveCameraProjection2]

	Rule: dispose gameObject

		Scenario: should remove disposed gameObjects from needDisposedGameObjects
			Given prepare sandbox
			And create two gameObjects as gameObject1, gameObject2
			And defer dispose gameObject1
			And defer dispose gameObject2
			When dispose gameObject1
			Then get need disposed gameObjects should return [gameObject2]

		Scenario: get all gameObjects should exclude defer disposed and disposed gameObjects
			Given prepare sandbox
			And create two gameObjects as gameObject1, gameObject2
			And defer dispose gameObject1
			And defer dispose gameObject2
			When dispose gameObject1
			Then get all gameObjects should return []