Feature: CanvasController
    As a CanvasController
    I want to operate all canvas
    So that I can use it in ui view

    Background: prepare
        Given prepare

    # Scenario: add canvas
    #     When add two canvas
    #     And render
    #     Then should dispatch SetAllCanvasData action
    #     And show their data

    Scenario: set canvas's data
        Given prepare the canvas
        When set its width, height one by one
        Then should dispatch SetAllCanvasData action twice
