Feature: UIVisual
    As a UIVisual
    I want to run app
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

    Scenario: get and set visual extension
        Given generate visual extension v
        And publish v
        When get and set visual extension
        Then should dispatch SetVisualExtension action

    Scenario: render app
        Given prepare flag
        And generate empty element contribute element1
        And get visual extension v
        And generate extension ui
        And generate contribute c1
        And select ui
        And select c1
        When render app with ui, c1, v
        Then build app with ui, v and c1
        And v should be inited and updated
