Feature: Get All Publish Newest Extension
    As a Get All Publish Newest Extension
    i want to get all publish newest extension
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: two protocols with two versions and implement by two user
        Given prepare funcs
        And user1 publish extension1 for protocol1 and low version
        And user1 publish extension2 for protocol2 and low version
        And user1 publish extension3 for protocol1 and high version
        And user2 publish extension4 for protocol1 and high version
        And user2 publish extension5 for protocol2 and high version
        When get all publish newest extensions of protocol1
        Then should return [extension3, extension4]