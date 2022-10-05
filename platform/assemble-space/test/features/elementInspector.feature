Feature: ElementInsepctor
    As a ElementInsepctor
    I want to operate current element's data
    So that I can use it when run

    Background: prepare
        Given prepare

    Scenario: show nothing
        Given mark not show
        When render
        Then should show nothing

    Scenario: show current element state
        Given mark show
        And prepare element state e1
        When render
        Then should show e1

    Scenario: submit element state
        Given prepare element state e1
        When submit element state
        Then should dispatch setElementStateFields action

