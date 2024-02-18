Feature: CustomInputCodeEdit
    As a CustomInputCodeEdit
    I want to edit custom input code
    So that I can get new file str

    Background: prepare
        Given prepare

    Rule: getNewCode

        Scenario: get new code
            Given build input name and new code
            When get new code
            Then should convert new code to umd
            And get new input name from it
        # dispatch UpdateCustomInputFileStr with converted new code and  generate input name and default file str

        Scenario: if input name exist, warn and not dispatch
            Given add exist input with name as n1
            And build input name as n1 and new code
            When get new code
            Then shouldn't dispatch


    Rule: getCode

        Scenario: get code
            Given build input name and custom inputs
            When get code
            Then should get corresponding file str


