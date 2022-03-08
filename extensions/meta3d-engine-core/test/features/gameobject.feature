Feature: GameObject
    As a GameObject
    I want to be setted
    So that I can use it

    Background: prepare
        Given prepare register
        When set gameObject contribute
        And create and set the gameObject state

    Scenario: create a gameObject
        Then createGameObject should create a gameObject

    Scenario: defer dispose gameObject
        Given create a gameObject as g1
        Then defer dispose g1
        Then mark g1 as need dispose

    Scenario: batch dispose gameObjects
        Given register transform contribute
        And create and set transform state
        And create a gameObject as g1
        And create a transform as t1
        And add t1 to g1
        When batch dispose [g1]
        Then mark g1 as disposed
        And mark t1 as disposed

    Scenario: get all gameObjects
        When create two gameObjects
        Then getAllGameObjects should return them
