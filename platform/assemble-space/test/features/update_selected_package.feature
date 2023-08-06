Feature: Update Selected Package
    As a Update Selected Package
    I want to update selected package's extension or contribute by change its func data string
    So that I can update it

    Background: prepare
        Given prepare

    Scenario: show selected package's all extensions' func data string
        Given select package p1 with extension e1 whose func data is f1
        When set inspector current package to p1
        Then should show f1 as string

    Scenario: update selected package by change its extension's func data string
        Given init store
        And select package p1 with extension e1 whose func data is f1
        When update p1 by change f1 string to f2 string
        Then p1's e1's extensionFuncData should be f2