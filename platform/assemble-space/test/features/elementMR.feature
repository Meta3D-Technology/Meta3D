Feature: ElementMR
    As a ElementMR
    I want to build element mr and generate str from it
    So that I can use str as element extension for build app

    Background: prepare
        Given prepare

    Scenario: build element middle represent with two buttons and generate element contribute string
        Given generate ui control button b1, b2
        And select b1, b2
        And prepare element inspector data
        And prepare b1's, b2's inspector data
        When build element middle represent with b1, b2 and inspector data
        And generate element contribute string
        Then should build correct result
        And generate correct result

    Scenario: build element middle represent with event and generate element contribute string
        Given generate ui control button b1
        And select b1
        And prepare b1's inspector data
        When build element middle represent with b1 and inspector data
        And generate element contribute string
        Then should build correct result
        And generate correct result

    Scenario: build element middle represent with reducer and generate element contribute string
        Given prepare reducers
        When build element middle represent with reducers
        And generate element contribute string
        Then should build correct result
        And generate correct result

    Scenario: build element middle represent with parent window and child window and generate element contribute string
        Given generate ui control window w1, w2
        And select w1
        And select selected w1
        And select w2
        And prepare element inspector data
        And prepare w1's, w2's inspector data
        When build element middle represent with w1, w2 and inspector data
        And generate element contribute string
        Then should build correct result
        And generate correct result
