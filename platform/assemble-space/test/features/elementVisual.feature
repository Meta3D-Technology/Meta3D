Feature: ElementVisual
    As a ElementVisual
    I want to visual app
    So that I can see

    Background: prepare
        Given prepare

    Scenario: if not loaded, show loading
        When not loaded and render
        Then should show loading

    Scenario: if loaded, show the canvas
        Given prepare the canvas
        And set its width, height
        When loaded and render
        Then should show the canvas

    Scenario: get and set newest visual extension
        Given generate visual extension v1 with old version
        And generate visual extension v2 with newest version
        And publish v1, v2
        When get and set newest visual extension
        Then should dispatch SetVisualExtension action with v2

    Scenario: render app
        Given prepare flag
        And generate empty element contribute element1
        And get visual extension v
        And generate extension ui
        And generate extension event
        And generate contribute c1
        And select ui
        And select event
        And select c1
        When render app with ui, c1, v, element1
        Then build app with ui, c1, v, element1
        And v should be inited and updated


