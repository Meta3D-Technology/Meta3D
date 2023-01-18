Feature: Pipeline
    As a Pipeline
    I want to be registered
    So that I can use it

    Background: prepare register
        Given prepare register

    Rule: pipeline contribute

        Scenario: open debug
            When open debug
            Then get is debug should return true

    Rule: register pipeline

        Scenario: register one pipeline
            When register pipeline contribute
            Then should add pipeline contribute

        Scenario: register two pipelines with jobOrders
            When register pipeline1 contribute
            And register pipeline2 contribute with jobOrders2
            Then should add pipeline1 and pipeline2 contribute

    Rule: unregister pipeline

        Scenario: register one pipeline and unregister it
            When register pipeline contribute
            And unregister it
            Then should not has pipeline contribute

        Scenario: register two pipelines and unregister the first one
            When register pipeline1 contribute
            And register pipeline2 contribute
            And unregister pipeline1 contribute
            Then should only has pipeline2 contribute

    Rule: init pipelines

        Scenario: init pipelines
            Given prepare sandbox
            And register pipeline1 contribute with config1
            And register pipeline2 contribute with config2
            When init
            Then invoke pipeline1's createStateFunc with config1 and pipeline2's createStateFunc with config2 and store result
            And invoke pipeline1's and pipeline2's initFunc

    Rule: run pipeline

        Background: prepare sandbox
            Given prepare sandbox

        Scenario: test register one pipeline
            Given register pipeline contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register two pipelines that pipeline has one job
            Given register pipeline1 contribute
            And register pipeline2 contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register two pipelines that pipeline has two jobs
            Given register pipeline1 contribute
            And register pipeline2 contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register three pipelines case1
            Given register pipeline1, pipeline2, pipeline3 contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register three pipelines case2
            Given register pipeline1, pipeline2, pipeline3 contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register four pipelines case1
            Given register pipeline1, pipeline2, pipeline3, pipeline4 contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register four pipelines case2
            Given register pipeline1, pipeline2, pipeline3, pipeline4 contribute
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register pipelines in initFunc
            Given register pipeline1 contribute
            And register pipeline2 contribute in pipeline1 contribute's initFunc
            And init
            When run init pipeline
            Then run init pipeline's all jobs

    Rule: run pipeline special case

        Background: prepare sandbox
            Given prepare sandbox

        Scenario: test register one pipeline with init, update pipeline jobs
            Given register pipeline contribute with init, update pipeline jobs
            And init
            When run update pipeline
            Then run update pipeline's all jobs

        Scenario: test register three pipelines with init, update pipeline jobs
            Given register pipeline1 contribute with one init pipeline job
            And register pipeline2 contribute with one update pipeline job
            And register pipeline3 contribute with one init pipeline job
            And init
            When run init pipeline
            Then run init pipeline's two jobs

        Scenario: if first_group not in groups, error
            Given register wrong pipeline contribute
            And init
            When run init pipeline
            Then should error: "not in groups"

        Scenario: if first_group has more than one in groups, error
            Given register wrong pipeline contribute
            And init
            When run init pipeline
            Then should error: "has more than one"


    Rule: test merge job

        Background: prepare sandbox
            Given prepare sandbox

        Scenario: test not set job's state
            Given register pipeline contribute with init jobs use merge and not set the second merge job's state
            And init
            When run init pipeline
            Then should only set the first merge job's state

