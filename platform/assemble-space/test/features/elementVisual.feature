Feature: ElementVisual
    As a ElementVisual
    I want to visual app
    So that I can see

    Background: prepare
        Given prepare

    Scenario: if not loaded, show loading and canvas
        When not loaded and render
        Then should show loading and canvas

    Scenario: if loaded, only show canvas
        Given prepare the canvas
        And set its width, height
        When loaded and render
        Then should only show canvas

    Scenario: get and set newest visual extension
        Given generate visual extension v1 with old version
        And generate visual extension v2 with newest version
        And publish v1, v2
        When get and set newest visual extension
        Then should dispatch SetVisualExtension action with v2

    Scenario: start app
        Given prepare flag
        And generate empty element contribute element1
        And set element1 to space state
        And get visual extension v
        And generate extension ui
        And generate extension event
        And generate contribute c1
        And select ui
        And select event
        And select c1
        When start app with ui, c1, v
        Then build app with ui, c1, v
        And v should be inited 
        And get element1 from spece state and update it
        And v should be updated