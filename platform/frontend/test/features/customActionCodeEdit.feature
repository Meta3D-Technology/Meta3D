Feature: CustomActionCodeEdit
    As a CustomActionCodeEdit
    I want to edit custom action code
    So that I can get new file str

    Background: prepare
        Given prepare

    Scenario: get action name
        Given build file str whose action name is string
        When get action name
        Then should get correct name

    Scenario: get action name come from protocol
        Given build file str whose action name come from protocol
        When get action name
        Then should get correct name