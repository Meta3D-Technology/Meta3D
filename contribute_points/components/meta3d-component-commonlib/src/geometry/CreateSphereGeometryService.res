let create = (usedComponentContribute, engineCoreService, radius, bands) =>
  CreateDefaultGeometryService.create(
    usedComponentContribute,
    engineCoreService,
    ComputeSpherePointsGeometryService.compute(radius, bands),
  )
