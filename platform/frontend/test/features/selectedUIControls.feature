Feature: SelectedUIControls
    As a SelectedUIControls
    I want to select ui control
    So that I can add them to view

    Background: prepare
        Given prepare

    Scenario: convert to tree data
        Given prepare selected ui controls
        And prepare selected ui control inspector data
        When convert to tree data
        Then title should show label of selected ui control inspector data first then fallback to displayName of selected ui controls

