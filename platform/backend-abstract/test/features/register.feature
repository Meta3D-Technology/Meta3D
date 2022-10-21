Feature: Register
    As a Register
    I want to register
    So that I can login

    Background: prepare
        Given prepare sandbox

    Scenario: register
        Given prepare funcs
        When register
        Then should add username(key), password to collection
        And create user empty data

    # Rule: check username

    # Scenario: check username fail
    #     Given prepare funcs
    #     And register
    #     When check username
    #     Then should fail

    # Scenario: check username success
    #     Given prepare funcs
    #     When check username
    #     Then should success