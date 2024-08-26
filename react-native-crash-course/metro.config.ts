const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const {
    resolver: { sourceExts, assetExts },
  } = defaultConfig;

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-babel-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'jsx', 'js', 'ts', 'tsx', 'svg'],
    },
  };
})();
