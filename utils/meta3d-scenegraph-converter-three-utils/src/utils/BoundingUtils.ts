import type {
    Sphere,
    Box3,
    Vector3,
    BufferAttribute
} from "three";

export let computeBoundingSphere = (boundingSphere: Sphere, position: BufferAttribute | any, vector: Vector3): Sphere => {
    // const _vector = /*@__PURE__*/ new Vector3();

    if (position && position.isGLBufferAttribute) {
        // console.error( 'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', ;

        // boundingSphere.set( new Vector3(), Infinity );

        // return;


        throw new Error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".');
    }

    if (position) {

        // first, find the center of the bounding sphere

        const center = boundingSphere.center;

        // _box.setFromBufferAttribute(position);

        // process morph attributes if present

        // if (morphAttributesPosition) {

        //     for (let i = 0, il = morphAttributesPosition.length; i < il; i++) {

        //         const morphAttribute = morphAttributesPosition[i];
        //         _boxMorphTargets.setFromBufferAttribute(morphAttribute);

        //         if (morphTargetsRelative) {

        //             _vector.addVectors(_box.min, _boxMorphTargets.min);
        //             _box.expandByPoint(_vector);

        //             _vector.addVectors(_box.max, _boxMorphTargets.max);
        //             _box.expandByPoint(_vector);

        //         } else {

        //             _box.expandByPoint(_boxMorphTargets.min);
        //             _box.expandByPoint(_boxMorphTargets.max);

        //         }

        //     }

        // }

        // _box.getCenter(center);

        // second, try to boundingSphere with a radius smaller than boundingSphere of the boundingBox: sqrt(3) smaller in the best case

        let maxRadiusSq = 0;

        for (let i = 0, il = position.count; i < il; i++) {

            // _vector.fromBufferAttribute(position, i);

            // maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector));
            vector.fromBufferAttribute(position, i);

            maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
        }

        // process morph attributes if present

        // if (morphAttributesPosition) {

        //     for (let i = 0, il = morphAttributesPosition.length; i < il; i++) {

        //         const morphAttribute = morphAttributesPosition[i];
        //         const morphTargetsRelative = morphTargetsRelative;

        //         for (let j = 0, jl = morphAttribute.count; j < jl; j++) {

        //             _vector.fromBufferAttribute(morphAttribute, j);

        //             if (morphTargetsRelative) {

        //                 _offset.fromBufferAttribute(position, j);
        //                 _vector.add(_offset);

        //             }

        //             maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector));

        //         }

        //     }

        // }

        boundingSphere.radius = Math.sqrt(maxRadiusSq);

        if (isNaN(boundingSphere.radius)) {

            console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.');

        }

    }


    return boundingSphere
}

export let computeBoundingBox = (boundingBox: Box3, position: BufferAttribute | any) => {
    // const position = attributes.position;
    // const morphAttributesPosition = morphAttributes.position;

    if (position && position.isGLBufferAttribute) {

        // console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false"');

        // boundingBox.set(
        //     new Vector3(- Infinity, - Infinity, - Infinity),
        //     new Vector3(+ Infinity, + Infinity, + Infinity)
        // );

        // return;
        throw new Error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false"');

    }

    if (position !== undefined) {

        boundingBox.setFromBufferAttribute(position);

        // process morph attributes if present

        // if (morphAttributesPosition) {

        //     for (let i = 0, il = morphAttributesPosition.length; i < il; i++) {

        //         const morphAttribute = morphAttributesPosition[i];
        //         _box.setFromBufferAttribute(morphAttribute);

        //         if (morphTargetsRelative) {

        //             _vector.addVectors(boundingBox.min, _box.min);
        //             boundingBox.expandByPoint(_vector);

        //             _vector.addVectors(boundingBox.max, _box.max);
        //             boundingBox.expandByPoint(_vector);

        //         } else {

        //             boundingBox.expandByPoint(_box.min);
        //             boundingBox.expandByPoint(_box.max);

        //         }

        //     }

        // }

    } else {

        boundingBox.makeEmpty();

    }

    if (isNaN(boundingBox.min.x) || isNaN(boundingBox.min.y) || isNaN(boundingBox.min.z)) {

        console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.');

    }

    return boundingBox
}