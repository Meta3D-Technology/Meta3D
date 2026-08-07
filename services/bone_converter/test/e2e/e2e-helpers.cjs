/**
 * E2E Helpers（bone_converter 版）
 *
 * 继承共享 helpers + bone_converter 特有：resolveUrl
 */

const shared = require('../../../../packages/meta3d-commonlib-ts/src/e2e/e2e-helpers.cjs');

const BASE_URL = 'http://localhost:8095';

function resolveUrl(ctx, url) {
  if (url) return url;
  return BASE_URL;
}

module.exports = {
  ...shared,
  BASE_URL,
  resolveUrl,
};
