Feature: Import Element
    As a Import Element
    I want to import element
    So that I can edit it

    Background: prepare
        Given prepare

    # Rule: get and set element assemble data

    #     Scenario: if select more than 1 elements, error
    #         Given generate element contribute element1
    #         And generate element contribute element2
    #         And select element1, element2
    #         When get and set element assemble data
    #         Then should error

    #     Scenario: else if not select any element, set no element assemble data
    #         When get and set element assemble data
    #         Then should set no element assemble data

    #     Scenario: else, get and set its' element assemble data
    #         Given generate element contribute element1
    #         And select element1
    #         When get and set element assemble data
    #         Then should get element1's element assemble data


    Rule: import element

        Scenario: import element
            Given generate u1 of window, u2 of button
            And generate action a1
            And generate input i1
            And select them
            # And select element e1 which has window and custom input1
            # And select element e2 which has button and custom input2, input3
            And select element e1 which has window
            And select element e2 which has button
            When import all selected elements
            Then should generate selected ui controls
            And generate selected ui control inspector data
            # And merge custom inputs
            And dispatch Import action with them