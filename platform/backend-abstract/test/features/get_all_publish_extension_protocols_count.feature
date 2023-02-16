Feature: Get All Publish Extension Protocols Count
    As a Get All Publish Extension Protocols Count
    I want to get all publish extension protocols' count
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: get all publish extension protocols' count
        Given prepare funcs
        And publish extension protocol1
        And publish extension protocol2
        When get all publish extension protocols' count
        Then should return 2
