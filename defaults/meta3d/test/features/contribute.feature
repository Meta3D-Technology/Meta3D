Feature: Contribute
    As a Contribute
    I want to register it
    So that I can get it

    Scenario: get all contributes by type
        Given register action, component, element, ui control, skin, gameObject, pipeline contributes
        When get all contributes by each type by api
        Then get them

    Scenario: register contribute with unknown type
        When register unknown type contribute
        And get all contributes by input type by api
        Then get empty



    Rule: error case

        Scenario: register contribute which is not input and already registered before
            Given register contribute of protocol name p1
            When register contribute of protocol name p1
            Then error

        Scenario: register contribute which is input and already registered before
            Given register input a1 of protocol name p1
            When register input a2 of protocol name p1
            Then not error
