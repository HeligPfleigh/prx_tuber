import create from 'zustand';
import produce from 'immer';

export const usePlayerStore = create(set => ({
  isPlayerReady: false,

  setPlayerReady: (status: boolean) =>
    set(
      produce(state => {
        state.isPlayerReady = status;
      }),
    ),
}));
