Feature: Visual
    As a Visual
    I want to view
    So that I can see

    Background: prepare
        Given prepare

    Scenario: show the canvas
        Given prepare the canvas
        And set its width, height
        When render
        Then should show the canvas