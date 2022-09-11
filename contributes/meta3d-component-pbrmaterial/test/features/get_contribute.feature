Feature: Get Contribute
    As a Get Contribute
    I want to get pbrMaterial contribute
    So that I can register it

    Scenario: componentName
        When I get contribute
        Then componentName should be "PBRMaterial"

    Scenario: set config
        When I get contribute
        And create a state with config
        Then the config is setted

    Scenario: create dataoriented data
        When I get contribute
        And create a state with pbrMaterialCount
        Then dataoriented data is created based on pbrMaterialCount

    Scenario: create a pbrMaterial
        When I get contribute
        And create a state
        Then createComponentFunc should create a pbrMaterial

    Scenario: add a pbrMaterial to a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a pbrMaterial
        And add the pbrMaterial to the gameObject
        Then get the gameObject's pbrMaterial should be the added one

    Scenario: add a pbrMaterial to a gameObject which alreay has one
        Given create a gameObject
        When I get contribute
        And create a state
        And create two pbrMaterials
        And add the first pbrMaterial to the gameObject
        And add the second pbrMaterial to the gameObject
        Then get the gameObject's pbrMaterial should be the second one

    Scenario: remove a pbrMaterial from a gameObject
        Given create a gameObject
        When I get contribute
        And create a state
        And create a pbrMaterial
        And add the pbrMaterial to the gameObject
        And remove the pbrMaterial from the gameObject
        Then the gameObject shouldn't has the pbrMaterial

    Scenario: remove a pbrMaterial which add to two gameObjects from a gameObject
        Given create two gameObject as g1, g2
        When I get contribute
        And create a state
        And create a pbrMaterial
        And add the pbrMaterial to g1
        And add the pbrMaterial to g2
        And remove the pbrMaterial from g1
        Then g1 shouldn't has the pbrMaterial
        And g2 should has the pbrMaterial

    Scenario: get need disposed pbrMaterials
        Given create two gameObject as g1, g2
        When I get contribute
        And create a state
        And create three pbrMaterials as p1, p2, p3
        And add p1 to g1
        And add p3 to g2
		And defer dispose p1 from g1
		And defer dispose p1 from g1
		And defer dispose p3 from g2
        Then get need disposed pbrMaterials should return [[p1, g1], [p3, g2]]

    Scenario: get all pbrMaterials
        Given create two gameObjects
        When I get contribute
        And create a state
        And create two pbrMaterials
        And add them to the gameObjects one by one
        Then getAllComponentsFunc should get the two pbrMaterials

    Scenario: judge whether a gameObject has a pbrMaterial
        Given create a gameObject
        When I get contribute
        And create a state
        And create a pbrMaterial
        And add the pbrMaterial to the gameObject
        Then hasComponentFunc should return true

    Scenario: get a pbrMaterial's gameObjects
        Given create two gameObjects
        When I get contribute
        And create a state
        And create a pbrMaterial
        And add the pbrMaterial to the two gameObjects
        Then getGameObjectsFunc should return the two gameObjects

    Rule: get pbrMaterial's default data

        Background: prepare contribute
            When I get contribute
            And create a state
            And create a pbrMaterial

        Scenario: get default diffuseColor
            Then get pbrMaterial's diffuseColor should return default data

        Scenario: get default specular
            Then get pbrMaterial's specular should return default data

    Rule: operate pbrMaterial data

        Background: prepare contribute
            When I get contribute
            And create a state
            And create a pbrMaterial

        Scenario Outline: get the data from dataoriented data may not equal to the value which is setted
            When set pbrMaterial's diffuseColor to <R>, <G>, <B>
            Then get pbrMaterial's diffuseColor should return <R1>, <G1>, <B1>

            Examples:
                | R   | G   | B   | R1                  | G1                  | B1  |
                | 0.2 | 0.3 | 0.5 | 0.20000000298023224 | 0.30000001192092896 | 0.5 |

        Scenario: operate diffuseColor
            When set pbrMaterial's diffuseColor
            Then get pbrMaterial's diffuseColor should return the setted data

        Scenario: operate specular
            When set pbrMaterial's specular
            Then get pbrMaterial's specular should return the setted data


    Rule: create pbrMaterial error case

        Scenario: create too many pbrMaterials
            Given open debug
            When I get contribute
            And create a state with pbrMaterialCount:1
            Then create two pbrMaterials should contract error