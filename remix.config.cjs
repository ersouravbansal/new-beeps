/** @type {import('@remix-run/dev').AppConfig} */
const { flatRoutes } = require("remix-flat-routes");

module.exports = {
  ignoredRouteFiles: ["**/.*", "**/*.css"],
  publicPath: `${process.env.REMIX_BASEPATH ?? ""}/build/`,
  assetsBuildDirectory: `public${process.env.REMIX_BASEPATH ?? ""}/build`,
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes, {
      basePath: process.env.REMIX_BASEPATH ?? "",
      ignoredRouteFiles: ["**/.*", "**/*.css"],
    });
  },
};

// /** @type {import('@remix-run/dev').AppConfig} */
// const { flatRoutes } = require("remix-flat-routes");

// module.exports = {
//   ignoredRouteFiles: ["**/.*", "**/*.css"],
//   publicPath: `${process.env.REMIX_BASEPATH ?? ""}/build/`,
//   assetsBuildDirectory: `public${process.env.REMIX_BASEPATH ?? ""}/build`,
//   routes: async (defineRoutes) => {
//     return flatRoutes("routes", defineRoutes, {
//       basePath: process.env.REMIX_BASEPATH ?? "",
//       ignoredRouteFiles: ["**/.*", "**/*.css"],
//     });
//   },
// };
