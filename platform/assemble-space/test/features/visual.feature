Feature: Visual
    As a Visual
    I want to view
    So that I can see

    Background: prepare
        Given prepare

    Scenario: show all canvas 
        Given add two canvas
        When render
        Then should show all canvas