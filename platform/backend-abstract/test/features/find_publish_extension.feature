Feature: Find Publish Extension
    As a Find Publish Extension
    I want to find publish extension
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: if not find, return empty
        Given prepare funcs
        When find the published extension
        Then should return empty

    Scenario: if find, return published extension file
        Given prepare funcs
        And publish extension1
        When find the published extension
        Then should get with limitCount and skipCount
        And should return the extension file
