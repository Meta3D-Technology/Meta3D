Feature: clear
    As a clear
    I want to clear
    So that I can rerender

    Scenario: clear imgui renderer
        Given prepare sandbox
        And prepare imgui renderer service
        And prepare api
        When clear
        Then clear imgui renderer