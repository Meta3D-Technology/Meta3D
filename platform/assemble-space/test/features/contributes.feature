Feature: Contributes
    As a Contributes
    I want to show contributes
    So that I can use it

    Background: prepare
        Given prepare

    Scenario: if not loaded, show loading
        When not loaded and render
        Then should show loading

    Scenario: if loaded, show contributes list
        When loaded and render
        Then should show contributes list

    Scenario: set contributes
        Given publish contribute protocol a
        And select contribute a1 for a
        When render after useEffectOnceAsync
        Then should mark loaded
        And should set a's name, icon, config str and a1

    Scenario: select contribute
        Given publish contribute protocol a
        And select contribute a1 for a
        And render after useEffectOnceAsync
        When select a1
        Then should dispatch selectContribute action

    Rule: error case

        Scenario: has zero implement of contribute protocol
            Given publish contribute protocol a
            And select contribute b1 for protocol b
            When render after useEffectOnceAsync
            Then should set empty

        Scenario: has multiple implements of contribute protocol
            Given publish contribute protocol a
            And select contribute a1 and a2 for a
            When render after useEffectOnceAsync
            Then should set empty

        Scenario: contribute's version not match
            Given publish contribute protocol a
            And select contribute a1 for a with old version
            When render after useEffectOnceAsync
            Then should set empty