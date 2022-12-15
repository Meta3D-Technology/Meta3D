Feature: Package Selected Extensions
    As a Package Selected Extensions
    I want to show selected extensions
    So that I can use it

    Background: prepare
        Given prepare

    Scenario: show selected extensions
        Given select extension a1, a2
        When render
        Then should show a1 and a2

    Scenario: set new name
        Given select extension a1, a2
        And set a2's new name
        When render
        Then should show a1 with its origin name and a2 with its new name