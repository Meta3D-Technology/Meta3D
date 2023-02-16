Feature: Get All Publish Pacakge Entry Extension Protocols
    As a Get All Publish Pacakge Entry Extension Protocols
    I want to get all publish pacakge entry extension protocols
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: get all publish pacakge entry extension protocols
        Given publish pacakge1 with entry extension protocol1 and account1
        And publish pacakge2 with entry extension protocol1 and account1
        And publish pacakge3 with entry extension protocol2 and account2
        And prepare funcs
        When get all publish pacakge entry extension protocols
        Then should get by page
        And should return entry extension protocol1 and entry extension protocol2 that are not duplicate