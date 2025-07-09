import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Check, Uncheck } from '../assets/svgs';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  size?: number;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  size = 24,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.box, { width: size, height: size }]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      {checked ? <Check /> : <Uncheck />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    marginRight: 15,
  },
});
