Feature: ContributeInspector
    As a ContributeInspector
    I want to operate current contribute
    So that I can update it

    Background: prepare
        Given prepare sandbox
        And prepare snapshot

    Scenario: show nothing
        When render
        Then should show nothing

    Scenario: set new name input show default name
        Given set inspector current contribute to a1
        And set a1's new name to new1
        When render
        Then set new name input's default name should be new1
