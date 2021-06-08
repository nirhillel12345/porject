var nodeExternals = require("webpack-node-externals");

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  configureWebpack: config => {
    config.externals = [
      nodeExternals(),
      { leaflet: "L" },
      { "leaflet.heat": { root: ["leaflet", "heat"] } }
    ];
  }
}
