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

    Scenario: select contribute
        Given publish contribute protocol a
        And select contribute a1 for a
        And render after useEffectOnceAsync
        When select a1
        Then should dispatch SelectContribute action


    Rule: set contributes

        Scenario: set contributes when select one contribute
            Given publish contribute protocol a
            And select contribute a1 for a
            When render after useEffectOnceAsync
            Then should mark loaded
            And should set a's icon, config str and a1's displayName as contributes

        Scenario: set contributes when select two contributes of the same protocol
            Given publish contribute protocol a
            And select contribute a1, a2 for a
            When render after useEffectOnceAsync
            Then should mark loaded
            And contributes should contain a1 and a2

        Scenario: set contributes when select one contributes and exist two satisfied protocols
            Given publish contribute protocol a_low with lower version and a_high with higher version
            And select contribute a1 which satisfy a_low and a_high
            When render after useEffectOnceAsync
            Then contributes should only has one a1 for a_low


    Rule: error case

        Scenario: has zero implement of contribute protocol
            Given publish contribute protocol a
            And select contribute b1 for protocol b
            When render after useEffectOnceAsync
            Then should set empty

        # Scenario: has multiple implements of contribute protocol
        #     Given publish contribute protocol a
        #     And select contribute a1 and a2 for a
        #     When render after useEffectOnceAsync
        #     Then should set empty

        Scenario: contribute's version not match
            Given publish contribute protocol a
            And select contribute a1 for a with old version
            When render after useEffectOnceAsync
            Then should set empty