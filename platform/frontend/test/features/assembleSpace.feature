Feature: AssembleSpace
    As a AssembleSpace
    I want to assemble
    So that I can use it

    Background: prepare
        Given prepare

    Rule: get imported element custom

        Scenario: get imported element custom
            Given select element e1 which has custom input1
            And select element e2 which has custom input2 duplicate with custom input1 and has custom input3
            When get imported all selected elements's custom
            Then get merged custom inputs as [custom input1, custom input3]


    Rule: convert local to custom

        Scenario: convert local to custom
            Given select local input1
            And select local input2
            And build custom input1 whose name is duplicated with local input2
            When convert local to custom
            Then selectedContributes should remove all local inputs
            And should add converted local input1 to custom inputs