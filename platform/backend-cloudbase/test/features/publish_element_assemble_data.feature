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
