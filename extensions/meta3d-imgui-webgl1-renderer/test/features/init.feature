Feature: Init
    As a Init
    I want to init webgl objects
    So that I can use it

    # Background: prepare
    #     Given prepare register
    #     When set gameObject contribute
    #     And create and set the gameObject state

    Scenario: get webgl1 context
        Given prepare sandbox
        When init
        Then get webgl context with config