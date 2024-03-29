Feature: Get Contribute
    As a Get Contribute
    I want to get perspectiveCameraProjection contribute
    So that I can register it

    Scenario: componentName
        When I get contribute
        Then componentName should be "PerspectiveCameraProjection"

    Scenario: set config
        When I get contribute
        And create a state with config
        Then the config is setted

    Scenario: create a perspectiveCameraProjection
        When I get contribute
        And create a state
        Then createComponentFunc should create a perspectiveCameraProjection
        And mark the perspectiveCameraProjection dirty
        And set the perspectiveCameraProjection's pMatrix to identiy matrix4

    Scenario: add a perspectiveCameraProjection to a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a perspectiveCameraProjection
        And add the perspectiveCameraProjection to the gameObject
        Then get the gameObject's perspectiveCameraProjection should be the added one

    Scenario: add a perspectiveCameraProjection to a gameObject which alreay has one
        Given create a gameObject
        When I get contribute
        And create a state
        And create two perspectiveCameraProjections
        And add the first perspectiveCameraProjection to the gameObject
        And add the second perspectiveCameraProjection to the gameObject
        Then get the gameObject's perspectiveCameraProjection should be the second one

    Scenario: remove a perspectiveCameraProjection from a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a perspectiveCameraProjection
        And add the perspectiveCameraProjection to the gameObject
        And remove the perspectiveCameraProjection from the gameObject
        Then the gameObject shouldn't has the perspectiveCameraProjection

    Scenario: get need disposed perspectiveCameraProjections
        When I get contribute
        And create a state
        And create three perspectiveCameraProjections as t1, t2, t3
		And defer dispose t1
		And defer dispose t1
		And defer dispose t3
        Then get need disposed perspectiveCameraProjections should return [t1, t3]

    Scenario: get all perspectiveCameraProjections
        Given create two gameObjects
        When I get contribute
        And create a state
        And create two perspectiveCameraProjections
        And add them to the gameObjects one by one
        Then getAllComponentsFunc should get the two perspectiveCameraProjections

    Scenario: get all dirty perspectiveCameraProjections
        Given create two gameObjects
        When I get contribute
        And create a state
        And create two perspectiveCameraProjections
        And mark the first perspectiveCameraProjection not dirty
        And add them to the gameObjects one by one
        Then get all dirty perspectiveCameraProjections should get [the second perspectiveCameraProjection]

    Scenario: judge whether a gameObject has a perspectiveCameraProjection
        Given create a gameObject
        When I get contribute
        And create a state
        And create a perspectiveCameraProjection
        And add the perspectiveCameraProjection to the gameObject
        Then hasComponentFunc should return true

    Scenario: get a perspectiveCameraProjection's gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a perspectiveCameraProjection
        And add the perspectiveCameraProjection to the gameObject
        Then getGameObjectsFunc should return [gameObject]

    Rule: get perspectiveCameraProjection's default data

        Background: prepare contribute
            When I get contribute
            And create a state
            And create a perspectiveCameraProjection

        Scenario: get default pMatrix
            Then get perspectiveCameraProjection's pMatrix should return default data

    Rule: operate perspectiveCameraProjection data

        Background: prepare contribute
            When I get contribute
            And create a state
            And create a perspectiveCameraProjection

        Scenario: operate pMatrix
            When set perspectiveCameraProjection's pMatrix
            Then get perspectiveCameraProjection's pMatrix should return the setted data

        Scenario: operate fovy
            When set perspectiveCameraProjection's fovy
            Then get perspectiveCameraProjection's fovy should return the setted data

        Scenario: operate aspect
            When set perspectiveCameraProjection's aspect
            Then get perspectiveCameraProjection's aspect should return the setted data

        Scenario: operate far
            When set perspectiveCameraProjection's far
            Then get perspectiveCameraProjection's far should return the setted data

        Scenario: operate near
            When set perspectiveCameraProjection's near
            Then get perspectiveCameraProjection's near should return the setted data