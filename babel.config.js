module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    //添加以支持Mobx装饰器
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
  };
};
