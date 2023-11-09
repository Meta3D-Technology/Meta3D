Feature: Custom Control
    As a Custom Control
    I want to be registered
    So that I can get it

    Scenario: register custom control
        When register a custom control
        Then get custom control func should return it's func

    # Scenario: get custom control's state
    #     Given register one element e1 with uiControlStates which has c1's state
    #     When get c1's state
    #     Then get from e1's uiControlStates

    Scenario: get custom control's state
        Given set custom control's state to s1
        When get custom control's state
        Then return s1
