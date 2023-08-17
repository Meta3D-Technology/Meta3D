Feature: Batch Find Publish Extension Protocols
    As a Batch Find Publish Extension Protocols
    I want to batch find publish extension protocols by protocol names
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: batch find publish extension protocols
        Given prepare funcs
        And publish extension protocol1
        And publish extension protocol2
        When batch find publish extension protocols by [protocol1.name, protocol2.name]
        Then should return correct data
