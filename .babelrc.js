module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/env',
      { modules: false, targets: { browsers: ['last 2 versions'] } },
    ],
    '@babel/react',
  ];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};
