Feature: Extensions
    As a Extensions
    I want to show extensions
    So that I can use it

    Background: prepare
        Given prepare

    Scenario: if not loaded, show loading
        When not loaded and render
        Then should show loading

    Scenario: if loaded, show extensions list exclude selected extensions
        Given prepare extensions
        And prepare selected extensions
        When loaded and render
        Then should show extensions list exclude selected extensions


    # Scenario: set extensions
    #     Given publish extension protocol a
    #     And select extension a1 for a from market
    #     When render after useEffectOnceAsync
    #     Then should mark loaded
    #     And should set a's name and icon and a1

    Rule: set extensions

        Scenario: set extensions when select one extension from market
            Given publish extension protocol a
            And select extension a1 for a from market
            When render after useEffectOnceAsync
            Then should mark loaded
            And should set a's icon, config str and a1's displayName as extensions

        Scenario: set extensions when select two extensions of the same protocol from market
            Given publish extension protocol a
            And select extension a1, a2 for a from market
            When render after useEffectOnceAsync
            Then should mark loaded
            And extensions should contain a1 and a2

        Scenario: set extensions when select one extension from market of the protocol with low version
            Given publish extension protocol a with low version and high version
            And select extension a1 for a from market of low version
            When render after useEffectOnceAsync
            Then extensions should has only one a1

        # Scenario: set extensions exclude selected extensions
        #     Given publish extension protocol a
        #     And select extension a1 for a from market
        #     And select extension a1 for a
        #     When render after useEffectOnceAsync
        #     Then extensions should has only be empty


        Scenario: select extension
            Given publish extension protocol a
            And select extension a1 for a from market
            And render after useEffectOnceAsync
            When select a1
            Then should dispatch SelectExtension action

    Rule: error case

        Scenario: has zero implement of extension protocol
            Given publish extension protocol a
            And select extension b1 for protocol b from market
            When render after useEffectOnceAsync
            Then should set empty

        # Scenario: has multiple implements of extension protocol
        #     Given publish extension protocol a
        #     And select extension a1 and a2 for a
        #     When render after useEffectOnceAsync
        #     Then should set empty

        Scenario: extension's version not match
            Given publish extension protocol a
            And select extension a1 for a from market with old version
            When render after useEffectOnceAsync
            Then should set empty

        Scenario: extension's protocol has multiple version with different displayName
            Given publish extension protocol a with low version and high version with different displayName
            # And select extension a1 for a from market with low versionRange but high version
            And select extension a1 for a from market with low versionRange
            When render after useEffectOnceAsync
            # Then extensions should has a1 whose protocolDisplay is high version protocol's displayName
            Then extensions should has a1 whose protocolDisplay is low version protocol's displayName
