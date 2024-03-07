export let getVertexPosition = (threeAPIService, mesh, index, target) => {
    const _tempA = /*@__PURE__*/ new threeAPIService.Vector3();
    const _morphA = /*@__PURE__*/ new threeAPIService.Vector3();

    const geometry = mesh.geometry;
    const position = geometry.attributes.position;
    const morphPosition = geometry.morphAttributes.position;
    const morphTargetsRelative = geometry.morphTargetsRelative;

    target.fromBufferAttribute(position, index);

    const morphInfluences = mesh.morphTargetInfluences;

    if (morphPosition && morphInfluences) {

        _morphA.set(0, 0, 0);

        for (let i = 0, il = morphPosition.length; i < il; i++) {

            const influence = morphInfluences[i];
            const morphAttribute = morphPosition[i];

            if (influence === 0) continue;

            _tempA.fromBufferAttribute(morphAttribute, index);

            if (morphTargetsRelative) {

                _morphA.addScaledVector(_tempA, influence);

            } else {

                _morphA.addScaledVector(_tempA.sub(target), influence);

            }

        }

        target.add(_morphA);

    }

    return target;

}