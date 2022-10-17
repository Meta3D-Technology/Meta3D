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

        Background: prepare selected extensions and contributes
            Given select extension e1, e2 without newName
            And select contribute c1, c2 with newName

        Scenario: generate correct app without config data
            When publish app
            Then error for get config data

        Scenario: generate correct app with config data
            Given prepare canvas data
            And select start extension e3
            And prepare config data
            When publish app
            Then should generat app with correct extension data and contribute data and start config data
            And should publish the generated app
            And should close modal