Feature: Compatible
    As a Compatible
    I want to update old data
    So that I can use them in new version

    Background: prepare
        Given prepare sandbox


    Rule: updateAllDatabaseData

    Scenario: update all data
        Given prepare funcs
        And add user1
        And add user2
        When update all users' old data to new data
        Then should update all users' data