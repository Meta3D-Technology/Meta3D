Feature: Dispatch
    As a Dispatch
    I want to dispatch action
    So that I can update state

    Background: prepare
        Given prepare sandbox
        And create state

    Scenario: if element state change, update data
        Given register element1 with reducer1 and elementState1 whose data1 = 1
        When dispatch action to set data1 to 10
        Then mark state change
        And data1 should be 10

    Scenario: else, not update data
        Given register element1 with reducer1 and elementState1 whose data1 = 10
        When dispatch action to set data1 to 10
        Then mark state not change
        And data1 should not change


