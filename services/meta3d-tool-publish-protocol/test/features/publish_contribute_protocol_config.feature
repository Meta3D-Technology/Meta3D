Feature: Publish Contribute Protocol Config
    As a Publish Contribute Protocol Config
    I want to publish contribute protocol's config
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: if publisher is not registered, throw error
        Given prepare funcs
        And make publisher not be registered
        When publish contribute protocol config
        Then should error:                 "publishser没有注册"

    Scenario: add to collection
        Given prepare funcs
        When publish contribute protocol config
        Then should add to collection

    Scenario: if contribute protocol config exist, throw error
        Given prepare funcs
        And publish contribute protocol config
        When publish contribute protocol config with same name and version
        Then should error