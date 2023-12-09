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
            Then should convert new code
            And get new input name from it
            # dispatch UpdateCustomInputFileStr with converted new code and  generate input name and default file str


