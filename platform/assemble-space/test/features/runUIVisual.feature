Feature: RunUIVisual
    As a RunUIVisual
    I want to run element
    So that I can interact with event and action

    Background: prepare
        Given prepare

    Scenario: show the canvas
        Given prepare canvas data in the url
        When render
        Then should show the canvas

    Rule: start app

        Scenario: if not get app binary file from storage, error
            Given empty storage
            When start app
            Then should error

        Scenario: else, start app
            Given storage has app binary file
            And prepare canvas
            When start app
            Then load app
            And init app
            And loop app