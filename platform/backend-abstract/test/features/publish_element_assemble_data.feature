Feature: Publish Element Assemble Data
    As a Publish Element Assemble Data
    I want to publish
    So that I can use it in Element Assemble

    Background: prepare
        Given prepare sandbox

    Scenario: add to collection
        Given prepare funcs
        When publish
        Then should add to collection

    Scenario: if element assemble data with the same publisher, element name, element version exist, throw error
        Given prepare funcs
        And publish
        When publish with the same publisher, element name, element version
        Then should error


    # Rule: findPublishNewestElementVersion

    #     Scenario: if not find, return empty
    #         Given prepare funcs
    #         When find the published element version
    #         Then should return empty

    #     Scenario: if find, return published newest element version
    #         Given prepare funcs
    #         And publish old one and new one
    #         When find the published element version
    #         Then should return the newest element version
