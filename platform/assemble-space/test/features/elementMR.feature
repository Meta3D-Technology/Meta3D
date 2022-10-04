Feature: ElementMR
    As a ElementMR
    I want to build element mr and generate str from it
    So that I can use str as element extension for build app

    Background: prepare
        Given prepare

    Scenario: build element middle represent with two buttons and generate element contribute string
        Given generate ui control button b1, b2
        And select b1, b2
        And prepare b1's, b2's inspector data
        When build element middle represent with b1, b2 and their inspector data
        And generate element contribute string
        Then should build correct result
        And generate correct result

    Scenario: build element middle represent with event and generate element contribute string
        Given generate ui control button b1
        And select b1
        And prepare b1's inspector data
        When build element middle represent with b1 and their inspector data
        And generate element contribute string
        Then should build correct result
        And generate correct result