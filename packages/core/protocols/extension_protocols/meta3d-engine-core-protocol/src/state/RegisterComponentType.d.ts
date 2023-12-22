import type { t as Meta3dCommonlibType_ImmutableHashMapType_t } from 'meta3d-commonlib-type/src/structure/hash_map/ImmutableHashMapType';

import type { t as Meta3dCommonlibType_MutableHashMapType_t } from 'meta3d-commonlib-type/src/structure/hash_map/MutableHashMapType';

import type { addComponentFunc as IComponentForJs_addComponentFunc } from '../contribute/scene_graph/ComponentContributeType';

import type { componentContribute as IComponentForJs_componentContribute } from '../contribute/scene_graph/ComponentContributeType';

import type { componentName as IComponentForJs_componentName } from '../contribute/scene_graph/ComponentContributeType';

import type { createComponentFunc as IComponentForJs_createComponentFunc } from '../contribute/scene_graph/ComponentContributeType';

import type { getAllComponentsFunc as IComponentForJs_getAllComponentsFunc } from '../contribute/scene_graph/ComponentContributeType';

import type { getComponentDataFunc as IComponentForJs_getComponentDataFunc } from '../contribute/scene_graph/ComponentContributeType';

import type { getComponentFunc as IComponentForJs_getComponentFunc } from '../contribute/scene_graph/ComponentContributeType';

import type { getGameObjectsFunc as IComponentForJs_getGameObjectsFunc } from '../contribute/scene_graph/ComponentContributeType';

import type { hasComponentFunc as IComponentForJs_hasComponentFunc } from '../contribute/scene_graph/ComponentContributeType';

import type { setComponentDataFunc as IComponentForJs_setComponentDataFunc } from '../contribute/scene_graph/ComponentContributeType';

import type { restore as IComponentForJs_restore } from '../contribute/scene_graph/ComponentContributeType';

import type { deepCopy as IComponentForJs_deepCopy } from '../contribute/scene_graph/ComponentContributeType';

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class state { protected opaque: any } /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class component { protected opaque: any } /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class config { protected opaque: any } /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type componentContribute = IComponentForJs_componentContribute<state, config,  component>;

// tslint:disable-next-line:interface-over-type-literal
export type usedComponentContribute = {
  readonly componentName: IComponentForJs_componentName;
  state: state;
  readonly createComponentFunc: IComponentForJs_createComponentFunc<state, component>;
  readonly getGameObjectsFunc: IComponentForJs_getGameObjectsFunc<state, component>;
  readonly addComponentFunc: IComponentForJs_addComponentFunc<state, component>;
  readonly hasComponentFunc: IComponentForJs_hasComponentFunc<state>;
  readonly getComponentFunc: IComponentForJs_getComponentFunc<state, component>;
  readonly getAllComponentsFunc: IComponentForJs_getAllComponentsFunc<state, component>;
  readonly getComponentDataFunc: IComponentForJs_getComponentDataFunc<state,  component>;
  readonly setComponentDataFunc: IComponentForJs_setComponentDataFunc<state,  component>;
  readonly restore: IComponentForJs_restore<state>;
  readonly deepCopy: IComponentForJs_deepCopy<state>;
};

// tslint:disable-next-line:interface-over-type-literal
export type componentContributeData = { readonly allComponentContributes: Meta3dCommonlibType_ImmutableHashMapType_t<IComponentForJs_componentName, componentContribute>; readonly allUsedComponentContributes: Meta3dCommonlibType_MutableHashMapType_t<IComponentForJs_componentName, usedComponentContribute> };
