Feature: Publish Extension Protocol
    As a Publish Extension Protocol
    I want to publish extension protocol
    So that I can use it

    Background: prepare
        Given prepare sandbox

    Scenario: if publisher is not registered, throw error
        Given prepare funcs
        And make publisher not be registered
        When publish extension protocol
        Then should error:                 "publishser没有注册"

    Scenario: add to collection
        Given prepare funcs
        When publish extension protocol
        Then should add to collection

    Scenario: update icon base64 in collection if exist
        Given prepare funcs
        And publish extension protocol
        When publish extension protocol with same name and version but different icon
        Then should update icon base64 in collection

    Scenario: icon's format should be png
        Given prepare funcs
        When publish extension protocol with jpeg icon
        Then should error: "icon's format should be png"
