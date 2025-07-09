import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Tick, Uncheck } from '../assets/svgs';
import { colors } from '../styles/colors';

interface CustomTextInputProps {
  onSaveTask: (taskTitle: string) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  onSaveTask,
  placeholder = 'Add a new task...',
  containerStyle,
}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState('');

  const handleSaveTask = () => {
    const trimmedTitle = taskTitle.trim();

    if (!trimmedTitle) {
      setError('Task cannot be empty');
      return;
    }

    setError('');
    onSaveTask(trimmedTitle);
    setTaskTitle('');
  };

  const handleTextChange = (text: string) => {
    setTaskTitle(text);
    if (error) {
      setError('');
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <View style={styles.leftIconContainer}>
          <Uncheck />
        </View>
        <RNTextInput
          style={styles.textInput}
          value={taskTitle}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          onSubmitEditing={handleSaveTask}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={handleSaveTask}
          activeOpacity={0.7}
        >
          <Tick width={20} height={20} />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  leftIconContainer: {
    marginRight: 12,
    padding: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 8,
  },
  rightIconContainer: {
    marginLeft: 12,
    backgroundColor: colors.primary,
    borderRadius: 15,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default CustomTextInput;
