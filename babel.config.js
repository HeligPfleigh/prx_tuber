module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@plx_tuber': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
