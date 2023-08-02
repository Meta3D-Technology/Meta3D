Feature: Update Element State
    As a Update Element State
    I want to update element state
    So that I can update element state

    Background: prepare
        Given prepare sandbox
        And create state

    Scenario: if element state change, update data
        Given register element1 with elementState1 whose data1 = 1
        When update data1 to 10 by update element state
        Then mark state change
        And data1 should be 10

    Scenario: else, not update data
        Given register element1 with elementState1 whose data1 = 10
        When update data1 to 10 by update element state
        Then mark state not change
        And data1 should not change


