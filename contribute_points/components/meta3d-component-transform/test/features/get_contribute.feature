Feature: Get Contribute
    As a Get Contribute
    I want to get transform contribute
    So that I can register it

    Scenario: componentName
        When I get contribute
        Then componentName should be "Transform"

    Scenario: set config
        When I get contribute
        And create a state with config
        Then the config is setted

    Scenario: create dataoriented data
        When I get contribute
        And create a state with transformCount
        Then dataoriented data is created based on transformCount

    Scenario: create a transform
        When I get contribute
        And create a state
        Then createComponentFunc should create a transform
        And mark the transform dirty
        And set the transform's children to empty

    Scenario: add a transform to a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a transform
        And add the transform to the gameObject
        Then get the gameObject's transform should be the added one

    Scenario: add a transform to a gameObject which alreay has one
        Given create a gameObject
        When I get contribute
        And create a state
        And create two transforms
        And add the first transform to the gameObject
        And add the second transform to the gameObject
        Then get the gameObject's transform should be the second one

    Scenario: remove a transform from a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a transform
        And add the transform to the gameObject
        And remove the transform from the gameObject
        Then the gameObject shouldn't has the transform

    Scenario: get need disposed transforms
        When I get contribute
        And create a state
        And create three transforms as t1, t2, t3
		And defer dispose t1
		And defer dispose t1
		And defer dispose t3
        Then get need disposed transforms should return [t1, t3]

    Scenario: get all transforms
        Given create two gameObjects
        When I get contribute
        And create a state
        And create two transforms
        And add them to the gameObjects one by one
        Then getAllComponentsFunc should get the two transforms

    Scenario: judge whether a gameObject has a transform
        Given create a gameObject
        When I get contribute
        And create a state
        And create a transform
        And add the transform to the gameObject
        Then hasComponentFunc should return true

    Scenario: get a transform's gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a transform
        And add the transform to the gameObject
        Then getGameObjectsFunc should return [gameObject]

    Rule: get transform's default data

        Background: prepare contribute
            When I get contribute
            And create a state
            And create a transform

        Scenario: get default position
            Then get transform's position should return default data

        Scenario: get default rotation
            Then get transform's rotation should return default data

        Scenario: get default scale
            Then get transform's scale should return default data

        Scenario: get default euler angles
            Then get transform's euler angles should return default data

