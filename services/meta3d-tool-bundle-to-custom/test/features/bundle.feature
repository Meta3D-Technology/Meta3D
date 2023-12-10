Feature: bundle
    As a bundle
    I want to bundle for custom
    So that I can compile local to custom

    Background: prepare
        Given prepare

    # Scenario: bundle source which has no value import
    #     Given prepare source
    #     When bundle
    #     Then should just compile it

    Scenario: bundle source which has protocol value import
        Given prepare source
        When bundle
        Then should compile and bundle it

    Scenario: bundle source which has utils import
        Given prepare source
        When bundle
        Then should compile and bundle it
