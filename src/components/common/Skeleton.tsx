/* eslint-disable no-bitwise */
import {spacing} from '@plx_tuber/theme';
import React, {useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  processColor,
  ColorValue,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  round,
  interpolateNode,
  Extrapolate,
  color,
  useCode,
  block,
  startClock,
  set,
  EasingNode,
  timing,
  cond,
  eq,
} from 'react-native-reanimated';

export const opacity = (c: number) => ((c >> 24) & 255) / 255;
export const red = (c: number) => (c >> 16) & 255;
export const green = (c: number) => (c >> 8) & 255;
export const blue = (c: number) => c & 255;

const interpolateColorsRGB = (
  animationValue: Animated.Adaptable<number>,
  inputRange: readonly Animated.Adaptable<number>[],
  colors: number[],
) => {
  const r = round(
    interpolateNode(animationValue, {
      inputRange,
      outputRange: colors.map(c => red(c)),
      extrapolate: Extrapolate.CLAMP,
    }),
  );
  const g = round(
    interpolateNode(animationValue, {
      inputRange,
      outputRange: colors.map(c => green(c)),
      extrapolate: Extrapolate.CLAMP,
    }),
  );
  const b = round(
    interpolateNode(animationValue, {
      inputRange,
      outputRange: colors.map(c => blue(c)),
      extrapolate: Extrapolate.CLAMP,
    }),
  );
  const a = interpolateNode(animationValue, {
    inputRange,
    outputRange: colors.map(c => opacity(c)),
    extrapolate: Extrapolate.CLAMP,
  });

  return color(r, g, b, a) as Animated.Node<ColorValue>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const runTiming = (clock: Animated.Clock) => {
  const state = {
    finished: new Animated.Value(0),
    position: new Animated.Value(0),
    time: new Animated.Value(0),
    frameTime: new Animated.Value(0),
  };

  const config = {
    toValue: new Animated.Value(1),
    duration: 1500,
    easing: EasingNode.bezier(0.5, 0, 0.25, 1),
  };

  return block([
    timing(clock, state, config),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, cond(config.toValue, 0, 1)),
    ]),
    state.position,
  ]);
};

type SkeletonProps = {
  commonColor: string;
  highlightColor: string;
};

const Skeleton: React.FC<SkeletonProps> = ({
  commonColor,
  highlightColor,
}: SkeletonProps) => {
  const [componentSize, setComponentSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const animatedValue = useMemo(() => new Animated.Value(0), []);
  const clock = useMemo(() => new Animated.Clock(), []);

  useCode(
    () => block([startClock(clock), set(animatedValue, runTiming(clock))]),
    [componentSize],
  );

  const onLayout = (event: LayoutChangeEvent) => {
    setComponentSize({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  };

  const boneStyle: StyleProp<Animated.AnimateStyle<ViewStyle>> = {
    width: componentSize.width,
    height: componentSize.height,
    overflow: 'hidden',
    borderRadius: spacing(1),
  };

  const backgroundColor = interpolateColorsRGB(
    animatedValue,
    [0, 1],
    [commonColor, highlightColor].map(c => processColor(c) as number),
  );

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Animated.View style={{backgroundColor, ...boneStyle} as any} />
    </View>
  );
};

export default Skeleton;
