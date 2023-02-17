Feature: Find Publish Package
    As a Find Publish Package
    I want to find published package
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: if not find, findPublishPackage return empty
        Given prepare funcs
        When find the published package
        Then should return empty

    Scenario: if find, findPublishPackage return published package file
        Given generate a package
        And prepare funcs
        And publish the package
        When find the published package
        Then should get with limitCount and skipCount
        And should return the package file
