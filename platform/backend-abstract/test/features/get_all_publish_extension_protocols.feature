Feature: Get All Publish Extension Protocols
    As a Get All Publish Extension Protocols
    I want to get all publish extension protocols
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: get all publish extension protocols
        Given prepare funcs
        And publish extension protocol1
        And publish extension protocol2
        When get all publish extension protocols
        Then should return correct data
