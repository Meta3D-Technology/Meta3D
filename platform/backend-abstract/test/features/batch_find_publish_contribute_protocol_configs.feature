Feature: Bath Find Publish Contribute Protocol Configs
    As a Bath Find Publish Contribute Protocol Configs
    I want to batch find publish contribute protocol configs by protocol names
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: batch find publish contribute protocol configs
        Given prepare funcs
        And publish contribute protocol config1
        And publish contribute protocol config2
        When find all publish contribute protocol configs by [ protocol config1's name, protocol config2's name]
        Then should return correct data
