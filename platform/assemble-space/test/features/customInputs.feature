Feature: CustomInputs
    As a CustomInputs
    I want to operate custom inputs
    So that I can add them to selectedContributes

    Background: prepare
        Given prepare

    # Rule: Input

    #     Scenario: get input name from input file str
    #         Given build default input file str
    #         When get input name from it
    #         Then should get default input name

    # Scenario: show tree ui
    #     Given build custom inputs
    #     When render
    #     Then should show tree ui

Rule: addCustomInput

    Scenario: add custom input
        Given build custom inputs
        When add custom input
        Then should generate input name and default file str


