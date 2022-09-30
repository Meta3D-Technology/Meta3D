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

    Rule: load and start generated app

        Background: prepare flag
            Given prepare flag

        Scenario: load and start generated app
            Given generate two extensions
            And generate one contribute
            And prepare new names and start the second extension
            And load them and convert as c1
            When generate app with c1 and load it and start it
            Then the two extensions should be registered
            And the one contribute should be registered
            And the second extension should be started

        Scenario: if two extension need start, error
            Given generate two extensions
            And start them
            And load them and convert as c1
            When generate app with c1 and load it
            Then start it should error

    Rule: load and handle generated app

        Background: prepare for load and handle generated app
            Given prepare flag
            And generate two extensions
            And prepare new names
            And load them and convert as c1

        Scenario: load and init generated app
            When generate app with c1 and load it and init the first extension
            Then the first extension should be inited

        Scenario: load and update generated app
            When generate app with c1 and load it and update the second extension
            Then the second extension should be updated