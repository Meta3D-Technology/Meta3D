Feature: Init
    As a Init
    I want to init
    So that I can use it

    Scenario: init imgui renderer
        Given prepare sandbox
        And prepare imgui renderer service
        And prepare api
        And prepare canvas
        When init
        Then init imgui renderer
        And update imgui renderer state