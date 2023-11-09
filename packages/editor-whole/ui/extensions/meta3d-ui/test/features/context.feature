Feature: context
    As a context
    I want to get render context
    So that I can share render resources

    Scenario: get context
        Given prepare sandbox
        And prepare imgui renderer service
        And prepare api
        When get context
        Then return context