Feature: Get Element Assemble Data
    As a Get Element Assemble Data
    I want to get element assemble data
    So that I can use import it

    Background: prepare
        Given prepare sandbox

    Scenario: get element assemble data
        Given prepare funcs
        And user u1 publish element assemble data e1
        And user u1 publish element assemble data e2
        When get element assemble data e2
        Then should return e2
