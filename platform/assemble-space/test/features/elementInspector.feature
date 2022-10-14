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


    Rule: State

        Scenario: show current element state
            Given mark show
            And prepare element state e1
            When render
            Then should show e1

        Scenario: submit element state
            Given prepare element state e1
            When submit element state
            Then should dispatch SetElementStateFields action


    Rule: Show Reducer

        Background: prepare reducer
            Given mark show
            And select action a1 whose protocol config's actions define role1, role2

        Scenario: show role select
            When render
            Then should show role select contain role1, role2

        Scenario: show handlers
            Given prepare reducers with role1 and handler h1
            When render
            Then should show h1 form


    Rule: Handle Reducer

        Scenario: set role
            Given prepare role
            When set role
            Then should dispatch SetRole action

        Scenario: submit handlers
            Given prepare reducers
            When submit handlers
            Then should dispatch SetHandlers action