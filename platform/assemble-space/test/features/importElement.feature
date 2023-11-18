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
            Given generate ui control u1, u2
            And select u1
            # And select selected u1
            And select u2
            And select element e1 which has u1
            And select element e2 which has u2
            # And set element assemble data to d1 which has u1, u2
            When import all selected elements
            Then should generate selected u1_1, u2_1
            And generate selected ui control inspector data i1, i2
            And dispatch Import action with u1_1, u2_1, i1, i2