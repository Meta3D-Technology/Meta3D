Feature: Tree Data
    As a Tree Data
    I want to generate tree's data
    So that I can show tree

    Background: prepare
        Given prepare sandbox

    Rule: convertTreeData

        Scenario: convert tree data with all texture data
            Given prepare api
            And prepare tree data
            When convert tree data with all texture data
            Then should get the same structure but replace nodeType to texture

        Scenario: convert tree data with some texture data
            Given prepare api
            And prepare tree data
            When convert tree data with some texture data
            Then should get empty
