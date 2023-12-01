'use strict';


var pipeline = {
  Init: "init",
  Update: "update",
  Render: "render"
};

var job = {
  Init: "init_root_meta3d",
  Update: "update_root_meta3d",
  Render: "render_root_meta3d"
};

var allPipelineData = [
  {
    name: pipeline.Init,
    groups: [{
        name: "first_root_meta3d",
        link: "concat",
        elements: [{
            name: job.Init,
            type_: "job",
            is_set_state: true
          }]
      }],
    first_group: "first_root_meta3d"
  },
  {
    name: pipeline.Update,
    groups: [{
        name: "first_root_meta3d",
        link: "concat",
        elements: [{
            name: job.Update,
            type_: "job",
            is_set_state: true
          }]
      }],
    first_group: "first_root_meta3d"
  },
  {
    name: pipeline.Render,
    groups: [{
        name: "first_root_meta3d",
        link: "concat",
        elements: [{
            name: job.Render,
            type_: "job",
            is_set_state: true
          }]
      }],
    first_group: "first_root_meta3d"
  }
];

var pipelineName = "Root";

exports.pipelineName = pipelineName;
exports.pipeline = pipeline;
exports.job = job;
exports.allPipelineData = allPipelineData;
/* allPipelineData Not a pure module */
