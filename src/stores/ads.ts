import create from 'zustand';
import produce from 'immer';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IAdsState {
  interstitialAdRate: number;
  openAdRate: number;
  interstitialAdDisplayAmount: number;
  openAdDisplayAmount: number;
  setAdRate: (params: {interstitialAdRate: number; openAdRate: number}) => void;
  increaseInterstitialAdDisplayAmount: () => void;
  increaseOpenAdDisplayAmount: () => void;
}

export const useAdsStore = create<IAdsState>()(
  persist(
    set => ({
      interstitialAdRate: 1,
      openAdRate: 1,
      interstitialAdDisplayAmount: 0,
      openAdDisplayAmount: 0,

      setAdRate: (params: {interstitialAdRate: number; openAdRate: number}) =>
        set(
          produce(state => {
            state.interstitialAdRate = params.interstitialAdRate;
            state.openAdRate = params.interstitialAdRate;
          }),
        ),
      increaseInterstitialAdDisplayAmount: () =>
        set(
          produce(state => {
            state.interstitialAdDisplayAmount += 1;
          }),
        ),
      increaseOpenAdDisplayAmount: () =>
        set(
          produce(state => {
            state.openAdRate += 1;
          }),
        ),
    }),
    {
      name: 'ads-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);
