Feature: Fix AssembleSpace Bug
    As a Fix AssembleSpace Bug
    I want to fix assembleSpace bug
    So that I can use it

    Background: prepare
        Given prepare
        And init store

    Scenario: fix "enter ApView should reset" bug
        Given select extension a1 for protocol a in Extensions
        When enter ApView
        And render SelectedExtensions
        Then should reset store
        And should show nothing