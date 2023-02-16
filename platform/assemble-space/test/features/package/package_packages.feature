Feature: PackagePackages
    As a PackagePackages
    I want to show packages
    So that I can use it

    Background: prepare
        Given prepare

    Scenario: show packages list exclude selected packages
        And prepare selected packages from market
        And prepare selected packages
        When render
        Then should show packages list exclude selected packages


    Scenario: select package
        # Given publish package protocol a
        # Given select package a1 for a
        Given select package a1 from market
        And render
        When select a1
        Then should dispatch SelectPackage action
