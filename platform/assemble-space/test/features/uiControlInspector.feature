Feature: UIControlInsepctor
    As a UIControlInsepctor
    I want to operate current selected ui control
    So that I can update view

    Background: prepare
        Given prepare

    Scenario: show nothing
        When render
        Then should show nothing

    Scenario: show default data
        Given select ui control button d1
        And set inspector current selected ui control data to d1
        When render
        Then should show default data

    Rule: Rect

        Scenario: set rect
            When set rect
            Then should dispatch SetRect action


    Rule: Event

        Scenario: show default action and action select
            Given select ui control button d1
            And select action a1 and a2
            And set inspector current selected ui control data to d1 whose event's action is a2
            When render
            Then should show a2 as default action and action select with a1, a2

        Scenario: set action
            When set action
            Then should dispatch SetAction action

        Scenario: set action with empty action name
            When set action with empty action name
            Then should dispatch SetAction action
