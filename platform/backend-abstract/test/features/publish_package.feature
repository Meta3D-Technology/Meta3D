Feature: Publish Package
    As a Publish Package
    I want to publish package
    So that I can enter it

    Background: prepare
        Given prepare sandbox

    Rule: publish

        Scenario: if not exist, publish should add package
            Given prepare funcs
            And generate a package
            # And generate pacakge's entry protocol data
            When publish the package
            Then should upload package
            And add to collection

        Scenario: if exist, publish should overwrite package
            Given prepare funcs
            And generate two packages with the same key
            And publish the first package
            When publish the second package
            Then should upload package2's binary file
            And update collection

    # Rule: findPublishPackage

    #     Scenario: if not find, findPublishPackage return empty
    #         Given prepare funcs
    #         When find the published package
    #         Then should return empty

    #     Scenario: if find, findPublishPackage return published package file
    #         Given prepare funcs
    #         And generate a package
    #         And publish the package
    #         When find the published package
    #         Then should return the package file

    # Rule: findAllPublishPackages

    #     Scenario: if not find, findAllPublishPackages return empty array
    #         Given prepare funcs
    #         When find all published packages
    #         Then should return empty array

    #     Scenario: if find, findAllPublishPackages return all publish package data
    #         Given generate two packages by the same user
    #         And prepare funcs
    #         And publish the packages
    #         When find all published packages
    #         Then should return the packages' data