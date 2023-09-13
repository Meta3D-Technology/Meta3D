Feature: Redo undo
    As a Redo undo
    I want to redo or undo transform's data
    So that I can implement redo or undo engine state

    Background: get contribute and create a state
        Given I get contribute
        And create a state

    Rule: deep copy

        Scenario: deep copy transform state
            Given create three transforms as t1, t2, t3
            Given create a gameObject as g1
            And add t3 to g1
            And set t2's parent to t1
            # And set their local position, local rotation, local scale
            When deep copy transform state as s2
            And create transform with s2 as t4
            And set t4's parent to t1 with s2
            And defer dispose t3 from g1 with s2
            Then get t1's children with state should return [t2]
            And getNeedDisposedComponents with state should return []


    Rule: restore

        Scenario: restore transform state
            Given create three transforms as t1
            # Given create a gameObject as g1
            # And add t3 to g1
            # And set t2's parent to t1
            And set t1's position as old value
            # And update t1, t2
            And deep copy transform state as s2
            And create transform with s2 as t2
            # And set t4's parent to t1 with s2
            # And defer dispose t3 from g1 with s2
            And set t2's local position with s2
            # And update t3 with s2
            And set t1's local position with s2 as new value
            When restore current state(s2) to target state(state)
            Then get t1's local position with target state should return old value
