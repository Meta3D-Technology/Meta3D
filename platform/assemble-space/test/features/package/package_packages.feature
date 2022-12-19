Feature: PackagePackages
    As a PackagePackages
    I want to show packages
    So that I can use it

    Background: prepare
        Given prepare

    Scenario: show packages list
        When render
        Then should show packages list

    Scenario: select package
        # Given publish package protocol a
        # Given select package a1 for a
        Given select package a1
        And render
        When select a1
        Then should dispatch SelectPackage action
