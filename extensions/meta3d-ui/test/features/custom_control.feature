Feature: Custom Control
    As a Custom Control
    I want to be registered
    So that I can get it

    Scenario: register custom control
        When register a custom control
        Then get custom control should return it

