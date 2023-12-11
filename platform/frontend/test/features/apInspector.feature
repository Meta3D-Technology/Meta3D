Feature: ApInsepctor
    As a ApInsepctor
    I want to operate ap inspector data
    So that I can use it

    Background: prepare
        Given prepare

    Scenario: show nothing
        Given mark not show
        When render
        Then should show nothing


    Rule: IsDebug

        Background: prepare for mark show
            Given mark show

        Scenario: show isDebug select
            Given prepare ap inspector data
            When render
            Then should show isDebug select

        Scenario: set isDebug
            When set isDebug
            Then should dispatch SetIsDebug


    Rule: ClearColor

        Background: prepare for mark show
            Given mark show

        Scenario: show clearColor r input
            Given prepare ap inspector data
            When render
            Then should show clearColor r input

        Scenario: set clearColor r
            When set clearColor r
            Then should dispatch SetClearColor


    Rule: Skin

        Background: prepare for mark show
            Given mark show

        Scenario: show skin name select
            Given prepare ap inspector data
            When render
            Then should show skin name select

        Scenario: set skin name
            When set skin name
            Then should dispatch SetSkinName

        Scenario: set skin name to empty
            When set skin name to empty
            Then should dispatch SetSkinName empty
