Feature: Publish Element
    As a Publish Element
    I want to publish element
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

    # Scenario: publish when has no element contribute data
    #     When publish
    #     Then should error

    Rule: Publish

        Background: prepare data
            Given prepare data

        # Scenario: generate element contribute
        #     When publish
        #     Then should generat element contribute

        # Scenario: publish element contribute
        #     When publish
        #     Then should mark begin upload
        #     And should publish generated element contribute

        Scenario: publish element assemble data
            When publish
            Then should find newest element version
            And publish element assemble data

        Scenario: handle after publish successfully
            When publish
            Then should mark finish upload
            And should close modal