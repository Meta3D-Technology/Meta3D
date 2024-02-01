Feature: Get Contribute
    As a Get Contribute
    I want to get script contribute
    So that I can register it

    Scenario: componentName
        When I get contribute
        Then componentName should be "Script"

    Scenario: set config
        When I get contribute
        And create a state with config
        Then the config is setted

    Scenario: create a script
        When I get contribute
        And create a state
        Then createComponentFunc should create a script

    Scenario: add a script to a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a script
        And add the script to the gameObject
        Then get the gameObject's script should be the added one

    Scenario: add a script to a gameObject which alreay has one
        Given create a gameObject
        When I get contribute
        And create a state
        And create two scripts
        And add the first script to the gameObject
        And add the second script to the gameObject
        Then get the gameObject's script should be the second one

    Scenario: remove a script from a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a script
        And add the script to the gameObject
        And remove the script from the gameObject
        Then the gameObject shouldn't has the script

    Scenario: get need disposed scripts
        When I get contribute
        And create a state
        And create three scripts as t1, t2, t3
        And defer dispose t1
        And defer dispose t1
        And defer dispose t3
        Then get need disposed scripts should return [t1, t3]

    Scenario: get all scripts
        Given create two gameObjects
        When I get contribute
        And create a state
        And create two scripts
        And add them to the gameObjects one by one
        Then getAllComponentsFunc should get the two scripts

    Scenario: judge whether a gameObject has a script
        Given create a gameObject
        When I get contribute
        And create a state
        And create a script
        And add the script to the gameObject
        Then hasComponentFunc should return true

    Scenario: get a script's gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a script
        And add the script to the gameObject
        Then getGameObjectsFunc should return [gameObject]

    # Rule: get script's default data

    #     Background: prepare contribute
    #         When I get contribute
    #         And create a state
    #         And create a script

    #     Scenario: get default attribute
    #         Then get script's attribute should return default data

    Rule: operate script data

        Background: prepare contribute
            When I get contribute
            And create a state
            And create a script

        Scenario: operate attribute
            When set script's attribute
            Then get script's attribute should return the setted data

        Scenario: operate eventFileStr
            When set script's eventFileStr
            Then get script's eventFileStr should return the setted data
