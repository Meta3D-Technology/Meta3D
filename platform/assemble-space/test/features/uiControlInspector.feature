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
        Given set inspector current selected ui control data to d1
        When render
        Then should show default data

    Scenario: set rect
        When set rect
        Then should dispatch setRect action