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

        Scenario: show rect with element state fields
            Given element state add fields
            And select ui control button d1
            And set inspector current selected ui control data to d1
            When render
            Then should show element state int field select

        Scenario: set rect x
            When set rect x
            Then should dispatch SetRect action with x

    Rule: isDraw

        Scenario: show isDraw with element state fields
            Given element state add fields
            And select ui control button d1
            And set inspector current selected ui control data to d1
            When render
            Then should show element state bool field select

        Scenario: set isDraw
            When set isDraw
            Then should dispatch SetIsDraw action

    Rule: Skin

        Scenario: show skin
            Given select ui control button d1
            And select skin s1 and s2
            And set inspector current selected ui control data to d1 whose skin is s1
            When render
            Then should show s1 as default skin and select with s1, s2

        Scenario: set skin
            When set skin
            Then should dispatch SetSkin action


    Rule: Event

        Scenario: show default action and action select
            Given select ui control button d1
            And select action a1 and a2
            And set inspector current selected ui control data to d1 whose event's action is a2
            When render
            Then should show a2 as default action and select with a1, a2

        Scenario: set action
            When set action
            Then should dispatch SetAction action

        Scenario: set action with empty action name
            When set action with empty action name
            Then should dispatch SetAction action
