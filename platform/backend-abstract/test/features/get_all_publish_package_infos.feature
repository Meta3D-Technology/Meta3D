Feature: Get All Publish Pacakge Infos
    As a Get All Publish Pacakge Infos
    I want to get all publish pacakge infos
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: get all publish pacakge infos
        Given publish pacakge1 with entry extension protocol1
        And publish pacakge2 with entry extension protocol2
        And prepare funcs
        When get all publish pacakge infos of entry extension protocol2
        Then should return package2 info
