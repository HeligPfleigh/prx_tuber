import React, {FC, useEffect, useState} from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {EasingNode} from 'react-native-reanimated';

type ProgressProps = {
  fill: string;
  current: number;
  total: number;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    height: 4,
    borderRadius: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  progress: {
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    left: '-100%',
  },
});

const {Value, timing} = Animated;

const Progress: FC<ProgressProps> = ({
  fill,
  current,
  total,
  style,
}: ProgressProps) => {
  const percent = current / total;
  const [width, setWidth] = useState<number>(0);
  const [translateX] = useState<Animated.Value<number>>(new Value(0));

  const handleLayoutChanged = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);

  useEffect(() => {
    timing(translateX, {
      toValue: width * percent,
      duration: 200,
      easing: EasingNode.inOut(EasingNode.ease),
    }).start();
  }, [percent, width, translateX]);

  return (
    <View style={[styles.container, style]} onLayout={handleLayoutChanged}>
      <Animated.View
        style={[
          styles.progress,
          {backgroundColor: fill, transform: [{translateX}]},
        ]}
      />
    </View>
  );
};

Progress.defaultProps = {
  style: undefined,
};

export default Progress;
