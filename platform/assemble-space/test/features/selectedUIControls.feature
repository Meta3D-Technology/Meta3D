Feature: Selected UIControls
    As a Selected UIControls
    I want to show selected uiControls
    So that I can use it

    Background: prepare
        Given prepare

    # Scenario: show selected uiControls
    #     Given select uiControl u1, u2
    #     When render
    #     Then should show u1 and u2

    Scenario: show selected hierachy uiControls 
        Given select uiControl u1, u2 that u2 is child of u1
        When render
        Then should show u1 and u2