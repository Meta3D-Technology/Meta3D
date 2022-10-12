Feature: Publish Element Contribute
    As a Publish Element Contribute
    I want to publish
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: if publisher is not registered, throw error
        Given prepare funcs
        And make publisher not be registered
        When publish
        Then should error:                 "publishser没有注册"

    Scenario: upload file and add to collection
        Given prepare funcs
        When publish
        Then should upload file
        And should add to collection

    Scenario: if element contribute with the same publisher, version, protocol name exist, throw error
        Given prepare funcs
        And publish
        When publish with the same publisher, version, protocol name
        Then should error
