import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
// @ts-ignore
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();
// import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

declare global {
  function __reanimatedWorkletInit(): unknown;
}

global.__reanimatedWorkletInit = jest.fn();

jest.mock('@react-native-firebase/analytics', () => () => {
  return {
    logScreenView: jest.fn(),
  };
});

// jest.mock('react-native-in-app-review', () => ({
//   RequestInAppReview: jest.fn().mockImplementation(() => {
//     return Promise.resolve();
//   }),
//   isAvailable: jest.fn(),
// }));

// jest.mock('react-native-share', () => ({
//   default: jest.fn(),
// }));

// jest.mock('react-native-code-push', () => {
//   const cp = () => (app: any) => app;
//   Object.assign(cp, {
//     InstallMode: {},
//     CheckFrequency: {},
//     SyncStatus: {},
//     UpdateState: {},
//     DeploymentStatus: {},
//     DEFAULT_UPDATE_DIALOG: {},

//     allowRestart: jest.fn(),
//     checkForUpdate: jest.fn(() => Promise.resolve(null)),
//     disallowRestart: jest.fn(),
//     getCurrentPackage: jest.fn(() => Promise.resolve(null)),
//     getUpdateMetadata: jest.fn(() => Promise.resolve(null)),
//     notifyAppReady: jest.fn(() => Promise.resolve()),
//     restartApp: jest.fn(),
//     sync: jest.fn(() => Promise.resolve(1)),
//     clearUpdates: jest.fn(),
//   });
//   return cp;
// });

// jest.mock('react-native-youtube', () => 'Video');

// import 'react-native-google-mobile-ads/jest.setup';

jest.mock('react-native-track-player', () => {
  return {
    addEventListener: jest.fn(),
    registerEventHandler: jest.fn(),
    registerPlaybackService: jest.fn(),
    setupPlayer: jest.fn(),
    destroy: jest.fn(),
    updateOptions: jest.fn(),
    add: jest.fn(),
    remove: jest.fn(),
    skip: jest.fn(),
    skipToNext: jest.fn(),
    skipToPrevious: jest.fn(),
    removeUpcomingTracks: jest.fn(),
    // playback commands
    reset: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    stop: jest.fn(),
    seekTo: jest.fn(),
    setVolume: jest.fn(),
    setRate: jest.fn(),
    // player getters
    getQueue: jest.fn(),
    getTrack: jest.fn(),
    getCurrentTrack: jest.fn(),
    getVolume: jest.fn(),
    getDuration: jest.fn(),
    getPosition: jest.fn(),
    getBufferedPosition: jest.fn(),
    getState: jest.fn(),
    getRate: jest.fn(),
  };
});

import 'react-native-google-mobile-ads/jest.setup';
