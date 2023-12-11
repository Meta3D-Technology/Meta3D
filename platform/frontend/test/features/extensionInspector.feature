Feature: ExtensionInspector
    As a ExtensionInspector
    I want to operate current extension
    So that I can update it

    Background: prepare
        Given prepare

    Scenario: show nothing
        When render
        Then should show nothing

    Scenario: get current extension
        Given set inspector current extension to a1
        When get current extension
        Then should get a1 and its str


# Antd->Input.TextArea cause error: Unable to find node on an unmounted component

# Scenario: show start button
#     Given set inspector current extension to a1
#     When render
#     Then should show start button

# Scenario: show unstart button
#     Given set inspector current extension to a1
#     And start a1
#     When render
#     Then should show unstart button

# # Scenario: set new name input show default name
# #     Given set inspector current extension to a1
# #     And set a1's new name to new1
# #     When render
# #     Then set new name input's default name should be new1
