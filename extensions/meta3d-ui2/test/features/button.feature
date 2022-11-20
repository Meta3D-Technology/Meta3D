Feature: button
    As a button
    I want to draw box
    So that I can use it

    Scenario: invoke imgui renderer's button
        Given prepare sandbox
        And prepare imgui renderer service
        And prepare api
        And prepare data
        When button
        Then invoke imgui renderer's button
        And update imgui renderer state
        And return isClick
