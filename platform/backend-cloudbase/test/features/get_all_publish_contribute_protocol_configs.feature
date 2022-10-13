Feature: Get All Publish Contribute Protocol Configs
    As a Get All Publish Contribute Protocol Configs
    I want to get all publish contribute protocol configs
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: get all publish contribute protocol configs
        Given prepare funcs
        And publish contribute protocol config1
        And publish contribute protocol config2
        When get all publish contribute protocol configs
        Then should return correct data
