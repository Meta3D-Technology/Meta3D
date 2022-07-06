Feature: Assemble Space
    As a Assemble Space
    I want to make app
    So that I can publish it

    Background: prepare
        Given prepare sandbox
        And prepare snapshot

    Scenario: show extensions
        Given publish extension protocol a
        And select extension a1 for a
        When render
        Then should show a's name and icon

        # TODO error case