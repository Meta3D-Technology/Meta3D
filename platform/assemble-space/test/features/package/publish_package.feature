Feature: Publish Package
    As a Publish Package
    I want to publish package
    So that I can use it

    Background: prepare
        Given prepare

    Scenario: show publish button
        When render Publish
        Then should show publish button

    Scenario: publish when select nothing
        When publish package
        Then should error

    Rule: Publish

        # Background: prepare selected packages and selected extensions and contributes
        #     Given select package p1
        #     And select extension e1, e2 without newName
        #     And select contribute c1, c2 with newName

        Scenario: generate correct package
            # Given select extension e1, e2 without newName
            # And select contribute c1, c2 with newName
            Given select extension e1, e2
            And select contribute c1, c2
            And select entry extension e3
            And select package p1
            When publish package
            Then should mark begin upload
            And should generat package with correct extension data and contribute data
            And should publish the generated package
            And should mark finish upload
            And should close modal