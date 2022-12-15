Feature: PackageExtensions
    As a PackageExtensions
    I want to show extensions
    So that I can use it

    Background: prepare
        Given prepare

    Scenario: if not loaded, show loading
        When not loaded and render
        Then should show loading

    Scenario: if loaded, show extensions list
        When loaded and render
        Then should show extensions list

    # Scenario: set extensions
    #     Given publish extension protocol a
    #     And select extension a1 for a
    #     When render after useEffectOnceAsync
    #     Then should mark loaded
    #     And should set a's name and icon and a1

    Rule: set extensions

        Scenario: set extensions when select one extension
            Given publish extension protocol a
            And select extension a1 for a
            When render after useEffectOnceAsync
            Then should mark loaded
            And should set a's icon, config str and a1's name as extensions

        Scenario: set extensions when select two extensions of the same protocol
            Given publish extension protocol a
            And select extension a1, a2 for a
            When render after useEffectOnceAsync
            Then should mark loaded
            And extensions should contain a1 and a2


        Scenario: select extension
            Given publish extension protocol a
            And select extension a1 for a
            And render after useEffectOnceAsync
            When select a1
            Then should dispatch SelectExtension action

    Rule: error case

        Scenario: has zero implement of extension protocol
            Given publish extension protocol a
            And select extension b1 for protocol b
            When render after useEffectOnceAsync
            Then should set empty

        # Scenario: has multiple implements of extension protocol
        #     Given publish extension protocol a
        #     And select extension a1 and a2 for a
        #     When render after useEffectOnceAsync
        #     Then should set empty

        Scenario: extension's version not match
            Given publish extension protocol a
            And select extension a1 for a with old version
            When render after useEffectOnceAsync
            Then should set empty