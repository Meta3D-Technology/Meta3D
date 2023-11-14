Feature: App Manager
    As a App Manager
    I want to manage app file
    So that I can use it

    Background: prepare
        Given prepare

    Rule: convertAllFileData

        # Scenario: version not match case1
        #     Given generate two extensions that version not match
        #     # And prepare new names
        #     And load them as l1
        #     When convert l1
        #     Then error

        # Scenario: version not match case2
        #     Given generate one extension
        #     And generate one contribute that version not match
        #     # And prepare new names
        #     And load them as l1
        #     When convert l1
        #     Then error

        # Scenario: version not match case3
        #     Given generate one extension
        #     And generate one package entry extension protocol data that version not match
        #     # And prepare new names
        #     And load them as l1
        #     When convert l1
        #     Then error

        # Scenario: version match case1
        #     Given generate one extension
        #     And generate one contribute that version match
        #     And generate one package entry extension protocol data that version match
        #     # And prepare new names
        #     And load them as l1
        #     When convert l1
        #     Then not error

        # Scenario: convert allExtensionFileData and allContributeFileData and allPackageEntryExtensionProtocolData
        # Scenario: convert allExtensionFileData and allContributeFileData
        Scenario: convert allContributeFileData
            # Given generate two extensions that the seond is started
            Given generate one contribute
            # And generate one package entry extension protocol data
            # And prepare new names
            And load them as l1
            When convert l1
            Then converted package data is correct


    Rule: load and check

        Background: prepare flag
            Given prepare flag

        # Scenario: version not match case1
        #     Given generate two extensions that version not match
        #     # And start the second extension
        #     And load them and convert as c1
        #     When generate app with c1 and load it
        #     Then error

        # Scenario: version not match case2
        #     Given generate one extension
        #     And generate one contribute that version not match
        #     # And start the first extension
        #     And load them and convert as c1
        #     When generate app with c1 and load it
        #     Then error

        # Scenario: version not match case3
        #     Given generate one extension
        #     And generate one package as p1 with one extension that not match
        #     # And generate one package entry extension protocol data that version not match
        #     And load them and convert as c1
        #     When generate app with c1, p1 and load it
        #     Then error

        # Scenario: version match case1
        #     Given generate one extension
        #     And generate one package as p1 with one extension that match
        #     And load them and convert as c1
        #     When generate app with c1, p1 and load it
        #     Then not error


    Rule: load and start generated app

        Background: prepare flag
            Given prepare flag

        Scenario: load and start generated app
            # Given generate two extensions
            Given generate one contribute
            And generate one package as p1 with one extension e1 and one contribute ct1
            # And generate one package entry extension protocol data
            # And prepare new names and start the second extension
            # And start the second extension
            And start p1
            And load them and convert as c1
            And prepare config data
            When generate app with c1, p1, config data and load it and start it
            # Then the three extensions should be registered
            # And the two contributes should be registered
            Then e1, ct1 should be registered
            # And the two contributes should be registered
            And load result should has correct config data
            # And the second extension should be started
            And e1 should be started

        # Scenario: if two extension need start, error
        #     Given generate two extensions
        #     And start them
        #     And load them and convert as c1
        #     When generate app with c1 and load it
        #     Then start it should error

    # Rule: load and handle generated app

    #     Background: prepare for load and handle generated app
    #         Given prepare flag
    #         And generate two extensions
    #         # And prepare new names
    #         And load them and convert as c1

    #     Scenario: load and init generated app
    #         When generate app with c1 and load it and init the first extension
    #         Then the first extension should be inited

    #     Scenario: load and update generated app
    #         When generate app with c1 and load it and update the second extension
    #         Then the second extension should be updated


    Rule: load generated app with package store in app

        Background: prepare flag
            Given prepare flag

        Scenario: load generated app with package store in app
            Given generate empty package p1
            When generate app with p1 and load it
            Then get pacakge of p1's protocol name should return p1


    Rule: get all pacakge and extension and contribute file data of app

        # Background: prepare flag
        #     Given prepare flag

        Scenario: get all pacakge and extension and contribute file data of app
            Given generate one package as p1
            # And generate one extension as e1
            And generate one contribute as c1
            # And load e1, c1 and convert as l1
            And load c1 and convert as l1
            And generate app with p1, l1 as a1
            When get all pacakge and extension and contribute file data of a1
            # Then should return parsed p1, parsed e1, parsed c1
            Then should return parsed p1, parsed c1
