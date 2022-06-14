Feature: App Manager
    As a App Manager
    I want to manage app file
    So that I can use it

    Rule: convertAllFileData

        Scenario: version not match
        TODO test convertAllFileData
        #  Given prepare
        #     And generate two extensions that the seond is started
        #     And generate one contribute
        #     And load them and convert
        #     When generate app with them
        #     And load app
        #     Then the two extensions should be registered
        #     And the one contribute should be registered
        #     And the second extension should be started

        Scenario: load generated app
            Given prepare
            And generate two extensions that the seond is started
            And generate one contribute
            And load them and convert
            When generate app with them
            And load app
            Then the two extensions should be registered
            And the one contribute should be registered
            And the second extension should be started