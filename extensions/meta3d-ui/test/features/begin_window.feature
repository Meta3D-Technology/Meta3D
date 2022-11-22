Feature: beginWindow
    As a beginWindow
    I want to draw box
    So that I can use it

    Scenario: invoke imgui renderer's beginWindow
        Given prepare sandbox
        And prepare imgui renderer service
        And prepare api
        And prepare data
        When beginWindow
        Then invoke imgui renderer's beginWindow
        And update imgui renderer state