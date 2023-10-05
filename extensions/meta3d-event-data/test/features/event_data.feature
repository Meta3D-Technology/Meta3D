Feature: Event Data
    As a Event Data
    I want to export event data and parse
    So that I can implement export and import event

    Background: prepare
        Given prepare

    Rule: parse event data

        Scenario: parse event data
            Given prepare all events include import event event which has eventData as input data
            And generate event data buffer as b1
            When parse b1
            Then should get all events
