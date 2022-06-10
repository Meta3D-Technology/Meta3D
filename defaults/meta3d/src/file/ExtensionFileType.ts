import { createExtensionState, getExtensionLife, getExtensionService } from "meta3d-type";

export type extensionFileData<
  dependentExtensionNameMap,
  dependentContributeNameMap,
  extensionService,
  extensionState
  > = {
    readonly extensionName: string;
    readonly getExtensionServiceFunc: getExtensionService<
      dependentExtensionNameMap,
      dependentContributeNameMap,
      extensionService
    >,
    readonly createExtensionStateFunc: createExtensionState<extensionState>,
    readonly getExtensionLifeFunc: getExtensionLife<extensionService>
  };
