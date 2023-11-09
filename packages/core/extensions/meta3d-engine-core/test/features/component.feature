Feature: Component
    As a Component
    I want to be registered
    So that I can use it

    Background: prepare register
        Given prepare register

    Rule: register component

        Scenario: register one component
            When register component contribute
            Then should add component contribute

        Scenario: register the same component twice
            Given open debug
            When register component contribute
            And register component contribute
            Then should contract error: "expect not register before, but actual not"

    Rule: unregister component

        Scenario: register one component and unregister it
            When register component contribute
            And unregister it
            Then should not has component contribute

        Scenario: register two components and unregister the first one
            When register component1 contribute
            And register component2 contribute
            And unregister component1 contribute
            Then should only has component2 contribute

    Rule: operate component

        Background: prepare component
            Given register component contribute
            And create and set component state

        Scenario: create component
            When create a component as c1
            Then c1 should be correct
            And component state is updated

        Scenario: has component
            Given create a gameObject as g1
            And create a component as c1
            And add c1 to g1
            Then g1 should has c1

        Scenario: remove component
            Given create a gameObject as g1
            And create a component as c1
            And add c1 to g1
            When remove c1 from g1
            Then g1 shouldn't has c1

        Scenario: get component
            Given create a gameObject as g1
            And create a component as c1
            And add c1 to g1
            Then get gameObject's component should return c1

        Scenario: get need disposed components
            Given create a component as c1
            And defer dispose c1
            Then get need disposed components should return [c1]

        Scenario: defer dispose component
            Given create a component as c1
            When defer dispose c1
            Then mark c1 as need dispose

        Scenario: dispose components
            Given create a component as c1
            When dispose [c1]
            Then mark c1 as disposed

        Scenario: get all components
            Given create two gameObjects as g1, g2
            And create two components as c1, c2
            And add c1 to g1
            And add c2 to g2
            Then get all components should return [c1, c2]

        Scenario: get component's gameObjects
            Given create a gameObject as g1
            And create a component as c1
            And add c1 to g1
            Then get c1's gameObjects should return [g1]

        Scenario: operate component's data
            Given create a component as c1
            When set c1's data1
            Then get c1's data1 should the setted data