Feature: Extensions
    As a Extensions
    I want to show extensions
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: if not loaded, show loading
        When not loaded
        Then should show loading

    Scenario: show extensions
        Given publish extension protocol a
        And select extension a1 for a
        When render after useEffectOnce
        Then should mark loaded
        And should show a's name and icon

    Rule: error case

        Scenario: has zero implement of extension protocol
            Given publish extension protocol a
            And select extension b1 for protocol b
            When render after useEffectOnce
            Then should show empty

        Scenario: has multiple implements of extension protocol
            Given publish extension protocol a
            And select extension a1 and a2 for a
            When render after useEffectOnce
            Then should show empty

        Scenario: extension's version not match
            Given publish extension protocol a
            And select extension a1 for a with old version
            When render after useEffectOnce
            Then should show empty