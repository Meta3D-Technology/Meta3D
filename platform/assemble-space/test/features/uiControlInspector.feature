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
        Given select uiControl u1, u2 that u2 is child of u1
        And set inspector current selected ui control data to u2
        When render
        Then should show default data

    Rule: Rect

        # Scenario: show rect with element state fields
        #     Given element state add fields
        #     And select ui control button d1
        #     And set inspector current selected ui control data to d1
        #     When render
        #     Then should show element state int field select

        Scenario: set rect x
            When set rect x
            Then should dispatch SetRect action with x

    Rule: IsDraw

        # Scenario: show isDraw with element state fields
        #     Given element state add fields
        #     And select ui control button d1
        #     And set inspector current selected ui control data to d1
        #     When render
        #     Then should show element state bool field select

        Scenario: set isDraw
            When set isDraw
            Then should dispatch SetIsDraw action


    Rule: Input

        Scenario: show input
            Given select ui control window w1
            And select input i1 match w1
            And set inspector current selected ui control data to w1
            When render
            Then should show dom with defalut value

        Scenario: show input select
            Given select input i1 match ui control w1
            And select input i2 not match ui control w1
            When build input select values
            Then should show i1


    Rule: Specific

        Scenario: show specific
            Given select ui control window w1
            And set inspector current selected ui control data to w1
            When render
            Then should show dom with defalut value

        # Scenario: show specific with element state fields
        #     Given element state add fields
        #     And select ui control window w1
        #     And set inspector current selected ui control data to w1
        #     When render
        #     Then should show element state string field select


        Scenario: set specific data
            When set specific data
            Then should dispatch SetSpecificData action


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
