Feature: Render
    As a Render
    I want to render
    So that I can see it

    Background: prepare
        Given prepare sandbox

    # Scenario: set io data
    #     Given prepare api
    #     When render
    #     Then set io data


    Rule: exec all element funcs

        Scenario: if not show, not exec
            Given register element func1
            And hide it
            And prepare api
            When render
            Then not exec func1

        Scenario: else, invoke imgui renderer's before exec and exec and mark state not change by ascending order and invoke imgui renderer's after exec
            Given prepare imgui renderer service
            And register element func1 with exec order=1
            And register element func2 with exec order=0
            And mark their states change
            And show them
            And prepare api
            When render
            Then invoke imgui renderer's before exec with time
            And exec func2 and func1
            And mark their states not change
            And invoke imgui renderer's after exec


    Rule: render imgui renderer

        Scenario: render imgui renderer
            Given prepare imgui renderer service
            And prepare api
            When render
            Then render imgui renderer
            And update imgui renderer state