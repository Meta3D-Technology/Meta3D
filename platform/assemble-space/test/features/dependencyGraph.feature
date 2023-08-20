Feature: DependencyGraph
    As a DependencyGraph
    I want to draw dependency graph
    So that I can know dependency

    Background: prepare
        Given prepare

    Scenario: if no start extension, build empty graph data
        Given select extension e1
        When build graph data
        Then should build empty data


    Rule: build graph data

    Background: prepare file
        Given prepare file

        Scenario: if has start extension, build graph data
            Given select extension e1 which dependent on protocol1, protocol2 and is start extension
            And select contribute c1 for protocol2 which dependent on protocol3, protocol4
            And select package p1 which has extension pe1 for protocol1 and contribute pc1 for protocol3
            When build graph data
            Then should build data: e1 -> [pe1, c1 -> [pc1, empty]]


        # Scenario: if two nodes dependent on the same empty node, should remain the upper level empty node to avoid circle depdenency
        #     Given select extension e1 which dependent on protocol1, protocol2 and is start extension
        #     And select extension e2 for protocol2 which dependent on protocol1
        #     When build graph data
        #     Then should build data: e1 -> [e2, empty]


    # Scenario: if two nodes dependent on the same nonempty node, should remain the upper level nonempty node to avoid circle depdenency
    #     Given select extension e1 which dependent on protocol1, protocol2 and is start extension
    #     And select extension e2 for protocol2 which dependent on protocol1
    #     And select contribute c1 for protocol1
    #     When build graph data
    #     Then should build data: e1 -> [e2, c1]

