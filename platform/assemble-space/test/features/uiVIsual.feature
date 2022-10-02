Feature: UIVisual
    As a UIVisual
    I want to run app
    So that I can see

    Background: prepare
        Given prepare

    Scenario: show the canvas
        Given prepare the canvas
        And set its width, height
        When render
        Then should show the canvas

    # Rule: init once

    # Scenario: get visual extension once
    Scenario: init once
        Given prepare flag
        And generate visual extension v
        And publish v
        And generate extension e1
        And generate contribute c1
        And select e1
        And select c1
        When init once
        And init app
        And update app
        Then get and load v as v_1
        And build app with e1, v_1 and c1
        And set the v_1
        And mark is load
        And v should be inited and updated

#     Scenario: build app after get visual extension


# Rule: handle when canvas data change

#     Scenario: if canvas data change, init and update app