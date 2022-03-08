Feature: Get Data
    As a Get Data
    I want to get gameObject contribute
    So that I can set it

    # Scenario: create a state
    #     When I get contribute
    #     Then createStateFunc should create a state

    Scenario: create a gameObject
        When I get contribute
        And create a state
        Then createGameObjectFunc should create a gameObject

    Scenario: get all gameObjects
        When I get contribute
        And create a state
        And create two gameObjects
        Then getAllGameObjects should return them
