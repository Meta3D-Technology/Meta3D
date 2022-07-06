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

    Rule: error case

        Scenario: has zero implement of extension protocol
            Given publish extension protocol a
            And select extension b1 for protocol b
            When render
            Then should show empty

        Scenario: has multiple implements of extension protocol
            Given publish extension protocol a
            And select extension a1 and a2 for a
            When render
            Then should show empty