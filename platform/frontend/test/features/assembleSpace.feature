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

        Scenario: convert local to custom which are duplicate
            Given select local input1
            And select local input2
            And build custom input1 whose name is duplicated with local input2
            When convert local to custom
            # Then selectedContributes should remove all local inputs
            Then should add converted local input1 to custom inputs and replace custom input1 to local input2

        Scenario: convert local action to custom action which is uneditable
            Given select local action1 which is uneditable
            When convert local to custom
            Then should add converted local actions1 to custom actions


    Rule: remove inputs and actions

        Scenario: selectedContributesFromMarket remove inputs and actions
            Given select local input1
            And select local input2
            And select local action1
            And build custom input1
            When remove inputs and actions
            Then selectedContributes should remove all inputs and actions