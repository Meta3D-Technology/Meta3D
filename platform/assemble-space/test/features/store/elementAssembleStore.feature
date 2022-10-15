Feature: ElementAssembleStore
    As a ElementAssembleStore
    I want to manage ui view store
    So that I can use update the components of changed fields

    Background: prepare
        Given prepare

    Rule: set action

        Background: prepare for set action
            Given init store
            And select ui control u1 with id1
            And set rect with id1

        Scenario: set action
            When set action with id1, event data1
            Then should add event data1

        Scenario: set action with empty action name
            Given set action with id1, event data1
            When set action with id1, event data1 with empty action name
            Then should remove the event data of id1