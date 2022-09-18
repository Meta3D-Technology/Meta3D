Feature: Skin
    As a Skin
    I want to be registered
    So that I can get it

    Scenario: register skin
        When register a skin
        Then get skin should return it

