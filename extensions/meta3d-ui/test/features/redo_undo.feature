Feature: Redo Undo
    As a Redo Undo
    I want to redo or undo action state in element state
    So that I can implement redo or undo

    Background: prepare
        Given prepare sandbox

    Rule: restore

        Scenario: restore action state
            Given create state s1
            And create meta3d state ms1 which has s1
            And register element1 with elementState1 which has action a1's state as as1
            And prepare api
            And  deep copy ms1 as ms2
            And change as1's state to as2 with ms2
            When restore ms2 to ms1
            Then a1's state should be as1

