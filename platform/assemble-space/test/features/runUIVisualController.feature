Feature: RunUIVisualController
    As a RunUIVisualController
    I want to control run element
    So that I can run or not run

    Background: prepare
        Given prepare

    Scenario: if data not ready, show waiting
        When data not ready and render
        Then should show waiting

    Scenario: if data ready, show run button
        Given prepare runVisualExtension, elementContribute
        When render
        Then should show run button

    Scenario: get and set run visual extension
        Given generate run visual extension v1 with old version
        And generate run visual extension v2 with newest version
        And publish v1, v2
        When get and set run visual extension
        Then should dispatch SetRunVisualExtension action with v2

    Scenario: run
        Given generate empty element contribute element1
        And get run visual extension v
        And prepare canvas data
        And prepare local storage
        And prepare open
        # And generate extension ui
        # And generate contribute c1
        # And select ui
        # And select c1
        # When run with ui, c1, v, element1
        # Then generate app with ui, c1, v, element1
        When run
        Then generate app
        And save app to local storage
        And open link with canvas data to run


