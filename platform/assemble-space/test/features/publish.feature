Feature: Publish
    As a Publish
    I want to publish app
    So that I can use it

    Background: prepare
        Given prepare sandbox
        And prepare snapshot

    Scenario: show publish button
        When render Publish
        Then should show publish button

    # Scenario: show modal after click publish button
    #     When render Publish
    #     And click publish button
    #     Then should show modal