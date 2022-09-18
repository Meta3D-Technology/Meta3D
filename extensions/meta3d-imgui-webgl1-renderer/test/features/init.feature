Feature: Init
    As a Init
    I want to init webgl objects
    So that I can use it

    Background: prepare
        Given prepare sandbox
        And prepare webgl1 service

    Scenario: get webgl1 context
        Given prepare canvas
        When init
        Then get webgl context with config

    Scenario: create program
        When init
        Then create no texture program

    Scenario: init shader
        When init
        Then init no texture shader

    Scenario: send no texture program uniform data
        Given prepare canvas
        When init
        Then use program
        And send ortho projection matrix data

    Scenario: get attribute location
        When init
        Then get a_position, a_color location

    Scenario: create and init vao buffers
        When init
        Then create and init position buffer
        And create and init color buffer
        And create and init index buffer

