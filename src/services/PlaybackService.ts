import {SLEEPTIME} from '@plx_tuber/core/constants';

import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, {Event, State} from 'react-native-track-player';
import dayjs from 'dayjs';

let wasPausedByDuck = false;

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    // console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    // console.log('Event.RemotePlay');
    await AsyncStorage.removeItem(SLEEPTIME); // remove sleeptime when press play again
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    // console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    // console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async event => {
    // console.log('Event.RemoteJumpForward', event);
    const position = (await TrackPlayer.getPosition()) + event.interval;
    TrackPlayer.seekTo(position);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async event => {
    // console.log('Event.RemoteJumpBackward', event);
    const position = (await TrackPlayer.getPosition()) - event.interval;
    TrackPlayer.seekTo(position);
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    // console.log('Event.RemoteSeek', event);
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener(
    Event.RemoteDuck,
    async ({permanent, paused}) => {
      // console.log('Event.RemoteDuck');
      if (permanent) {
        TrackPlayer.pause();
        return;
      }
      if (paused) {
        const playerState = await TrackPlayer.getState();
        wasPausedByDuck = playerState !== State.Paused;
        TrackPlayer.pause();
      } else {
        if (wasPausedByDuck) {
          TrackPlayer.play();
          wasPausedByDuck = false;
        }
      }
    },
  );

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
    // console.log('Event.PlaybackQueueEnded', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, () => {
    // console.log('Event.PlaybackTrackChanged', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async () => {
    const sleepTime = await AsyncStorage.getItem(SLEEPTIME);

    if (sleepTime && dayjs(sleepTime).isBefore(dayjs())) {
      TrackPlayer.pause();
    }
  });
}
