Feature: Redo Undo
    As a Redo Undo
    I want to redo or undo state
    So that I can implement redo or undo

    Rule: restore

        Scenario: restore state
            Given create state s1
            And register extension e1 with s1 that e1's state is es1
            And deep copy s1 as s2
            And change e1's state to es2 with s2
            When restore s2 to s1
            Then e1's state should be es1

