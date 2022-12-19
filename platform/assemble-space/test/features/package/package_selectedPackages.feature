Feature: Package Selected Packages
    As a Package Selected Packages
    I want to show selected packages
    So that I can use it

    Background: prepare
        Given prepare

    Scenario: show selected packages
        Given select package a1, a2
        When render
        Then should show a1 and a2