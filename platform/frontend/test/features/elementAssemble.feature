Feature: ElementAssemble
    As a ElementAssemble
    I want to assemble element
    So that I can use it

    Background: prepare
        Given prepare

    Rule: import element custom

        Scenario: import element custom
            # Given generate u1 of window, u2 of button
            # # And generate action a1
            # # And generate input i1
            # And select them
            Given select element e1 which has custom input1
            And select element e2 which has custom input2 duplicate with custom input1 and has custom input3
            When import all selected elements's custom
            Then merge custom inputs to [custom input1, custom input3]
            And dispatch ImportElementCustom action with them


    Rule: add generated custom

        Scenario: add generated custom to selected contributes
            Given prepare service
            And prepare custom data
            When add generated custom to selected contributes
            Then selected contributes should has them
