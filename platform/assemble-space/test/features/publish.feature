Feature: Publish
    As a Publish
    I want to publish app
    So that I can use it

    Background: prepare
        Given prepare

    Scenario: show publish button
        When render Publish
        Then should show publish button

    # Scenario: show modal after click publish button
    #     When render Publish
    #     And click publish button
    #     Then should show modal

    Scenario: publish when select nothing
        When publish app
        Then should error

    Rule: Publish

        # Background: prepare selected packages and selected extensions and contributes
        Background: prepare selected packages and contributes
            # Given select extension e1, e2
            Given select contribute c1, c2
            And select package p1 which isn't stored in app and is start, p2 which is stored in app

        # Scenario: generate correct app without config data
        #     When publish app
        #     Then error for get config data

        Scenario: generate correct app with config data
            Given prepare canvas data
            # And select extension e3
            And prepare config data
            And prepare ap inspector data
            When publish app
            Then should mark begin upload
            # And should generat app with correct extension data and contribute data and start config data
            And should generat app with correct contribute data and start config data
            And should publish the generated app
            And should mark finish upload
            And should close modal