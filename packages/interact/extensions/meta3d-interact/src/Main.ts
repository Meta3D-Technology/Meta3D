import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-interact-protocol/src/state/StateType"
import { service } from "meta3d-interact-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { service as threeService } from "meta3d-three-protocol/src/service/ServiceType"
import { state as converterState } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { getVertexPosition } from "./PositionUtils"

let _checkIntersection = (
	threeAPIService,
	object, material, raycaster, ray, pA, pB, pC, point): any => {
	const _intersectionPointWorld = /*@__PURE__*/ new threeAPIService.Vector3();

	let intersect;

	if (material.side === threeAPIService.BackSide) {

		intersect = ray.intersectTriangle(pC, pB, pA, true, point);

	} else {

		intersect = ray.intersectTriangle(pA, pB, pC, (material.side === threeAPIService.FrontSide), point);

	}

	if (intersect === null) return null;

	_intersectionPointWorld.copy(point);
	_intersectionPointWorld.applyMatrix4(object.matrixWorld);

	const distance = raycaster.ray.origin.distanceTo(_intersectionPointWorld);

	if (distance < raycaster.near || distance > raycaster.far) return null;

	return {
		distance: distance,
		point: _intersectionPointWorld.clone(),
		object: object
	};

}

let _checkGeometryIntersection = (
	threeAPIService,
	object, material, raycaster, ray, uv, uv1, normal, a, b, c) => {
	const _vA = /*@__PURE__*/ new threeAPIService.Vector3();
	const _vB = /*@__PURE__*/ new threeAPIService.Vector3();
	const _vC = /*@__PURE__*/ new threeAPIService.Vector3();

	const _uvA = /*@__PURE__*/ new threeAPIService.Vector2();
	const _uvB = /*@__PURE__*/ new threeAPIService.Vector2();
	const _uvC = /*@__PURE__*/ new threeAPIService.Vector2();

	const _normalA = /*@__PURE__*/ new threeAPIService.Vector3();
	const _normalB = /*@__PURE__*/ new threeAPIService.Vector3();
	const _normalC = /*@__PURE__*/ new threeAPIService.Vector3();

	const _intersectionPoint = /*@__PURE__*/ new threeAPIService.Vector3();

	// object.getVertexPosition(a, _vA);
	// object.getVertexPosition(b, _vB);
	// object.getVertexPosition(c, _vC);
	getVertexPosition(threeAPIService, object, a, _vA)
	getVertexPosition(threeAPIService, object, b, _vB)
	getVertexPosition(threeAPIService, object, c, _vC)

	const intersection = _checkIntersection(threeAPIService, object, material, raycaster, ray, _vA, _vB, _vC, _intersectionPoint);

	if (intersection) {

		if (uv) {

			_uvA.fromBufferAttribute(uv, a);
			_uvB.fromBufferAttribute(uv, b);
			_uvC.fromBufferAttribute(uv, c);

			intersection.uv = threeAPIService.Triangle.getInterpolation(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new threeAPIService.Vector2());

		}

		if (uv1) {

			_uvA.fromBufferAttribute(uv1, a);
			_uvB.fromBufferAttribute(uv1, b);
			_uvC.fromBufferAttribute(uv1, c);

			intersection.uv1 = threeAPIService.Triangle.getInterpolation(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new threeAPIService.Vector2());
			intersection.uv2 = intersection.uv1; // @deprecated, r152

		}

		if (normal) {

			_normalA.fromBufferAttribute(normal, a);
			_normalB.fromBufferAttribute(normal, b);
			_normalC.fromBufferAttribute(normal, c);

			intersection.normal = threeAPIService.Triangle.getInterpolation(_intersectionPoint, _vA, _vB, _vC, _normalA, _normalB, _normalC, new threeAPIService.Vector3());

			if (intersection.normal.dot(ray.direction) > 0) {

				intersection.normal.multiplyScalar(- 1);

			}

		}

		const face = {
			a: a,
			b: b,
			c: c,
			normal: new threeAPIService.Vector3(),
			materialIndex: 0
		};

		threeAPIService.Triangle.getNormal(_vA, _vB, _vC, face.normal);

		intersection.face = face;

	}

	return intersection;

}

let _computeIntersections = (threeAPIService, raycaster, mesh, intersects, rayLocalSpace) => {

	let intersection;

	const geometry = mesh.geometry;
	const material = mesh.material;

	const index = geometry.index;
	const position = geometry.attributes.position;
	const uv = geometry.attributes.uv;
	const uv1 = geometry.attributes.uv1;
	const normal = geometry.attributes.normal;
	const groups = geometry.groups;
	const drawRange = geometry.drawRange;

	if (index !== null) {

		// indexed buffer geometry

		if (Array.isArray(material)) {

			for (let i = 0, il = groups.length; i < il; i++) {

				const group = groups[i];
				const groupMaterial = material[group.materialIndex];

				const start = Math.max(group.start, drawRange.start);
				const end = Math.min(index.count, Math.min((group.start + group.count), (drawRange.start + drawRange.count)));

				for (let j = start, jl = end; j < jl; j += 3) {

					const a = index.getX(j);
					const b = index.getX(j + 1);
					const c = index.getX(j + 2);

					intersection = _checkGeometryIntersection(threeAPIService, mesh,
						groupMaterial, raycaster, rayLocalSpace, uv, uv1, normal, a, b, c);

					if (intersection) {

						intersection.faceIndex = Math.floor(j / 3); // triangle number in indexed buffer semantics
						intersection.face.materialIndex = group.materialIndex;
						intersects.push(intersection);

					}

				}

			}

		} else {

			const start = Math.max(0, drawRange.start);
			const end = Math.min(index.count, (drawRange.start + drawRange.count));

			for (let i = start, il = end; i < il; i += 3) {

				const a = index.getX(i);
				const b = index.getX(i + 1);
				const c = index.getX(i + 2);

				intersection = _checkGeometryIntersection(threeAPIService, mesh,
					material, raycaster, rayLocalSpace, uv, uv1, normal, a, b, c);

				if (intersection) {

					intersection.faceIndex = Math.floor(i / 3); // triangle number in indexed buffer semantics
					intersects.push(intersection);

				}

			}

		}

	} else if (position !== undefined) {

		// non-indexed buffer geometry

		if (Array.isArray(material)) {

			for (let i = 0, il = groups.length; i < il; i++) {

				const group = groups[i];
				const groupMaterial = material[group.materialIndex];

				const start = Math.max(group.start, drawRange.start);
				const end = Math.min(position.count, Math.min((group.start + group.count), (drawRange.start + drawRange.count)));

				for (let j = start, jl = end; j < jl; j += 3) {

					const a = j;
					const b = j + 1;
					const c = j + 2;

					intersection = _checkGeometryIntersection(threeAPIService, mesh,
						groupMaterial, raycaster, rayLocalSpace, uv, uv1, normal, a, b, c);

					if (intersection) {

						intersection.faceIndex = Math.floor(j / 3); // triangle number in non-indexed buffer semantics
						intersection.face.materialIndex = group.materialIndex;
						intersects.push(intersection);

					}

				}

			}

		} else {

			const start = Math.max(0, drawRange.start);
			const end = Math.min(position.count, (drawRange.start + drawRange.count));

			for (let i = start, il = end; i < il; i += 3) {

				const a = i;
				const b = i + 1;
				const c = i + 2;

				intersection = _checkGeometryIntersection(threeAPIService, mesh,
					material, raycaster, rayLocalSpace, uv, uv1, normal, a, b, c);

				if (intersection) {

					intersection.faceIndex = Math.floor(i / 3); // triangle number in non-indexed buffer semantics
					intersects.push(intersection);

				}

			}

		}

	}

}

let _raycastMesh = (
	threeAPIService,
	raycaster, mesh, intersects) => {
	const _inverseMatrix = /*@__PURE__*/ new threeAPIService.Matrix4();
	const _sphere = /*@__PURE__*/ new threeAPIService.Sphere();
	const _ray = /*@__PURE__*/ new threeAPIService.Ray();
	const _sphereHitAt = /*@__PURE__*/ new threeAPIService.Vector3();




	const geometry = mesh.geometry;
	const material = mesh.material;
	const matrixWorld = mesh.matrixWorld;

	if (material === undefined) return;

	// test with bounding sphere in world space

	// if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

	_sphere.copy(geometry.boundingSphere);
	_sphere.applyMatrix4(matrixWorld);

	// check distance from ray origin to bounding sphere

	_ray.copy(raycaster.ray).recast(raycaster.near);

	if (_sphere.containsPoint(_ray.origin) === false) {

		if (_ray.intersectSphere(_sphere, _sphereHitAt) === null) return;

		if (_ray.origin.distanceToSquared(_sphereHitAt) > (raycaster.far - raycaster.near) ** 2) return;

	}

	// convert ray to local space of mesh

	_inverseMatrix.copy(matrixWorld).invert();
	_ray.copy(raycaster.ray).applyMatrix4(_inverseMatrix);

	// test with bounding box in local space

	if (geometry.boundingBox !== null) {

		if (_ray.intersectsBox(geometry.boundingBox) === false) return;

	}

	// test for intersections with geometry

	_computeIntersections(threeAPIService, raycaster, mesh, intersects, _ray);


}

let _intersectObject = (threeAPIService, object, raycaster, intersects, recursive) => {
	if (object.layers.test(raycaster.layers)) {

		// object.raycast(raycaster, intersects);
		if (object.isMesh) {
			_raycastMesh(threeAPIService, raycaster, object, intersects)
		}

	}

	if (recursive === true) {

		const children = object.children;

		for (let i = 0, l = children.length; i < l; i++) {

			_intersectObject(threeAPIService, children[i], raycaster, intersects, true);

		}

	}
}

let _ascSort = (a, b) => {

	return a.distance - b.distance;

}

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		input: {
			point: {
				onPointEvent: (meta3dState, pointEventName, priority, handleFunc) => {
					let { onPointEvent } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return onPointEvent(meta3dState, "meta3d-event-protocol", [pointEventName, priority, handleFunc])
				},
				offPointEvent: (meta3dState, pointEventName, handleFunc) => {
					let { offPointEvent } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return offPointEvent(meta3dState, "meta3d-event-protocol", [pointEventName, handleFunc])
				},
				getPointDownEventName: (meta3dState) => {
					let { getPointDownEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointDownEventName()
				},
				getPointUpEventName: (meta3dState) => {
					let { getPointUpEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointUpEventName()
				},
				getPointTapEventName: (meta3dState) => {
					let { getPointTapEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointTapEventName()
				},
				getPointMoveEventName: (meta3dState) => {
					let { getPointMoveEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointMoveEventName()
				},
				getPointScaleEventName: (meta3dState) => {
					let { getPointScaleEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointScaleEventName()
				},
				getPointDragStartEventName: (meta3dState) => {
					let { getPointDragStartEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointDragStartEventName()
				},
				getPointDragOverEventName: (meta3dState) => {
					let { getPointDragOverEventName } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

					return getPointDragOverEventName()
				},
			}
		},
		picking: {
			setFromCurrentCamera: (meta3dState, [x, y]) => {
				let threeAPIService = getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol")).api(meta3dState)

				let mousePos = new threeAPIService.Vector2(x, y)

				let { perspectiveCamera } = api.getExtensionState<converterState>(meta3dState,
					"meta3d-scenegraph-converter-three-protocol")

				let raycaster = new threeAPIService.Raycaster()

				raycaster.setFromCamera(mousePos, perspectiveCamera)

				// TODO refactor
				globalThis["raycaster"] = raycaster

				return meta3dState
			},
			intersectScene: (meta3dState) => {
				let threeAPIService = getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol")).api(meta3dState)

				let { scene } = api.getExtensionState<converterState>(meta3dState,
					"meta3d-scenegraph-converter-three-protocol")

				let raycaster = globalThis["raycaster"]

				// return raycaster.intersectObject(scene as any, true)


				let intersects = []
				let recursive = true

				_intersectObject(threeAPIService, scene as any, raycaster, intersects, recursive);

				intersects.sort(_ascSort);

				return intersects;
			},
		}
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = (meta3dState, api) => {
	return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}
