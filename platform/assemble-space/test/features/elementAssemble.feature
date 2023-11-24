Feature: ElementAssemble
    As a ElementAssemble
    I want to assemble element
    So that I can use it

    Background: prepare
        Given prepare

    Scenario: add generated custom to selected contributes
        Given prepare service
        And prepare custom data
        When add generated custom to selected contributes
        Then selected contributes should has them
