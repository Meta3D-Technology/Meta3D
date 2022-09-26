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

        Scenario: generate correct app
            When publish app
            Then should generat app with correct extension data and contribute data

        Scenario: publish generated app
            When publish app
            Then should publish the generated app

        Scenario: close modal after publish successfully
            When publish app
            Then should close modal