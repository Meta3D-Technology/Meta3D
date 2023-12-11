Feature: Update Selected Extension
    As a Update Selected Extension
    I want to update selected extension by change its func data string
    So that I can update it

    Background: prepare
        Given prepare

    Scenario: show selected extension's extension string
        Given select extension a1 in Extensions whose extensionFuncData is f1
        When set inspector current extension to a1
        Then should show f1 as string

    Scenario: update selected extension by change extension string
        Given init store
        And select extension a1 in Extensions whose extensionFuncData is f1
        When update a1 by change f1 string to f2 string
        Then a1's extensionFuncData should be f2