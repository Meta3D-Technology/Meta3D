Feature: Get All Publish Extension Infos
    As a Get All Publish Extension Infos
    I want to get all publish extension infos
    So that I can show them

    Background: prepare
        Given prepare sandbox

    Scenario: one extension implement one protocol
        Given prepare funcs
        And publish extension1
        And publish extension2
        When get all publish extension infos
        Then should return correct data

    Scenario: two extensions implement one protocol
        Given prepare funcs
        And publish extension1 for protocol1
        And publish extension2 for protocol1
        When get all publish extension infos
        Then should return correct data

    Scenario: get empty
        Given prepare funcs
        When get all publish extension infos
        Then should return empty data
