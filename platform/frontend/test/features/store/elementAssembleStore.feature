Feature: ElementAssembleStore
    As a ElementAssembleStore
    I want to manage ui view store
    So that I can use update the components of changed fields

    Background: prepare
        Given prepare


    Rule: set rect

        Scenario: set rect of hierachy ui control
            Given init store
            And select ui control u2 whose parent is u1 with id2
            And set rect with id2
            Then should set rect


    Rule: set action

        Background: prepare for set action
            Given init store
            And select ui control u1 with id1
            And set rect with id1

        Scenario: set action
            When set action with id1, event data1
            Then should add event data1

        Scenario: set action twice
            Given set action with id1, event data1
            When set action with id1, event data2
            Then should add event data1 and data2

        Scenario: set action with empty action name
            Given set action with id1, event data1
            When set action with id1, event data1 with empty action name
            Then should remove the event data of id1


    Rule: select ui control

        Background: prepare for select ui control
            Given init store

        Scenario: select hierachy ui control
            Given select ui control u1
            And select ui control u2 whose parent is u1
            When select ui control u3 whose parent is u2
            Then should has correct selected ui controls


    Rule: select selected ui control

        Background: prepare for select selected ui control
            Given init store
            And select ui control u1 which has children with id1

        Scenario: select selected ui control which has children
            When select u1
            Then should use id1 as u1's parent ui control id

        Scenario: select selected ui control which not has children
            Given select ui control u2 which not has children and its parent is u1 with id2
            When select u2
            Then should use id1 as u2's parent ui control id



    Rule: update custom input file str

        Background: prepare for update custom input file str
            Given init store
            And add custom input1
            And select ui control u1 with id1
            And set input to input1 with id1

        Scenario: update custom input file str
            When update custom input1's name and file str
            Then should has correct custom inputs
            And u1's uiControlInspectorData's input should update to new name
