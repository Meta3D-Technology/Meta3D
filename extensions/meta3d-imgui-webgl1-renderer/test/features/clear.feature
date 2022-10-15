Feature: Clear
    As a Clear
    I want to clear
    So that I can rerender

    Scenario: clear
        Given prepare sandbox
        And prepare webgl1 service
        And prepare webgl context
        When clear
        Then clear color
        And clear
