Feature: ElementVisual
    As a ElementVisual
    I want to visual app
    So that I can see

    Background: prepare
        Given prepare

    # Scenario: if not loaded, show loading and canvas
    #     When not loaded and render
    #     Then should show loading and canvas

    Scenario: show canvas
        Given prepare the canvas
        And set its width, height
        When render
        Then should show canvas

    # Scenario: get and set newest visual extension
    #     Given generate visual extension v1 with old version
    #     And generate visual extension v2 with newest version
    #     And publish v1, v2
    #     When get and set newest visual extension
    #     Then should dispatch SetVisualExtension action with v2


    # Rule: start app

    # Background: prepare start app
    #     Given prepare flag
    #     And generate empty element contribute element1
    #     And set element1 to space state
    #     And get visual extension v
    #     And generate extension ui
    #     And generate extension event
    #     And generate contribute c1
    #     And select ui
    #     And select event
    #     And select c1

    Scenario: start app
        Given prepare flag
        And generate empty element contribute element1
        And set element1 to space state
        And prepare one input file str in one ui control inspector data
        And prepare one action file str in one ui control inspector data
        And generate editor whole package with extension e1
        And select editor whole
        When start app with editor whole
        Then e1 should be inited
        And register one generated input contribute one generated action contribute
        And get element1 from space state and update it
        And e1 should be updated
        And store frame id

    Scenario: cancel app loop when unmount
        Given set loop frame id to i1
        When cancel loop when unmount
        Then cancel animation frame by i1