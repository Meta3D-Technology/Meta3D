Feature: Custom
    As a Custom
    I want to operate custom contributes
    So that I can add them to selectedContributes

    Background: prepare
        Given prepare

    Rule: Input

        Scenario: get input name from input file str
            Given build default input file str
            When get input name from it
            Then should get default input name

