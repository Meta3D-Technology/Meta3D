Feature: Extension File Manager
    As a Extension File Manager
    I want to manage extension and contribute file
    So that I can use it

    Scenario: load generated extension
        Given prepare
        When generate extension and load it
        Then get package data
        And get func data

    Scenario: load generated contribute
        Given prepare
        When generate contribute and load it
        Then get package data
        And get func data
