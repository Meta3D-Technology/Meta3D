Feature: Publish App
    As a Publish App
    I want to publish app
    So that I can enter it

    Background: prepare
        Given prepare sandbox

    Rule: publish

        Scenario: if not exist, publish should add app
            Given prepare funcs
            And generate a app
            When publish the app
            Then should upload app
            And add to collection

        Scenario: if exist, publish should overwrite app
            Given prepare funcs
            And generate two apps with the same key
            And publish the first app
            When publish the second app
            Then should upload app2's binary file
            And update collection

    Rule: findPublishApp

        Scenario: if not find, findPublishApp return empty
            Given prepare funcs
            When find the published app
            Then should return empty

        Scenario: if find, findPublishApp return published app file
            Given prepare funcs
            And generate a app
            And publish the app
            When find the published app
            Then should return the app file

    Rule: findAllPublishAppsByAccount

        Scenario: if not find, findAllPublishAppsByAccount return empty array
            Given prepare funcs
            When find all published apps
            Then should return empty array

        Scenario: if find, findAllPublishAppsByAccount return all publish app data
            Given generate two apps by the same user
            And prepare funcs
            And publish the apps
            When find all published apps
            Then should return the apps' data

    Rule: findAllPublishApps

        Scenario: if not find, findAllPublishApps return empty array
            Given prepare funcs
            When find all published apps
            Then should return empty array

        Scenario: if find, findAllPublishApps return all publish app data
            Given generate two apps by two users
            And prepare funcs
            And publish the apps
            When find all published apps
            Then should return the apps' data