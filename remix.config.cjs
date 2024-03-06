/** @type {import('@remix-run/dev').AppConfig} */
const { mountRoutes } = require('remix-mount-routes')

const basePath = process.env.REMIX_BASEPATH ?? ''
// console.log("BasePath is:", basePath);


module.exports = {
  ignoredRouteFiles: ["**/.*","**/*.css"],
  publicPath: `${basePath}/build/`,
  assetsBuildDirectory: `public${basePath}/build`,
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  routes: defineRoutes => {
    const baseRoutes = mountRoutes(basePath, 'routes')
    //const testRoutes = mountRoutes('/test', 'addins/test')
    //const customRoutes = defineRoutes(route => {
    //  route('/some/path/*', 'addins/catchall.tsx')
    //})
    const routes = {
      ...baseRoutes,
      //...testRoutes,
      //...customRoutes,
    }
    //console.log(routes)
    return routes
  },
};