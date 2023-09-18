/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  future:{
    v2_errorBoundary: true,
  },
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: 'cjs',
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  // devServerPort: 8002
};
