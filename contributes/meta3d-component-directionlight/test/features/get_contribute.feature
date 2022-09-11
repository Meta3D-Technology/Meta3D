Feature: Get Contribute
    As a Get Contribute
    I want to get directionLight contribute
    So that I can register it

    Scenario: componentName
        When I get contribute
        Then componentName should be "DirectionLight"

    Scenario: set config
        When I get contribute
        And create a state with config
        Then the config is setted

    Scenario: create dataoriented data
        When I get contribute
        And create a state with directionLightCount
        Then dataoriented data is created based on directionLightCount

    Scenario: create a directionLight
        When I get contribute
        And create a state
        Then createComponentFunc should create a directionLight

    Scenario: add a directionLight to a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a directionLight
        And add the directionLight to the gameObject
        Then get the gameObject's directionLight should be the added one

    Scenario: add a directionLight to a gameObject which alreay has one
        Given create a gameObject
        When I get contribute
        And create a state
        And create two directionLights
        And add the first directionLight to the gameObject
        And add the second directionLight to the gameObject
        Then get the gameObject's directionLight should be the second one

    Scenario: remove a directionLight from a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a directionLight
        And add the directionLight to the gameObject
        And remove the directionLight from the gameObject
        Then the gameObject shouldn't has the directionLight

    Scenario: get need disposed directionLights
        When I get contribute
        And create a state
        And create three directionLights as t1, t2, t3
		And defer dispose t1
		And defer dispose t1
		And defer dispose t3
        Then get need disposed directionLights should return [t1, t3]

    Scenario: get all directionLights
        Given create two gameObjects
        When I get contribute
        And create a state
        And create two directionLights
        And add them to the gameObjects one by one
        Then getAllComponentsFunc should get the two directionLights

    Scenario: judge whether a gameObject has a directionLight
        Given create a gameObject
        When I get contribute
        And create a state
        And create a directionLight
        And add the directionLight to the gameObject
        Then hasComponentFunc should return true

    Scenario: get a directionLight's gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a directionLight
        And add the directionLight to the gameObject
        Then getGameObjectsFunc should return [gameObject]


    Rule: get directionLight's default data

        Background: prepare contribute
            When I get contribute
            And create a state
            And create a directionLight

        Scenario: get default color
            Then get directionLight's color should return default data

        Scenario: get default intensity
            Then get directionLight's intensity should return default data

    Rule: operate directionLight data

        Background: prepare contribute
            When I get contribute
            And create a state
            And create a directionLight

        Scenario: operate color
            When set directionLight's color
            Then get directionLight's color should return the setted data

        Scenario: operate intensity
            When set directionLight's intensity
            Then get directionLight's intensity should return the setted data

    Rule: create directionLight error case

        Scenario: create too many directionLights
            Given open debug
            When I get contribute
            And create a state with directionLightCount:1
            Then create two directionLights should contract error