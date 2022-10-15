Feature: Import Element
    As a Import Element
    I want to import element
    So that I can edit it

    Background: prepare
        Given prepare

    Rule: get and set element assemble data

        Scenario: if select more than 1 elements, error
            Given generate element contribute element1
            And generate element contribute element2
            And select element1, element2
            When get and set element assemble data
            Then should error

        Scenario: else if not select any element, set no element assemble data
            When get and set element assemble data
            Then should set no element assemble data

        Scenario: else, get and set its' element assemble data
            Given generate element contribute element1
            And select element1
            When get and set element assemble data
            Then should get element1's element assemble data


    Rule: import element

        Scenario: import element
            Given generate ui control u1
            And select u1
            And set element assemble data to d1 which has u1 and element inspector data ei1
            When import d1
            Then should generate selected u1_1
            And generate selected ui control inspector data i1
            And dispatch Import action with u1_1, i1, ei1