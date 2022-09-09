Feature: Plugin
    As a Plugin
    I want to be registered
    So that I can use it

    Background: prepare register
        Given prepare register

    Rule: plugin contribute

        Scenario: open debug
            When open debug
            Then get is debug should return true

    Rule: register plugin

        Scenario: register one plugin
            When register plugin contribute
            Then should add plugin contribute

        Scenario: register two plugins with jobOrders
            When register plugin1 contribute
            And register plugin2 contribute with jobOrders2
            Then should add plugin1 and plugin2 contribute

    Rule: unregister plugin

        Scenario: register one plugin and unregister it
            When register plugin contribute
            And unregister it
            Then should not has plugin contribute

        Scenario: register two plugins and unregister the first one
            When register plugin1 contribute
            And register plugin2 contribute
            And unregister plugin1 contribute
            Then should only has plugin2 contribute

    Rule: init plugins

        Scenario: init plugins
            Given prepare sandbox
            And register plugin1 contribute
            And register plugin2 contribute
            When init
            Then invoke plugin1's and plugin2's createStateFunc and store result
            And invoke plugin1's and plugin2's initFunc

    Rule: run pipeline

        Background: prepare sandbox
            Given prepare sandbox

        Scenario: test register one plugin
            Given register plugin contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register two plugins that plugin has one job
            Given register plugin1 contribute
            And register plugin2 contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register two plugins that plugin has two jobs
            Given register plugin1 contribute
            And register plugin2 contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register three plugins case1
            Given register plugin1, plugin2, plugin3 contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register three plugins case2
            Given register plugin1, plugin2, plugin3 contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register four plugins case1
            Given register plugin1, plugin2, plugin3, plugin4 contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register four plugins case2
            Given register plugin1, plugin2, plugin3, plugin4 contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register plugins in initFunc
            Given register plugin1 contribute
            And register plugin2 contribute in plugin1 contribute's initFunc
            And init
            When run init pipeline
            Then run init pipeline's all jobs

    Rule: run pipeline special case

        Background: prepare sandbox
            Given prepare sandbox

        Scenario: test register one plugin with init, update pipeline jobs
            Given register plugin contribute with init, update pipeline jobs
            And init
            When run update pipeline
            Then run update pipeline's all jobs

        Scenario: test register three plugins with init, update pipeline jobs
            Given register plugin1 contribute with one init pipeline job
            And register plugin2 contribute with one update pipeline job
            And register plugin3 contribute with one init pipeline job
            And init
            When run init pipeline
            Then run init pipeline's two jobs

        Scenario: if first_group not in groups, error
            Given register wrong plugin contribute
            And init
            When run init pipeline
            Then should error: "not in groups"

        Scenario: if first_group has more than one in groups, error
            Given register wrong plugin contribute
            And init
            When run init pipeline
            Then should error: "has more than one"


    Rule: test merge job

        Background: prepare sandbox
            Given prepare sandbox

        Scenario: test not set job's state
            Given register plugin contribute with init jobs use merge and not set the second merge job's state
            And init
            When run init pipeline
            Then get states should only return the first merge job's one

