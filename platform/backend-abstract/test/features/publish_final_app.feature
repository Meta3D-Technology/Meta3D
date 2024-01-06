Feature: Publish FinalApp
    As a Publish FinalApp
    I want to publish finalApp
    So that I can enter it

    Background: prepare
        Given prepare sandbox

    Rule: publish

        Scenario: if not exist, publish should add finalApp
            Given prepare funcs
            And generate a finalApp
            When publish the finalApp
            Then should upload finalApp
            And add to collection

        Scenario: if exist, publish should overwrite finalApp
            Given prepare funcs
            And generate two finalApps with the same key
            And publish the first finalApp
            When publish the second finalApp
            Then should delete the first finalApp's binary file
            And upload the second finalApp's binary file
            And update collection

    # Rule: findPublishFinalApp

    #     Scenario: if not find, findPublishFinalApp return empty
    #         Given prepare funcs
    #         When find the published finalApp
    #         Then should return empty

    #     Scenario: if find, findPublishFinalApp return published finalApp file
    #         Given prepare funcs
    #         And generate a finalApp
    #         And publish the finalApp
    #         When find the published finalApp by not use cache
    #         Then should return the finalApp file not use cache

    # Rule: findAllPublishFinalApps

    #     Scenario: if not find, findAllPublishFinalApps return empty array
    #         Given prepare funcs
    #         When find all published finalApps
    #         Then should return empty array

    #     Scenario: if find, findAllPublishFinalApps return all publish finalApp data
    #         Given generate two finalApps by two users
    #         And prepare funcs
    #         And publish the finalApps
    #         When find all published finalApps
    #         Then should return the finalApps' data