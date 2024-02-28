Feature: Redo Undo
    As a Redo Undo
    I want to redo or undo action state in element state
    So that I can implement redo or undo

    Background: prepare
        Given prepare sandbox

    Rule: restore

        Background: prepare state
            Given create state s1
            And create meta3d state ms1 which has s1

        Scenario: if action has restore func, restore action state
            Given register element1 with elementState1 which has action a1's state as as1
            And prepare api
            And  deep copy ms1 as ms2
            And change as1's state to as2 with ms2
            When restore ms2 to ms1
            Then a1's state should be as1

        Scenario: if action not has restore func, not restore action state
            Given register element1 with elementState1 which has action a1's state as as1
            And prepare api
            And  deep copy ms1 as ms2
            And change as1's state to as2 with ms2
            When restore ms2 to ms1
            Then a1's state should be as2

        Scenario: not restore ui control state
            Given add ui control c1's state as cs1 to s1
            And register element1 with elementState1
            And prepare api
            And  deep copy ms1 as ms2
            And change cs1's state to cs2 with ms2
            When restore ms2 to ms1
            Then c1's state should be cs2
