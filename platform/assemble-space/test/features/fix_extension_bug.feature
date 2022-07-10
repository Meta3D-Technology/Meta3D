Feature: Fix Extension Bug
    As a Fix Extension Bug
    I want to fix extension bug
    So that I can use it

    Background: prepare
        Given prepare sandbox
        And prepare snapshot
        And init store

    Scenario: fix "multiple selected extension of the same protocol will affect each other" bug
        Given select extension a1 for protocol a in Extensions
        And select extension a1 for protocol a in Extensions
        And select the first extension in SelectedExtensions
        And start it
        And set new name
        When select the second extension in SelectedExtensions
        And render Inspector
        Then should show start button
        And set new name input's default name should be old name