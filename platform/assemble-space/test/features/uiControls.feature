Feature: UIControls
    As a UIControls
    I want to show uiControls
    So that I can use it

    Background: prepare
        Given prepare

    # Scenario: if loaded, show uiControls list
    #     When loaded and render
    #     Then should show uiControls list


    Scenario: show uiControls list
        Given select uiControl u1 in ap view
        And select action a1 in ap view
        When switch to ui view
        Then should show u1


    Rule: select uiControl

        Scenario: select uiControl
            Given select uiControl u1 in ap view
            When select u1
            Then dispatch SelectUIControl action

        Scenario: if already select ui control Scene View before, select ui control Scene View again should error
            Given select uiControl Scene View in ap view
            And select Scene View
            When select Scene View
            Then error


    # Scenario: set uiControls
    #     Given publish uiControl protocol a
    #     And select uiControl a1 for a
    #     When render after useEffectOnceAsync
    #     Then should mark loaded
    #     And should set a's name and icon and a1

    # Scenario: select uiControl
    #     Given publish uiControl protocol a
    #     And select uiControl a1 for a
    #     And render after useEffectOnceAsync
    #     When select a1
    #     Then should dispatch SelectUIControl action

    # # Rule: error case

    # #     Scenario: has zero implement of uiControl protocol
    # #         Given publish uiControl protocol a
    # #         And select uiControl b1 for protocol b
    # #         When render after useEffectOnceAsync
    # #         Then should set empty

    # #     Scenario: has multiple implements of uiControl protocol
    # #         Given publish uiControl protocol a
    # #         And select uiControl a1 and a2 for a
    # #         When render after useEffectOnceAsync
    # #         Then should set empty

    # #     Scenario: uiControl's version not match
    # #         Given publish uiControl protocol a
    # #         And select uiControl a1 for a with old version
    # #         When render after useEffectOnceAsync
    # #         Then should set empty