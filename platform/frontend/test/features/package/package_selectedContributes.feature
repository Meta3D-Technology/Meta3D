Feature: Package Selected Contributes
    As a Package Selected Contributes
    I want to show selected contributes
    So that I can use it

    Background: prepare
        Given prepare

    Scenario: show selected contributes
        Given select contribute a1, a2
        When render
        Then should show a1 and a2

    # Scenario: set new name
    #     Given select contribute a1, a2
    #     And set a2's new name
    #     When render
    #     Then should show a1 with its origin name and a2 with its new name