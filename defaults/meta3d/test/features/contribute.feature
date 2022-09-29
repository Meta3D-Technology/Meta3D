Feature: Contribute
    As a Contribute
    I want to register it
    So that I can get it

    Scenario: get all contributes by type
        Given register action, component, element, ui control, gameObject, workPlugin contributes
        When get all contributes by each type by api
        Then get them

    Scenario: if register contribute with unknown type, error
        When register unknown type contribute
        Then error
