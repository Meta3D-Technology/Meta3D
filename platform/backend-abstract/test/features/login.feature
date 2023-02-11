Feature: Login Service
    As a Login Service
    I want to operate login
    So that I can login

    Background: prepare
        Given prepare sandbox

    Rule: isLoginSuccess

        Scenario: login fail
            Given prepare funcs
            When get is u1 login success
            Then should return false data

        Scenario: login success
            Given prepare funcs
            And register user u1
            When get is u1 login success
            Then should return true data