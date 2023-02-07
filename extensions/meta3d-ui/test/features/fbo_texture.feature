Feature: fbo texture
    As a fbo texture
    I want to operate it
    So that I can use it for view

    Scenario: get fbo texture
        Given set a fbo texture to t1
        When get fbo texture
        Then return t1

    # Scenario: set fbo texture
    #     When set a fbo texture
    #     Then get fbo texture should return it

    Scenario: add fbo texture
        Given prepare sandbox
        And prepare imgui renderer service
        And prepare api
        And prepare fbo texture
        When add fbo texture
        Then invoke imgui renderer's addFBOTexture
