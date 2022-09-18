Feature: drawBox
    As a drawBox
    I want to draw box
    So that I can use it

    Scenario: invoke imgui renderer's drawBox
        Given prepare sandbox
        And prepare imgui renderer service
        And prepare api
        And prepare data
        When draw box
        Then invoke imgui renderer's drawBox
        And update imgui renderer state