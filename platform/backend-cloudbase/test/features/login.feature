Feature: Login
    As a Login
    I want to login
    So that I can enter

    Background: prepare
        Given prepare sandbox

    Scenario: login fail: user not be registered
        Given prepare funcs
        When login
        Then should fail

    Scenario: login fail: password wrong
        Given prepare funcs
        And register
        When login with wrong password
        Then should fail

    Scenario: login success
        Given prepare funcs
        And register
        When login
        Then should success