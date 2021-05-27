const { override, fixBabelImports, addLessLoader } = require("customize-cra");
module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@brand-primary": "#42bb84" },
  }),
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: true,
  })
);
