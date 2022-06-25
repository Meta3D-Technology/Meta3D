Feature: App Manager
    As a App Manager
    I want to manage app file
    So that I can use it

    Background: prepare
        Given prepare

    Rule: convertAllFileData

        Scenario: version not match case1
            Given generate two extensions that version not match
            And prepare new names
            And load them as l1
            When convert l1
            Then error

        Scenario: version not match case2
            Given generate one extension
            And generate one contribute that version not match
            And prepare new names
            And load them as l1
            When convert l1
            Then error

        Scenario: version match case1
            Given generate one extension
            And generate one contribute that version match
            And prepare new names
            And load them as l1
            When convert l1
            Then not error

        Scenario: convert allExtensionFileData and allContributeFileData
            Given generate two extensions that the seond is started
            And generate one contribute
            And prepare new names
            And load them as l1
            When convert l1
            Then converted package data is correct

    Rule: load generated app

        Scenario: load generated app
            Given prepare flag
            And generate two extensions
            And generate one contribute
            And prepare new names and start the second extension
            And load them and convert as c1
            When generate app with c1 and load it
            Then the two extensions should be registered
            And the one contribute should be registered
            And the second extension should be started