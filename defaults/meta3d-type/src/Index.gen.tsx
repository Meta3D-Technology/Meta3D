/* TypeScript file generated from Index.res by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:interface-over-type-literal
export type api = {
  readonly getServiceExn: unknown; 
  readonly getExtensionStateExn: unknown; 
  readonly setExtensionState: unknown
};

// tslint:disable-next-line:interface-over-type-literal
export type getExtensionService<dependentExtensionNameMap,extensionService> = (_1:api, _2:dependentExtensionNameMap) => extensionService;

// tslint:disable-next-line:interface-over-type-literal
export type createExtensionState<extensionState> = () => extensionState;
