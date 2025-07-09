import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';

interface FloatingButtonProps {
  onToggle: (isVisible: boolean) => void;
  isInputVisible: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onToggle,
  isInputVisible,
}) => {
  const rotation = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    const toValue = isInputVisible ? 0 : 1;

    Animated.timing(rotation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

    onToggle(!isInputVisible);
  };

  // Sync rotation with external state changes
  useEffect(() => {
    const toValue = isInputVisible ? 1 : 0;
    Animated.timing(rotation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isInputVisible, rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ rotate: rotateInterpolate }],
            },
          ]}
        >
          <View style={styles.plusIcon}>
            <View style={styles.horizontalLine} />
            <View style={styles.verticalLine} />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1000,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine: {
    position: 'absolute',
    width: 20,
    height: 3,
    backgroundColor: colors.background,
    borderRadius: 1.5,
  },
  verticalLine: {
    position: 'absolute',
    width: 3,
    height: 20,
    backgroundColor: colors.background,
    borderRadius: 1.5,
  },
});

export default FloatingButton;
