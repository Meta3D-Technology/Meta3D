Feature: Assemble Space
    As a Assemble Space
    I want to make app
    So that I can publish it

    Background: prepare
        Given prepare sandbox
        And prepare snapshot

    Scenario: if not loaded, show loading
        When not loaded
        Then should show loading